import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'styled-components/native';

import { useModal } from '@components/molecules/Modal';
import { selectCategories, useStore } from '@store';

import { AddCategoryForm } from '../AddCategoryForm';
import { CategoryCard } from '../CategoryCard';

import { AddButton, StyledCategoryCardsSection } from './styles';

export const CategoryCardsSection = () => {
  const { colors } = useTheme();
  const { setModalContent, setIsOpen } = useModal();
  const categories = useStore(selectCategories);

  const handleAddCategory = () => {
    setModalContent(<AddCategoryForm />);
    setIsOpen(true);
  };

  return (
    <ScrollView style={{ width: '100%' }}>
      <StyledCategoryCardsSection>
        {categories.map(category => (
          <CategoryCard {...category} key={category.id} />
        ))}
        <AddButton activeOpacity={0.7} onPress={handleAddCategory}>
          <Icon name="plus-a" size={35} color={colors.pink} />
        </AddButton>
      </StyledCategoryCardsSection>
    </ScrollView>
  );
};
