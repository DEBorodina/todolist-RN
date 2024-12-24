import { ReactNode } from 'react';

import { Styler } from '@common-types';

export type Sizes = 'm' | 'circle';
export type Colors = 'primary' | 'secondary';

export type StyledButtonProps = {
  size: Sizes;
  color: Colors;
  styler?: Styler;
};

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
} & Partial<StyledButtonProps>;
