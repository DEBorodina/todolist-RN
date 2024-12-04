import React, { FC } from 'react';

import { StyledText } from './styles';
import { TextProps } from './types';

export const Text: FC<TextProps> = ({
  children,
  view = 'medium-m',
  color = 'primary',
  textAlign = 'center',
  styler,
}) => (
  <StyledText view={view} color={color} styler={styler} textAlign={textAlign}>
    {children}
  </StyledText>
);
