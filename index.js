import { AppRegistry } from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonics from 'react-native-vector-icons/Ionicons';

import { name as appName } from './app.json';
import './gesture-handler';
import App from './src/App';

IconFontisto.loadFont();
IconIonics.loadFont();
AppRegistry.registerComponent(appName, () => App);
