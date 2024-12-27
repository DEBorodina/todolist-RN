import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text } from '@components/atoms/Text';

import { StyledCategoryCard, TasksAmount } from './styles';
import { CategoryCardProps } from './types';

export const CategoryCard: FC<CategoryCardProps> = ({
  color,
  tasksAmount,
  iconName,
  name,
}) => (
  <StyledCategoryCard color={color} activeOpacity={0.7}>
    <TasksAmount>
      <Text color="primaryInverted" view="regular-m">
        {tasksAmount}
      </Text>
    </TasksAmount>
    <Icon name={iconName} size={30} color="#fff" />
    <Text color="primaryInverted" styler={{ marginTop: 8 }}>
      {name}
    </Text>
  </StyledCategoryCard>
);
