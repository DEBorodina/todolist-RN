import React from 'react';
import { SlideInRight, SlideInUp } from 'react-native-reanimated';

import { ANIMATION_DURATION } from '../../config';

import { BackgroundImage, Container, ListImage, WomanImage } from './styles';

export const WelcomeImage = () => {
  return (
    <Container>
      <BackgroundImage source={require('assets/images/start-background.png')} />
      <WomanImage
        resizeMode="contain"
        entering={SlideInRight.duration(ANIMATION_DURATION)}
        source={require('assets/images/woman.png')}
      />
      <ListImage
        entering={SlideInUp.duration(ANIMATION_DURATION).withInitialValues({
          originY: -250,
        })}
        resizeMode="stretch"
        source={require('assets/images/list.png')}
      />
    </Container>
  );
};
