import { Styler } from '@common-types';

import { FONT_SIZES, FONT_WEIGHTS } from './constants';

export type FontWeights = keyof typeof FONT_WEIGHTS;
export type FontSizes = keyof typeof FONT_SIZES;
type FontColors = 'primary' | 'secondary' | 'primaryInverted';
type TextAligns = 'left' | 'center' | 'right';

export type FontPresetsNames = `${FontWeights}-${FontSizes}`;
type FontSettings = {
  fontSize: FontSizes;
  fontFamily: FontColors;
};

export type FontPresets = Record<FontPresetsNames, FontSettings>;

export type StyledTextProps = {
  view: FontPresetsNames;
  color: FontColors;
  textAlign: TextAligns;
  styler?: Styler;
};

export type TextProps = {
  children: string;
} & Partial<StyledTextProps>;
