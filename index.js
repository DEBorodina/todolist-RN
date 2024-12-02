import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { name as appName } from './app.json';
import './gesture-handler';
import App from './src/App';

Icon.loadFont();
AppRegistry.registerComponent(appName, () => App);
