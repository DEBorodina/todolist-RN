import styledWeb from 'styled-components';
import styled from 'styled-components/native';

import { FONT_FAMILY, FONT_SIZES } from '../Text/constants';

import { SIZES } from './constants';
import { StyledInputProps } from './types';

export const Container = styled.View`
  position: relative;
`;

export const StyledInput = styledWeb.input<StyledInputProps>`
  width: ${({ size }) => SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;
  padding: 8px 16px 8px 16px;
  padding-left: ${({ withSearchIcon }) => (withSearchIcon ? 35 : 16)}px;
  ${({ styler }) => styler};
  background: ${({ theme }) => theme.colors.primaryInverted};
  border-radius: 12px;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZES.m.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 1px 1px 4px
    ${({ withShadow }) => (withShadow ? '#00000020' : '#00000000')};
  box-sizing: border-box;
  elevation: 3;
`;

export const SearchIcon = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 1;
`;
