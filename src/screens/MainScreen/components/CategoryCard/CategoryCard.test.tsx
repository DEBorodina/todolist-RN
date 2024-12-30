import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { fireEvent, render } from '@test-utils';

import { CategoryCard } from './CategoryCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('@navigation', () => ({
  SCREENS: { TODOS_SCREEN: 'TodosScreen' },
}));

const defaultProps = {
  color: 'blue',
  tasksAmount: 5,
  iconName: 'checkmark-circle',
  name: 'Work',
  id: '123',
};

describe('CategoryCard', () => {
  it('renders correctly with given props', () => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() });

    const { getByText, getByTestId } = render(
      <CategoryCard {...defaultProps} />,
    );

    expect(getByText('5')).toBeTruthy();
    expect(getByText('Work')).toBeTruthy();
    expect(getByTestId('category-card-icon')).toBeTruthy();
  });

  it('calls navigation on press', () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate });

    const { getByTestId } = render(<CategoryCard {...defaultProps} />);

    const card = getByTestId('category-card');
    fireEvent.press(card);

    expect(navigate).toHaveBeenCalledWith('TodosScreen', {
      filter: 'category',
      categoryId: '123',
    });
  });
});
