import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { SlideInLeft } from 'react-native-reanimated';

import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';

import { WelcomeImage } from './components';
import { BUTTON_TEXT, SUBTITLE, TITLE } from './config';
import { Container, Layout } from './styles';
import { StartScreenProps } from './types';

export const StartScreen: FC<StartScreenProps> = () => {
  return (
    <Layout>
      <WelcomeImage />
      <Container>
        <Animated.View entering={SlideInLeft.duration(700)}>
          <Text view="medium-xl" styler={{ marginBottom: 12 }}>
            {TITLE}
          </Text>
          <Text view="regular-s" color="secondary">
            {SUBTITLE}
          </Text>
        </Animated.View>
        <Button onPress={() => {}} styler={{ marginTop: 32 }}>
          <Text view="medium-m" color="primaryInverted">
            {BUTTON_TEXT}
          </Text>
        </Button>
      </Container>
    </Layout>
  );
};
