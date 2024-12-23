import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Text } from '@components/atoms/Text';
import { MainScreen, TodosScreen } from '@screens';

import { BurgerMenu } from './components/BurgerMenu';
import { Navigation } from './components/BurgerMenu/types';

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {
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

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => renderBurgerMenu(navigation),
          headerRight: () => renderLogo(),
        })}>
        <Screen name="MainScreen" component={MainScreen} />
        <Screen
          name="TodosScreen"
          component={TodosScreen}
          initialParams={{ initialRoute: true }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
