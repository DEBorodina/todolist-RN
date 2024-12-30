import { Styler } from '@common-types';

export type CheckBoxProps = StyledCheckBoxProps & {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export type StyledCheckBoxProps = {
  styler?: Styler;
};
