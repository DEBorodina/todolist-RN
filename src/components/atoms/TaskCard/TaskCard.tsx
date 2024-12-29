import React, { FC } from 'react';
import { Text } from 'react-native';

import { StyledTaskCard } from './styles';
import { TaskCardProps } from './types';

export const TaskCard: FC<TaskCardProps> = () => (
  <StyledTaskCard>
    <Text>TaskCard</Text>
  </StyledTaskCard>
);
