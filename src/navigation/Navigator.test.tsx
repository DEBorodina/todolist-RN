import React from 'react';
import { Text } from 'react-native';

import { render, screen, waitFor } from '@test-utils';
import { getAsyncStorageItem } from '@utils';

import { Navigator } from './Navigator';

jest.mock('@utils');
jest.mock('@react-native-firebase/firestore', () => () => ({}));

const mockDrawer = <Text>Drawer</Text>;
jest.mock('./Drawer', () => ({
  Drawer: () => mockDrawer, // Direct use of Text in the mock
}));

describe('Navigator', () => {
  it('renders StartScreen initially while checking user', () => {
    render(<Navigator />);

    expect(screen.queryByText('Drawer')).toBeNull(); // Ensure Drawer is not initially rendered
    expect(screen.queryByText('StartScreen')).toBeNull(); // Ensure StartScreen is not initially rendered (due to hasCheckedUser being false)
  });

  it('renders StartScreen when no user is found', async () => {
    (
      getAsyncStorageItem as jest.MockedFunction<typeof getAsyncStorageItem>
    ).mockResolvedValueOnce(null);

    render(<Navigator />);

    await waitFor(() => {
      expect(screen.getByText('Get started')).toBeTruthy();
    });
  });

  it('renders Drawer when user is found', async () => {
    const mockUserId = '123';
    (
      getAsyncStorageItem as jest.MockedFunction<typeof getAsyncStorageItem>
    ).mockResolvedValueOnce(mockUserId);

    render(<Navigator />);

    await waitFor(() => {
      expect(screen.getByText('Drawer')).toBeTruthy();
    });
  });
});
