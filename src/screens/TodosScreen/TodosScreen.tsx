import React, { FC } from 'react';
import { View } from 'react-native';

import { TaskCard } from '@components/atoms/TaskCard';
import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';

import { TodosScreenProps } from './types';

export const TodosScreen: FC<TodosScreenProps> = () => {
  const title = 'All Tasks';
  return (
    <MainLayout isFullLayout>
      <Text view="medium-l" color="primaryInverted" styler={{ margin: 12 }}>
        {title}
      </Text>
      <View>
        <TaskCard />
      </View>
    </MainLayout>
  );
};
