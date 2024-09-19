import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = () => (
  <View style={styles.container}>
    <Text>Button</Text>
  </View>
);
