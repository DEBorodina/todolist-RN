import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { StartScreenProps } from './types';

export const StartScreen: FC<StartScreenProps> = () => (
  <View style={styles.container}>
    <Text>StartScreen</Text>
  </View>
);
