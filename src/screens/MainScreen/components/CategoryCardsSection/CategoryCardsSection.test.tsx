import React from 'react';

import { useStore } from '@store';
import { render, userEvent } from '@test-utils';

import { AddCategoryForm } from '../AddCategoryForm';

import { CategoryCardsSection } from './CategoryCardsSection';

jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('@navigation', () => ({
  SCREENS: { TODOS_SCREEN: 'TodosScreen' },
}));

jest.mock('@store', () => ({
  selectCategories: jest.fn(),
  useStore: jest.fn(),
}));

const mockSetModalContent = jest.fn();
const mockSetIsOpen = jest.fn();
jest.mock('@components/molecules/Modal', () => ({
  useModal: jest.fn(() => ({
    setModalContent: mockSetModalContent,
    setIsOpen: mockSetIsOpen,
  })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CategoryCardsSection', () => {
  const mockCategories = [
    {
      id: '1',
      color: 'blue',
      tasksAmount: 5,
      iconName: 'checkmark-circle',
      name: 'Work',
    },
    {
      id: '2',
      color: 'green',
      tasksAmount: 2,
      iconName: 'star',
      name: 'Personal',
    },
  ];

  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue(mockCategories);
  });

  it('renders CategoryCard components for each category', () => {
    const { getByText } = render(<CategoryCardsSection />);

    expect(getByText('Work')).toBeTruthy();
    expect(getByText('Personal')).toBeTruthy();
  });

  it('renders the "Add Category" button', () => {
    const { getByTestId } = render(<CategoryCardsSection />);

    const addButton = getByTestId('add-category-button');
    expect(addButton).toBeTruthy();
  });

  it('opens the modal when the "Add Category" button is pressed', async () => {
    const { getByTestId } = render(<CategoryCardsSection />);

    const addButton = getByTestId('add-category-button');
    const user = userEvent.setup();
    await user.press(addButton);

    expect(mockSetModalContent).toHaveBeenCalledWith(<AddCategoryForm />);
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it('passes the correct props to CategoryCard', () => {
    const { getByText } = render(<CategoryCardsSection />);

    mockCategories.forEach(category => {
      expect(getByText(category.name)).toBeTruthy();
    });
  });
});
