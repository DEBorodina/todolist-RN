import list from 'assets/images/list.png';
import startBackground from 'assets/images/start-background.png';
import woman from 'assets/images/woman.png';
import React from 'react';
import { Platform } from 'react-native';
import { SlideInRight, SlideInUp } from 'react-native-reanimated';

import { ANIMATION_DURATION } from '../../config';

import { BackgroundImage, Container, ListImage, WomanImage } from './styles';

export const WelcomeImage = () => {
  const isWeb = Platform.OS === 'web';

  const backgroundImage = isWeb
    ? startBackground
    : require('assets/images/start-background.png');
  const womanImage = isWeb ? woman : require('assets/images/woman.png');
  const listImage = isWeb ? list : require('assets/images/list.png');

  return (
    <Container>
      <BackgroundImage source={backgroundImage} />
      <WomanImage
        resizeMode="contain"
        entering={SlideInRight.duration(ANIMATION_DURATION)}
        source={womanImage}
      />
      <ListImage
        entering={SlideInUp.duration(ANIMATION_DURATION)}
        resizeMode="stretch"
        source={listImage}
      />
    </Container>
  );
};
