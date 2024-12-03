import { FONT_SIZES, FONT_WEIGHTS } from './constants';

export type FontWeights = keyof typeof FONT_WEIGHTS;
export type FontSizes = keyof typeof FONT_SIZES;
export type FontColors = 'primary' | 'secondary' | 'primaryInverted';

export type FontPresetsNames = `${FontWeights}-${FontSizes}`;
type FontSettings = {
  fontSize: number;
  fontFamily: string;
};

export type FontPresets = Record<FontPresetsNames, FontSettings>;

export type StyledTextProps = {
  view: FontPresetsNames;
  color: string;
};
export type TextProps = {
  children: string;
} & Partial<StyledTextProps>;
