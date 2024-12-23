import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'styled-components/native';

import { TaskGroupCard } from '../TaskGroupCard';

import { AddButton, StyledTaskGroupSection } from './styles';
import { TaskGroupSectionProps } from './types';

const defaultTaskGrounds = [
  {
    color: '#2A8899',
    iconName: 'school-outline',
    category: 'School',
    tasksAmount: 0,
  },
  {
    color: '#5EB0D2',
    iconName: 'briefcase-outline',
    category: 'Work',
    tasksAmount: 0,
  },
  {
    color: '#BE8972',
    iconName: 'cart-outline',
    category: 'Shop',
    tasksAmount: 0,
  },
  {
    color: '#646FD4',
    iconName: 'book-outline',
    category: 'Read',
    tasksAmount: 0,
  },
  {
    color: '#83BC74',
    iconName: 'bicycle-outline',
    category: 'Work out',
    tasksAmount: 0,
  },
];

export const TaskGroupSection: FC<TaskGroupSectionProps> = () => {
  const { colors } = useTheme();

  return (
    <StyledTaskGroupSection>
      {defaultTaskGrounds.map(taskGroup => (
        <TaskGroupCard {...taskGroup} key={taskGroup.category} />
      ))}
      <AddButton activeOpacity={0.7}>
        <Icon name="plus-a" size={35} color={colors.pink} />
      </AddButton>
    </StyledTaskGroupSection>
  );
};
