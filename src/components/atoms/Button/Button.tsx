import React, { FC } from 'react';

import { activeOpacity } from './constants';
import { StyledButton } from './styles';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  children,
  onPress,
  size = 'm',
  color = 'primary',
}) => (
  <StyledButton
    onPress={onPress}
    activeOpacity={activeOpacity}
    color={color}
    size={size}
    accessibilityLabel="button">
    {children}
  </StyledButton>
);
