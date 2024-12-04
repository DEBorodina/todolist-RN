import React from 'react';
import { StyleSheet, View } from 'react-native';

import { GlobalThemeProvider } from '@theme';

import { StartScreen } from './screens/StartScreen';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <GlobalThemeProvider>
        <StartScreen />
      </GlobalThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default App;
