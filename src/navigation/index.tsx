import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { MainScreen } from 'screens/MainScreen';
import { StartScreen } from 'screens/StartScreen';
import { TodosScreen } from 'screens/TodosScreen';

const { Navigator, Screen } = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Navigator>
      <Screen name="StartScreen" component={StartScreen} />
      <Screen name="MainScreen" component={MainScreen} />
      <Screen name="TodosScreen" component={TodosScreen} />
    </Navigator>
  );
}
