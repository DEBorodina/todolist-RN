import grayStar from 'assets/images/gray-star.png';
import yellowStar from 'assets/images/yellow-start.png';
import React, { FC } from 'react';
import { Image, Platform, TouchableOpacity } from 'react-native';

import { StarCheckBoxProps } from './types';

export const StarCheckBox: FC<StarCheckBoxProps> = ({
  isChecked,
  onChange,
}) => {
  const isWeb = Platform.OS === 'web';
  const yellowStartImage = isWeb
    ? yellowStar
    : require('assets/images/yellow-start.png');
  const grayStarImage = isWeb
    ? grayStar
    : require('assets/images/gray-star.png');

  const src = isChecked ? yellowStartImage : grayStarImage;

  const handlePress = () => onChange(!isChecked);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={src} testID="star" />
    </TouchableOpacity>
  );
};
