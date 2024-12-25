import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { Container, Progress } from './styles';
import { SpinnerProps } from './types';

const startRotationAnimation = (
  duration: number,
  rotationDegree: Animated.Value,
) => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
};

export const Spinner = ({
  durationMs = 700,
  size = 'm',
  color = 'primary',
}: SpinnerProps) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  return (
    <Container testID="progressbar" size={size}>
      <Progress
        testID="spinner"
        color={color}
        size={size}
        style={{
          transform: [
            {
              rotateZ: rotationDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </Container>
  );
};
