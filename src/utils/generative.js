export function mulberry32(seed) {
  return function random() {
    let value = seed += 0x6D2B79F5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateField({ seed, width, height, mode }) {
  const random = mulberry32(seed);
  const points = [];
  const bands = mode === 'mesh' ? 126 : 84;
  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  const horizontalBias = width >= height ? 1.16 : 0.92;
  const verticalBias = height >= width ? 1.08 : 0.96;
  for (let index = 0; index < bands; index += 1) {
    const angle = random() * Math.PI * 2;
    const radius = (0.2 + random() * 0.86) * shortSide * 0.52;
    const wobble = Math.sin(index * 0.31 + seed * 0.003) * Math.min(42, shortSide * 0.075);
    points.push({
      x: width / 2 + Math.cos(angle) * (radius + wobble) * horizontalBias + Math.sin(index * 0.17) * longSide * 0.018,
      y: height / 2 + Math.sin(angle) * (radius - wobble) * verticalBias,
      r: 1.5 + random() * 5.5,
      opacity: 0.2 + random() * 0.75,
    });
  }
  return points;
}
