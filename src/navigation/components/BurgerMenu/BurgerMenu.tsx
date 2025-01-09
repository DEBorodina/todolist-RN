import burger from 'assets/images/burger.png';
import React, { FC } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { StyledImage } from './styles';
import { BurgerMenuProps } from './types';

export const BurgerMenu: FC<BurgerMenuProps> = ({ navigation }) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const isWeb = Platform.OS === 'web';
  const burgerImage = isWeb ? burger : require('assets/images/burger.png');

  return (
    <TouchableOpacity onPress={() => toggleDrawer()} testID="burger-menu">
      <StyledImage resizeMode="contain" source={burgerImage} />
    </TouchableOpacity>
  );
};
