import styled from 'styled-components/native';

import { sizes } from './constants';
import { StyledButtonProps } from './types';

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  width: ${({ size }) => sizes[size].width}px;
  height: ${({ size }) => sizes[size].height}px;
  border-radius: ${({ size }) => sizes[size].borderRadius};
  align-items: center;
  justify-content: center;
`;
