import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { FONT_SIZES, FONT_WEIGHTS } from '../Text/constants';

import { SIZES } from './constants';
import { StyledInputProps } from './types';

export const Container = styled.View`
  position: relative;
`;

export const StyledInput = styled.TextInput<StyledInputProps>`
  width: ${({ size }) => SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;
  padding: 8px 16px 8px 16px;
  padding-left: ${({ withSearchIcon }) => (withSearchIcon ? 35 : 16)}px;
  ${({ styler }) => styler};
  background: ${({ theme }) => theme.colors.primaryInverted};
  border-radius: 12px;
  font-family: ${FONT_WEIGHTS.medium.fontFamily};
  font-size: ${FONT_SIZES.m.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 1;
`;
