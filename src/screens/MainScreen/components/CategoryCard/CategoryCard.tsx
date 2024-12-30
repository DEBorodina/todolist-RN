import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { UseNavigation } from '@common-types';
import { Text } from '@components/atoms/Text';
import { SCREENS } from '@navigation';

import { StyledCategoryCard, TasksAmount } from './styles';
import { CategoryCardProps } from './types';

export const CategoryCard: FC<CategoryCardProps> = ({
  color,
  tasksAmount,
  iconName,
  name,
  id,
}) => {
  const navigation = useNavigation<UseNavigation>();
  const {
    colors: { primaryInverted },
  } = useTheme();

  const handlePress = () => {
    navigation.navigate(SCREENS.TODOS_SCREEN, {
      filter: 'category',
      categoryId: id,
    });
  };

  return (
    <StyledCategoryCard
      color={color}
      activeOpacity={0.7}
      onPress={handlePress}
      testID="category-card">
      <TasksAmount>
        <Text color="primaryInverted" view="regular-m">
          {tasksAmount}
        </Text>
      </TasksAmount>
      <Icon
        name={iconName}
        size={30}
        color={primaryInverted}
        testID="category-card-icon"
      />
      <Text color="primaryInverted" styler={{ marginTop: 8 }}>
        {name}
      </Text>
    </StyledCategoryCard>
  );
};
