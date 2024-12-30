export const circleSizeL = 56;
export const circleSizeM = 32;

export const sizes = {
  m: {
    height: 40,
    width: 240,
    borderRadius: '12px',
  },
  'circle-l': {
    height: circleSizeL,
    width: circleSizeL,
    borderRadius: `${circleSizeL / 2}px`,
  },
  'circle-m': {
    height: circleSizeM,
    width: circleSizeM,
    borderRadius: `${circleSizeM / 2}px`,
  },
};

export const activeOpacity = 0.8;

export const SPINNER_COLORS = {
  primary: 'primaryInverted',
  secondary: 'primaryInverted',
  primaryInverted: 'primary',
} as const;
