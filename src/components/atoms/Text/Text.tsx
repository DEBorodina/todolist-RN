import React, { FC } from 'react';

import { StyledText } from './styles';
import { TextProps } from './types';

export const Text: FC<TextProps> = ({
  children,
  view = 'medium-m',
  color = 'primary',
}) => (
  <StyledText view={view} color={color}>
    {children}
  </StyledText>
);
