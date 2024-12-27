import styled from 'styled-components/native';

import { StyledCategoryCardProps } from './types';

export const StyledCategoryCard = styled.TouchableOpacity<StyledCategoryCardProps>`
  position: relative;
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ color }) => color};
  box-shadow: 1px 1px 1px #00000040;
  elevation: 10;
`;

export const TasksAmount = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
`;
