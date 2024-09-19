import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>TodosScreen 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aed',
  },
});

export default App;
