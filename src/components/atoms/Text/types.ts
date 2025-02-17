import { Styler } from '@common-types';

import { FONT_SIZES, FONT_WEIGHTS } from './constants';

export type FontWeights = keyof typeof FONT_WEIGHTS;
export type FontSizes = keyof typeof FONT_SIZES;
type FontColors = 'primary' | 'secondary' | 'primaryInverted' | 'gray';
type TextAligns = 'left' | 'center' | 'right';

export type FontPresetsNames = `${FontWeights}-${FontSizes}`;
type FontSettings = {
  fontSize: (typeof FONT_SIZES)[FontSizes]['fontSize'];
  fontFamily: (typeof FONT_WEIGHTS)[FontWeights]['fontFamily'];
  fontWeight: (typeof FONT_WEIGHTS)[FontWeights]['fontWeight'];
};

export type FontPresets = Record<FontPresetsNames, FontSettings>;

export type StyledTextProps = {
  view: FontPresetsNames;
  color: FontColors;
  textAlign: TextAligns;
  styler?: Styler;
};

export type TextProps = {
  children: string | number;
} & Partial<StyledTextProps>;
