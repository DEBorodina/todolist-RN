import React, { FC, useEffect, useMemo, useState } from 'react';

import { Input } from '@components/atoms/Input';
import { Spinner } from '@components/atoms/Spinner';
import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';
import { Category, getFirestoreCategories } from '@firestore';
import { selectUserId, useStore } from '@store';

import { CategoryCardsSection } from './components/CategoryCardsSection';
import { formatDate, getTasksAmount } from './helpers';
import { Header, TitleView } from './styles';
import { MainScreenProps } from './types';

export const MainScreen: FC<MainScreenProps> = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(true);
  const userId = useStore(selectUserId);

  const taskAmount = useMemo(
    () => getTasksAmount(categories || []) || 'no',
    [categories],
  );

  const date = useMemo(formatDate, []);

  useEffect(() => {
    const getCategories = async () => {
      const newCategories = await getFirestoreCategories(userId);
      setCategories(newCategories);

      setIsLoading(false);
    };

    getCategories();
  }, [userId]);

  return (
    <MainLayout>
      {isLoading ? (
        <Spinner size="l" />
      ) : (
        <>
          <Header>
            <TitleView>
              <Text view="medium-xl">you have </Text>
              <Text color="primaryInverted" view="medium-xl">
                {`${taskAmount} tasks`}
              </Text>
              <Text view="medium-xl">!</Text>
            </TitleView>
            <Text view="medium-s" styler={{ marginBottom: 16 }}>
              {date}
            </Text>
            <Input />
          </Header>
          <CategoryCardsSection categories={categories || []} />
        </>
      )}
    </MainLayout>
  );
};
