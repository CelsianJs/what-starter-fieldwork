import { useEffect, useRef, useSignal } from 'what-framework';
import { canvasSeed, cycleMode, drawingMode, nextSeed, resetSeed } from '../state/gallery.js';
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

  useEffect(() => {
    draw();
    const onResize = () => draw();
    const onKey = (event) => {
      if (event.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      if (event.key.toLowerCase() === 'n') {
        nextSeed();
        status(`Seed advanced to ${canvasSeed()}.`);
      }
      if (event.key.toLowerCase() === 'r') {
        resetSeed();
        status('Seed reset to 3029.');
      }
      if (event.key.toLowerCase() === 'm') {
        cycleMode();
        status(`Mode changed to ${drawingMode()}.`);
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
      <div class="canvas-copy">
        <p class="kicker">Seeded field instrument</p>
        <h2 id="canvas-title">A repeatable signal map for looking twice.</h2>
        <p>Keyboard: <kbd>N</kbd> new seed, <kbd>M</kbd> mode, <kbd>R</kbd> reset. The same seed always renders the same image. No live inference runs here.</p>
        <div class="button-row">
          <button class="button" onClick={nextSeed}>New seed</button>
          <button class="button ghost" onClick={cycleMode}>Change mode</button>
          <button class="button ghost" onClick={resetSeed}>Reset</button>
        </div>
        <p class="sr-live" aria-live="polite">{status()}</p>
      </div>
      <canvas ref={canvasRef} class="field-canvas" aria-label="Deterministic generative research field" />
    </section>
  );
}
