import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { UseNavigation } from '@common-types';
import { Input } from '@components/atoms/Input';
import { Spinner } from '@components/atoms/Spinner';
import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';
import { getFirestoreCategories } from '@firestore';
import {
  selectCategories,
  selectSetCategories,
  selectUserId,
  useStore,
} from '@store';

import { CategoryCardsSection } from './components/CategoryCardsSection';
import { formatDate, getTasksAmount } from './helpers';
import { Container, Header, TitleView } from './styles';
import { MainScreenProps } from './types';

export const MainScreen: FC<MainScreenProps> = () => {
  const categories = useStore(selectCategories);
  const setCategories = useStore(selectSetCategories);
  const navigation = useNavigation<UseNavigation>();
  const [search, setSearch] = useState('');

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
  }, [setCategories, userId]);

  const handleSearch = () => {
    navigation.navigate('TodosScreen', { filter: 'search', search });
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Spinner size="l" />
      ) : (
        <>
          <Container>
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
              <Input
                withSearchIcon
                size="l"
                withShadow
                value={search}
                onChangeText={setSearch}
                onIconClick={handleSearch}
                placeholder="Search tasks"
              />
            </Header>
            <CategoryCardsSection />
          </Container>
        </>
      )}
    </MainLayout>
  );
};
