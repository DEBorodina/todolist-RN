import React, { FC } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInputChangeEventData,
} from 'react-native';
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

  const handleInputChange = (
    data: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (Platform.OS === 'web') {
      inputProps?.onChangeText?.(
        (data?.target as unknown as { value: string }).value,
      );
    }
  };

  return (
    <Container>
      {withSearchIcon && (
        <SearchIcon onPress={handlePress}>
          <Icon
            name="search-sharp"
            size={17}
            color="#888888"
            testID="search-icon"
          />
        </SearchIcon>
      )}
      <StyledInput
        testID="input"
        withSearchIcon={withSearchIcon}
        size={size}
        withShadow={withShadow}
        placeholderTextColor={gray}
        onChange={handleInputChange}
        {...inputProps}
      />
    </Container>
  );
};
