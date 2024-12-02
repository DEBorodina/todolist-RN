import { ReactNode } from 'react';

export type Sizes = 'm' | 'circle';
export type Colors = 'primary' | 'secondary';

export type StyledButtonProps = {
  size: Sizes;
  color: Colors;
};

export type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
} & Partial<StyledButtonProps>;
