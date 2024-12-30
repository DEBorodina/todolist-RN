import styled from 'styled-components/native';

import { BackgroundProps } from './types';

export const StyledMainLayout = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.primaryInverted};
`;

export const StyledBackground = styled.ImageBackground<BackgroundProps>`
  width: 100%;
  aspect-ratio: ${({ isFullLayout }) => (isFullLayout ? '3/5' : '4/3')};
  justify-content: center;
  align-items: center;
  top: -50px;
  position: absolute;
`;
