import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { FONT_WEIGHTS } from '../Text/constants';

import { SIZES } from './constants';
import { StyledSelectProps } from './types';

export const Container = styled.View`
  z-index: 100;
  width: 240px;
`;

export const DropDown = styled.View`
  position: absolute;
  bottom: -119px;
  left: 0;
  width: 100%;
  height: 120px;
  z-index: 100;
  background: ${({ theme }) => theme.colors.primaryInverted};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 12px;
  padding: 8px;
`;
