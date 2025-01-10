import { Platform } from 'react-native';

import { FontPresets, FontPresetsNames, FontSizes, FontWeights } from './types';

export const FONT_FAMILY = 'Signika';

export const FONT_WEIGHTS = {
  light: { fontFamily: `${FONT_FAMILY} Light`, fontWeight: 300 },
  regular: { fontFamily: `${FONT_FAMILY} Regular`, fontWeight: 400 },
  medium: { fontFamily: `${FONT_FAMILY} Medium`, fontWeight: 500 },
  semiBold: { fontFamily: `${FONT_FAMILY} SemiBold`, fontWeight: 600 },
};

export const FONT_SIZES = {
  xs: { fontSize: 8 },
  s: { fontSize: 12 },
  m: { fontSize: 16 },
  l: { fontSize: 20 },
  xl: { fontSize: 24 },
} as const;

const isWeb = Platform.OS === 'web';

export const fontWeightNames = Object.keys(FONT_WEIGHTS) as FontWeights[];
export const fontSizeNames = Object.keys(FONT_SIZES) as FontSizes[];

export const fontPresets = fontSizeNames.reduce((account, sizeKey) => {
  fontWeightNames.forEach(weightKey => {
    const combinedKey: FontPresetsNames = `${weightKey}-${sizeKey}`;

    account[combinedKey] = {
      ...FONT_WEIGHTS[weightKey],
      ...FONT_SIZES[sizeKey],
      fontFamily: isWeb ? FONT_FAMILY : FONT_WEIGHTS[weightKey].fontFamily,
    };

    return account;
  });

  return account;
}, {} as FontPresets);

export const fontPresetsNames = Object.keys(fontPresets) as FontPresetsNames[];
