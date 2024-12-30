import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { StarCheckBoxProps } from './types';

export const StarCheckBox: FC<StarCheckBoxProps> = ({
  isChecked,
  onChange,
}) => {
  const src = isChecked
    ? require('assets/images/yellow-start.png')
    : require('assets/images/gray-star.png');

  const handlePress = () => onChange(!isChecked);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={src} />
    </TouchableOpacity>
  );
};
