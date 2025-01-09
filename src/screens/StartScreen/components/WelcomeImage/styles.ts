import Animated from 'react-native-reanimated';
import { styled } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const BackgroundImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
`;

export const WomanImage = styled(Animated.Image)`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 90%;
  aspect-ratio: 1/3;
`;

export const ListImage = styled(Animated.Image)`
  position: absolute;
  left: 10px;
  top: 20%;
  width: undefined;
  height: 60%;
  aspect-ratio: 1;
`;
