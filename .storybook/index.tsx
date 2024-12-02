import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { name as appName } from '../app.json';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

Icon.loadFont();
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
