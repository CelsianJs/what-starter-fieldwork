import { useEffect, useRef, useSignal } from 'what-framework';
import { activeProject, canvasSeed, cycleMode, drawingMode, nextSeed, resetSeed } from '../state/gallery.js';
import { generateField } from '../utils/generative.js';

export default function GenerativeCanvas() {
  const canvasRef = useRef(null);
  const status = useSignal('Canvas ready. Press N for a new seed, M for mode, R to reset.');

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const width = Math.max(320, Math.floor(rect.width));
    const height = Math.max(280, Math.floor(rect.height));
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0b0a07';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    const mode = drawingMode();
    const points = generateField({ seed: canvasSeed(), width, height, mode });
    ctx.strokeStyle = mode === 'orbit' ? 'rgba(143, 215, 255, 0.2)' : 'rgba(223, 255, 57, 0.16)';
    ctx.lineWidth = mode === 'mesh' ? 0.65 : 1;

    points.forEach((point, index) => {
      const next = points[(index + 11) % points.length];
      if (mode !== 'bands') {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(245, 239, 221, ${point.opacity})`;
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(223, 255, 57, 0.88)';
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(`seed ${canvasSeed()} / ${mode}`, 18, height - 20);
  };

  const handleNextSeed = () => {
    nextSeed();
    status(`Seed advanced to ${canvasSeed()}.`);
  };

  const handleCycleMode = () => {
    cycleMode();
    status(`Mode changed to ${drawingMode()}.`);
  };

  const handleResetSeed = () => {
    resetSeed();
    status('Seed reset to 3029.');
  };

  useEffect(() => {
    draw();
    const onResize = () => draw();
    const onKey = (event) => {
      if (event.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      if (event.key.toLowerCase() === 'n') {
        handleNextSeed();
      }
      if (event.key.toLowerCase() === 'r') {
        handleResetSeed();
      }
      if (event.key.toLowerCase() === 'm') {
        handleCycleMode();
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [canvasSeed, drawingMode]);

  return (
    <section class="canvas-panel" aria-labelledby="canvas-title">
      <div class="canvas-stage">
        <canvas ref={canvasRef} class="field-canvas" aria-label="Deterministic generative research field" />
      </div>
      <div class="canvas-copy">
        <div>
          <p class="kicker">Shared repeatability instrument</p>
          <h2 id="canvas-title">Repeatable signal map</h2>
          <p>The same local drawing instrument accompanies every record. It is a reference for comparison, not evidence of a completed research experiment.</p>
        </div>
        <dl class="canvas-meta" aria-label="Current canvas state">
          <div>
            <dt>Seed</dt>
            <dd>{() => canvasSeed()}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{() => drawingMode()}</dd>
          </div>
          <div>
            <dt>Record</dt>
            <dd>{() => activeProject().title}</dd>
          </div>
        </dl>
        <div class="key-map" aria-label="Keyboard shortcuts">
          <span><kbd>N</kbd> seed</span>
          <span><kbd>M</kbd> mode</span>
          <span><kbd>R</kbd> reset</span>
        </div>
        <div class="button-row">
          <button class="button" onClick={handleNextSeed}>New seed</button>
          <button class="button ghost" onClick={handleCycleMode}>Change mode</button>
          <button class="button ghost" onClick={handleResetSeed}>Reset</button>
        </div>
        <p class="sr-live" aria-live="polite">{status()}</p>
      </div>
    </section>
  );
}
