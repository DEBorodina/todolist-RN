import React, { FC } from 'react';

import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';

import { TaskGroupSection } from './components/TaskGroupSection';
import { TaskInput } from './components/TaskInput';
import { Header, TitleView } from './styles';
import { MainScreenProps } from './types';

export const MainScreen: FC<MainScreenProps> = () => {
  const taskAmount = '25 tasks';
  const date = 'Saturday,september 10,2022';

  return (
    <MainLayout>
      <Header>
        <TitleView>
          <Text view="medium-xl">you have </Text>
          <Text color="primaryInverted" view="medium-xl">
            {taskAmount}
          </Text>
          <Text view="medium-xl"> !</Text>
        </TitleView>
        <Text view="medium-s" styler={{ marginBottom: 16 }}>
          {date}
        </Text>
        <TaskInput />
      </Header>
      <TaskGroupSection />
    </MainLayout>
  );
};
