import React, { FC } from 'react';

import { Container, SearchIcon, StyledInput } from './styles';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  size = 'm',
  withSearchIcon = false,
  ...inputProps
}) => (
  <Container>
    {withSearchIcon && (
      <SearchIcon name="search-sharp" size={17} color="#888888" />
    )}
    <StyledInput withSearchIcon={withSearchIcon} size={size} {...inputProps} />
  </Container>
);
