import { AppRegistry } from 'react-native';

import App from './src/App';

AppRegistry.registerComponent('React Native Web', () => App);
AppRegistry.runApplication('React Native Web', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
