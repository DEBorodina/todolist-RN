import React, { FC, useState } from 'react';
import Animated from 'react-native-reanimated';
import { SlideInLeft } from 'react-native-reanimated';
import uuid from 'react-native-uuid';

import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';
import { DEFAULT_CATEGORIES, USER_ID_KEY } from '@constants';
import { addFirestoreCategories } from '@firestore';
import { selectSetUserId, useStore } from '@store';
import { setAsyncStorageItem } from '@utils';

import { WelcomeImage } from './components';
import { ANIMATION_DURATION, BUTTON_TEXT, SUBTITLE, TITLE } from './config';
import { Container, Layout } from './styles';
import { StartScreenProps } from './types';

export const StartScreen: FC<StartScreenProps> = () => {
  const setUserId = useStore(selectSetUserId);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);

    const userId = uuid.v4();
    await setAsyncStorageItem(userId, USER_ID_KEY);

    await addFirestoreCategories(
      DEFAULT_CATEGORIES.map(category => ({
        ...category,
        userId,
      })),
    );

    setUserId(userId);
    setIsLoading(false);
  };

  return (
    <Layout>
      <WelcomeImage />
      <Container>
        <Animated.View entering={SlideInLeft.duration(ANIMATION_DURATION)}>
          <Text view="medium-xl" styler={{ marginBottom: 12 }}>
            {TITLE}
          </Text>
          <Text view="regular-s" color="secondary">
            {SUBTITLE}
          </Text>
        </Animated.View>
        <Button
          onClick={handleStart}
          styler={{ marginTop: 32 }}
          isLoading={isLoading}>
          <Text view="medium-m" color="primaryInverted">
            {BUTTON_TEXT}
          </Text>
        </Button>
      </Container>
    </Layout>
  );
};
