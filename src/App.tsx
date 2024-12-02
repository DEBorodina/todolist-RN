import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GlobalThemeProvider } from 'theme/themeProvider';

function App(): React.JSX.Element {
  return (
    <GlobalThemeProvider>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Signika Bold', fontSize: 48 }}>
          TodosScreen
        </Text>
        <Text style={{ fontFamily: 'Signika Light', fontSize: 48 }}>
          TodosScreen
        </Text>
        <Text style={{ fontFamily: 'Signika Medium', fontSize: 48 }}>
          TodosScreen
        </Text>
        <Text style={{ fontFamily: 'Signika Regular', fontSize: 48 }}>
          TodosScreen
        </Text>
        <Text style={{ fontFamily: 'Signika SemiBold', fontSize: 48 }}>
          TodosScreen
        </Text>
        <Text style={{ fontSize: 48 }}>TodosScreen</Text>
        <Icon name="twitter" size={30} color="#900" />
      </View>
    </GlobalThemeProvider>
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
