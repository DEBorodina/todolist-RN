import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { Container, SearchIcon, StyledInput } from './styles';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  size = 'm',
  withSearchIcon = false,
  withShadow = false,
  onIconClick,
  ...inputProps
}) => {
  const handlePress = () => {
    onIconClick?.();
  };

  const {
    colors: {
      text: { gray },
    },
  } = useTheme();

  return (
    <Container>
      {withSearchIcon && (
        <SearchIcon onPress={handlePress}>
          <Icon name="search-sharp" size={17} color="#888888" />
        </SearchIcon>
      )}
      <StyledInput
        withSearchIcon={withSearchIcon}
        size={size}
        withShadow={withShadow}
        placeholderTextColor={gray}
        {...inputProps}
      />
    </Container>
  );
};
