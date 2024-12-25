import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { SIZES } from './constants';
import { BackgroundProps, ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  width: ${({ size }) => SIZES[size]}px;
  height: ${({ size }) => SIZES[size]}px;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const Progress = styled(Animated.View)<BackgroundProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ size }) => SIZES[size] / 2}px;
  border-left-color: ${({ theme, color }) => theme.colors[color]};
  border-bottom-color: ${({ theme, color }) => theme.colors[color]}40;
  border-right-color: ${({ theme, color }) => theme.colors[color]}40;
  border-top-color: ${({ theme, color }) => theme.colors[color]};
  border-width: ${({ size }) => SIZES[size] / 10}px;
`;

/* position: absolute;
  width: 100%;
  height: 100%;
  border-top-color: ${({ theme, color }) => theme.colors[color]};
  border-radius: ${({ size }) => SIZES[size] / 2}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-width: ${({ size }) => SIZES[size] / 10}px; */
