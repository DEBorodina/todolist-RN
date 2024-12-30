import { Styler } from '@common-types';

export type InputProps = Partial<StyledInputProps> & {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  onIconClick?: () => void;
  value?: string;
};

export type StyledInputProps = {
  size: 'm' | 'l';
  withSearchIcon: boolean;
  withShadow: boolean;
  styler?: Styler;
};
