import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { MainScreen, TodosScreen } from '@screens';

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {
  return (
    <NavigationContainer>
      <Navigator>
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
