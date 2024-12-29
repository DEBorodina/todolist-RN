import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { StyledImage } from './styles';
import { BurgerMenuProps } from './types';

export const BurgerMenu: FC<BurgerMenuProps> = ({ navigation }) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity onPress={() => toggleDrawer()} testID="burger-menu">
      <StyledImage
        resizeMode="contain"
        source={require('assets/images/burger.png')}
      />
    </TouchableOpacity>
  );
};
