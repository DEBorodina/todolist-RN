import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Params } from '@common-types';
import { Text } from '@components/atoms/Text';
import { selectSwitchTheme, useStore } from '@store';

import { SCREENS } from '../../constants';

import { DRAWER_MENU_ITEMS, SWITCH_THEME } from './constants';
import { ArrowIcon, Item, ItemIcon } from './styles';
import { DrawerMenuProps } from './types';

export const DrawerMenu: FC<DrawerMenuProps> = props => {
  const {
    colors: { secondary, text },
  } = useTheme();

  const switchTheme = useStore(selectSwitchTheme);

  const handleCloseDrawer = () => props.navigation.closeDrawer();

  const handleNavigate = (params: Params) => () =>
    props.navigation.navigate(SCREENS.TODOS_SCREEN, params);

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={handleCloseDrawer}>
        <ArrowIcon
          name="arrow-back"
          size={30}
          color={secondary}
          testID="back-arrow"
        />
      </TouchableOpacity>
      {DRAWER_MENU_ITEMS.map(({ name, iconName, params }) => (
        <Item onPress={handleNavigate(params)} key={name}>
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
          {SWITCH_THEME}
        </Text>
      </Item>
    </DrawerContentScrollView>
  );
};
