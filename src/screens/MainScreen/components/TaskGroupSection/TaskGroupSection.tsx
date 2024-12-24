import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'styled-components/native';

import { TaskGroupCard } from '../TaskGroupCard';

import { AddButton, StyledTaskGroupSection } from './styles';
import { TaskGroupSectionProps } from './types';

export const TaskGroupSection: FC<TaskGroupSectionProps> = ({ categories }) => {
  const { colors } = useTheme();

  return (
    <StyledTaskGroupSection>
      {categories.map(category => (
        <TaskGroupCard {...category} key={category.id} />
      ))}
      <AddButton activeOpacity={0.7}>
        <Icon name="plus-a" size={35} color={colors.pink} />
      </AddButton>
    </StyledTaskGroupSection>
  );
};
