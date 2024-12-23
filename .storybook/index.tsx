import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonics from 'react-native-vector-icons/Ionicons';

import { name as appName } from '../app.json';

import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

IconFontisto.loadFont();
IconIonics.loadFont();
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
