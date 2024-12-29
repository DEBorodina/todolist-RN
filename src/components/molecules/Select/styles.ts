import styled from 'styled-components/native';

import { StyledInputProps } from '../../atoms/Input/types';

import { SIZES } from './constants';
import { StyledDrpDownProps } from './types';

export const Container = styled.View<Pick<StyledInputProps, 'size'>>`
  z-index: 2;
  width: ${({ size }) => SIZES[size].width}px;
`;

export const DropDown = styled.View<StyledDrpDownProps>`
  position: absolute;
  bottom: -${({ itemsCount }) => itemsCount * 32 + 15}px;
  left: 0;
  width: 100%;
  height: ${({ itemsCount }) => itemsCount * 32 + 16}px;
  z-index: 100;
  background: ${({ theme }) => theme.colors.primaryInverted};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 12px;
  padding: 0 8px;
`;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
