import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { Text } from '@components/atoms/Text';
import { MainScreen, TodosScreen } from '@screens';

import { BurgerMenu } from './components/BurgerMenu';
import { Navigation } from './components/BurgerMenu/types';
import { DrawerMenu } from './components/DrawerMenu';

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {
  const { colors } = useTheme();

  const renderBurgerMenu = useCallback(
    (navigation: Navigation) => <BurgerMenu navigation={navigation} />,
    [],
  );

  const renderLogo = useCallback(
    () => (
      <Text
        color="primaryInverted"
        view="semiBold-l"
        styler={{ paddingRight: 16 }}>
        Modsen Todo list
      </Text>
    ),
    [],
  );

  const renderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => <DrawerMenu {...props} />,
    [],
  );

  const renderArrowBack = useCallback(
    (navigation: Navigation) => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={30}
          style={{ margin: 8 }}
          color={colors.primaryInverted}
        />
      </TouchableOpacity>
    ),
    [colors.primaryInverted],
  );

  return (
    <NavigationContainer>
      <Navigator
        drawerContent={renderDrawerContent}
        screenOptions={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => renderBurgerMenu(navigation),
          headerRight: () => renderLogo(),
          navigationBarColor: '#ee0022',
        })}>
        <Screen name="MainScreen" component={MainScreen} />
        <Screen
          name="TodosScreen"
          component={TodosScreen}
          options={({ navigation }) => ({
            headerLeft: () => renderArrowBack(navigation),
            headerRight: () => null,
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};
