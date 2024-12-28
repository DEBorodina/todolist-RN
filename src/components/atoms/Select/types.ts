import { Styler } from '@common-types';

export type SelectProps = Partial<StyledSelectProps> & {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  value?: string;
};

export type StyledSelectProps = {
  size: 'm' | 'l';
  withSearchIcon: boolean;
  styler?: Styler;
};

export type ControlledSelectProps = Pick<StyledSelectProps, 'size'> &
  Pick<SelectProps, 'placeholder' | 'withSearchIcon'> & {
    name: string;
    rules?: object;
  };
