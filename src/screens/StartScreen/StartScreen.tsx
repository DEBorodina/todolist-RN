import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';
import { StartScreenProps } from './types';

export const StartScreen: FC<StartScreenProps> = () => (
  <View style={styles.container}>
    <Image source={require('../../../assets/images/start-background.png')} />
    <Text>StartScreen 3</Text>
  </View>
);
