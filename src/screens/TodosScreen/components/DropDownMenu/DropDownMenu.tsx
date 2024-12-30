import React, { FC, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';

import { Text } from '@components/atoms/Text';

import { Dot, Item, Menu, Popup } from './styles';
import { DropDownMenuProps } from './types';

export const DropDownMenu: FC<DropDownMenuProps> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { name: 'edit task', action: () => {} },
      { name: 'delete task', action: onDelete },
    ],
    [onDelete],
  );

  return (
    <Menu>
      {isOpen ? (
        <OutsidePressHandler
          onOutsidePress={() => {
            setIsOpen(false);
          }}>
          <Popup>
            {menuItems.map(item => (
              <Item
                onPress={() => {
                  setIsOpen(false);
                  item.action();
                }}
                key={item.name}>
                <Text view="light-s">{item.name}</Text>
              </Item>
            ))}
          </Popup>
        </OutsidePressHandler>
      ) : (
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Dot />
          <Dot />
          <Dot />
        </TouchableOpacity>
      )}
    </Menu>
  );
};
