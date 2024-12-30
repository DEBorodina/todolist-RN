import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import { Text } from '@components/atoms/Text';
import { selectSwitchTheme, useStore } from '@store';

import { DRAWER_MENU_ITEMS } from './constants';
import { ArrowIcon, Item, ItemIcon } from './styles';
import { DrawerMenuProps } from './types';

export const DrawerMenu: FC<DrawerMenuProps> = props => {
  const {
    colors: { secondary, text },
  } = useTheme();

  const switchTheme = useStore(selectSwitchTheme);

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <ArrowIcon name="arrow-back" size={30} color={secondary} />
      </TouchableOpacity>
      {DRAWER_MENU_ITEMS.map(({ name, iconName, params }) => (
        <Item
          onPress={() => props.navigation.navigate('TodosScreen', params)}
          key={name}>
          <ItemIcon name={iconName} size={20} color={text.secondary} />
          <Text view="regular-m" color="secondary">
            {name}
          </Text>
        </Item>
      ))}
      <Item onPress={switchTheme}>
        <ItemIcon
          name="color-palette-outline"
          size={20}
          color={text.secondary}
        />
        <Text view="regular-m" color="secondary">
          Switch theme
        </Text>
      </Item>
    </DrawerContentScrollView>
  );
};
