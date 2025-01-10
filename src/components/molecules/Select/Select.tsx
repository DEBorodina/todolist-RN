import React, { FC, useEffect, useState } from 'react';

import { Input } from '../../atoms/Input';

import { Container, DropDown, Item } from './styles';
import { SelectProps } from './types';

export const Select: FC<SelectProps> = ({
  renderItem,
  items,
  size = 'm',
  onBlur,
  onChangeText,
  value,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = () => {
    onBlur?.();
    setTimeout(() => setIsOpen(false), 500);
  };

  const handleChangeText = (newValue: string) => {
    onChangeText?.(newValue);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!value) {
      setIsOpen(false);
    }
  }, [value]);

  return (
    <Container size={size}>
      <Input
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={value}
        size={size}
        {...inputProps}
      />
      {isOpen && items.length > 0 && (
        <DropDown itemsCount={items.length}>
          {items.map(item => (
            <Item
              onPress={() => {
                onChangeText?.(item);
                setIsOpen(false);
              }}
              key={item}>
              {renderItem(item)}
            </Item>
          ))}
        </DropDown>
      )}
    </Container>
  );
};
