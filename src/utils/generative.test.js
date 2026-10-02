import { describe, expect, it } from 'vitest';
import { generateField, mulberry32 } from './generative.js';

describe('generative field', () => {
  it('is deterministic for the same seed', () => {
    const a = generateField({ seed: 3029, width: 640, height: 420, mode: 'bands' });
    const b = generateField({ seed: 3029, width: 640, height: 420, mode: 'bands' });
    expect(a).toEqual(b);
  });

  it('produces different output for different seeds', () => {
    const a = generateField({ seed: 3029, width: 640, height: 420, mode: 'bands' });
    const b = generateField({ seed: 3166, width: 640, height: 420, mode: 'bands' });
    expect(a[0]).not.toEqual(b[0]);
  });

  it('fills a useful specimen area on a wide detail canvas', () => {
    const points = generateField({ seed: 3029, width: 1220, height: 660, mode: 'bands' });
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);

    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(660 * 0.9);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(660 * 0.75);
  });

  it('keeps random values inside the expected range', () => {
    const random = mulberry32(1);
    for (let index = 0; index < 20; index += 1) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
