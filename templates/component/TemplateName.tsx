import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { TemplateNameProps } from './types';

export const TemplateName: FC<TemplateNameProps> = () => (
  <View style={styles.container}>
    <Text>TemplateName</Text>
  </View>
);
