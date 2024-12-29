import React, { FC } from 'react';

import { Spinner } from '../Spinner';

import { SPINNER_COLORS, activeOpacity } from './constants';
import { StyledButton } from './styles';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  size = 'm',
  color = 'primary',
  styler,
  isLoading = false,
}) => {
  return (
    <StyledButton
      onPress={isLoading ? undefined : onClick}
      activeOpacity={isLoading ? 1 : activeOpacity}
      color={color}
      size={size}
      testID="button"
      styler={styler}>
      {isLoading ? <Spinner color={SPINNER_COLORS[color]} /> : children}
    </StyledButton>
  );
};
