import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import { Text } from '@components/atoms/Text';

import { DRAWER_MENU_ITEMS } from './constants';
import { ArrowIcon, Item, ItemIcon } from './styles';
import { DrawerMenuProps } from './types';

export const DrawerMenu: FC<DrawerMenuProps> = props => {
  const {
    colors: { secondary, text },
  } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <ArrowIcon name="arrow-back" size={30} color={secondary} />
      </TouchableOpacity>
      {DRAWER_MENU_ITEMS.map(({ name, iconName }) => (
        <Item
          onPress={() => props.navigation.navigate('TodosScreen')}
          key={name}>
          <ItemIcon name={iconName} size={20} color={text.secondary} />
          <Text view="regular-m" color="secondary">
            {name}
          </Text>
        </Item>
      ))}
    </DrawerContentScrollView>
  );
};
