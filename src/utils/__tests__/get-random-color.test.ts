import { getRandomColor } from '../get-random-color';

describe('getRandomColor', () => {
  it('should return a hex color code starting with #', () => {
    global.Math.random = jest.fn(() => 0.5);

    const color = getRandomColor();

    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('should return a different hex color based on random value', () => {
    global.Math.random = jest.fn(() => 0.25);

    const color1 = getRandomColor();

    global.Math.random = jest.fn(() => 0.75);

    const color2 = getRandomColor();

    expect(color1).not.toBe(color2);
  });
});
