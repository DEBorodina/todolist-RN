import { Styler } from '@common-types';

export type InputProps = Partial<StyledInputProps> & {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  value?: string;
};

export type StyledInputProps = {
  size: 'm' | 'l';
  withSearchIcon: boolean;
  styler?: Styler;
};
