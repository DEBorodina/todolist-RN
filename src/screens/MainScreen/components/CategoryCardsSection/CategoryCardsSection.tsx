import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'styled-components/native';

import { useModal } from '@components/molecules/Modal';

import { AddCategoryForm } from '../AddCategoryForm';
import { CategoryCard } from '../CategoryCard';

import { AddButton, StyledCategoryCardsSection } from './styles';
import { CategoryCardsSectionProps } from './types';

export const CategoryCardsSection: FC<CategoryCardsSectionProps> = ({
  categories,
  setCategories,
}) => {
  const { colors } = useTheme();
  const { setModalContent, setIsOpen } = useModal();

  const handleAddCategory = () => {
    setModalContent(<AddCategoryForm setCategories={setCategories} />);
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
