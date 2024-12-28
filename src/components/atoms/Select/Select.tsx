import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { Input } from '../Input';
import { Text } from '../Text';

import { Container, DropDown } from './styles';
import { SelectProps } from './types';

export const Select: FC<SelectProps> = ({
  renderItem,
  items,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState();

  const onBlur = () => {
    inputProps.onBlur?.();
    setIsOpen(false);
  };

  const onChangeText = value => {
    inputProps.onChangeText?.(value);
    console.log('is open');
    setIsOpen(true);
  };

  const onSelect = value => () => {
    setIsOpen(false);
    inputProps.onChangeText?.(value);
  };

  useEffect(() => {
    console.log(inputProps.value);
    if (!inputProps.value) {
      setIsOpen(false);
    }
  }, [inputProps.value]);

  return (
    <Container>
      <Input
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={inputProps.value}
        styler={inputProps.styler}
        placeholder={inputProps.placeholder}
      />
      {isOpen && (
        <DropDown>
          {items.map(item => (
            <TouchableOpacity
              onPress={onSelect(item)}
              key={item}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
                alignItems: 'center',
              }}>
              {renderItem(item)}
            </TouchableOpacity>
          ))}
        </DropDown>
      )}
    </Container>
  );
};
