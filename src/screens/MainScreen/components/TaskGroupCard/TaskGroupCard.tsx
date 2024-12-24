import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text } from '@components/atoms/Text';

import { StyledTaskGroupCard, TasksAmount } from './styles';
import { TaskGroupCardProps } from './types';

export const TaskGroupCard: FC<TaskGroupCardProps> = ({
  color,
  tasksAmount,
  iconName,
  name,
}) => (
  <StyledTaskGroupCard color={color} activeOpacity={0.7}>
    <TasksAmount>
      <Text color="primaryInverted" view="regular-m">
        {tasksAmount}
      </Text>
    </TasksAmount>
    <Icon name={iconName} size={30} color="#fff" />
    <Text color="primaryInverted" styler={{ marginTop: 8 }}>
      {name}
    </Text>
  </StyledTaskGroupCard>
);
