import { AppRegistry } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fonts/Fontisto.ttf';
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';

import App from './src/App';

const iconFontStyles = `@font-face {
    src: url(${Ionicons});
    font-family: Ionicons;
    font-weight: normal;
    font-style: normal;
  }
   @font-face {
    src: url(${Fontisto});
    font-family: Fontisto;
    font-weight: normal;
    font-style: normal;
  } 
  `;

const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);

AppRegistry.registerComponent('React Native Web', () => App);
AppRegistry.runApplication('React Native Web', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
