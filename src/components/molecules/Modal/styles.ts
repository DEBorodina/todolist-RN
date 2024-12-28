import { BlurView } from '@react-native-community/blur';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const StyledModalBackground = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const StyledModal = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.primaryInverted};
  border-radius: 18px;
  padding: 20px;
  box-shadow: 1px 1px 8px #00000040;
  elevation: 10;
`;

export const StyledBlurBackground = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
