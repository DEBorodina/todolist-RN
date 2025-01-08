import React from 'react';

import { getFirestoreCategories } from '@firestore';
import { SCREENS } from '@navigation';
import { fireEvent, render, waitFor } from '@test-utils';

import { MainScreen } from './MainScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: mockNavigate })),
}));

jest.mock('@firestore', () => ({
  getFirestoreCategories: jest.fn(() => [
    { id: 'cat1', name: 'Category 1', tasksAmount: 5 },
    { id: 'cat2', name: 'Category 2', tasksAmount: 3 },
  ]),
}));

jest.mock('@store', () => ({
  ...jest.requireActual('@store'),
  selectUserId: jest.fn(() => 'user123'),
}));

jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('@navigation', () => ({
  SCREENS: { TODOS_SCREEN: 'TodosScreen' },
}));

describe('MainScreen', () => {
  it('should render loading spinner while data is being fetched', () => {
    const { getByTestId } = render(<MainScreen />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should fetch categories and render the UI after loading', async () => {
    const { getByText } = render(<MainScreen />);

    await waitFor(() => {
      expect(getByText('you have')).toBeTruthy();
      expect(getByText('8 tasks')).toBeTruthy();
      expect(getByText('!')).toBeTruthy();

      expect(getFirestoreCategories).toHaveBeenCalledWith('user123');
    });
  });

  it('should fetch categories and render the UI after loading if there is no tasks', async () => {
    (getFirestoreCategories as jest.Mock).mockImplementation(() => []);

    const { getByText } = render(<MainScreen />);

    await waitFor(() => {
      expect(getByText('you have')).toBeTruthy();
      expect(getByText('no tasks')).toBeTruthy();
      expect(getByText('!')).toBeTruthy();
    });
  });

  it('should allow the user to search tasks', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MainScreen />);

    await waitFor(() => {
      const searchInput = getByPlaceholderText('Search tasks');
      fireEvent.changeText(searchInput, 'Test search');

      fireEvent.press(getByTestId('search-icon'));

      expect(mockNavigate).toHaveBeenCalledWith(SCREENS.TODOS_SCREEN, {
        filter: 'search',
        search: 'Test search',
      });
    });
  });
});
