import { ReactNode } from 'react';

import { InputProps } from '../../atoms/Input/types';

export type SelectProps = InputProps & {
  renderItem: (item: string) => ReactNode;
  items: string[];
};

export type StyledDrpDownProps = {
  itemsCount: number;
};
