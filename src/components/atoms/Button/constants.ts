export const circleSize = 56;

export const sizes = {
  m: {
    height: 40,
    width: 240,
    borderRadius: '12px',
  },
  circle: {
    height: circleSize,
    width: circleSize,
    borderRadius: `${circleSize / 2}px`,
  },
};

export const activeOpacity = 0.8;

export const SPINNER_COLORS = {
  primary: 'primaryInverted',
  secondary: 'primaryInverted',
  primaryInverted: 'primary',
} as const;
