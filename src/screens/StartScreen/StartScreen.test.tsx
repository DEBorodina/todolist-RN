import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { USER_ID_KEY } from '@constants';
import { fireEvent, render, screen, waitFor } from '@test-utils';

import { StartScreen } from './StartScreen';
import { BUTTON_TEXT, SUBTITLE, TITLE } from './config';

jest.mock('react-native-uuid', () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockSetUserId = jest.fn();

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: () => ({ add: jest.fn(() => ({ id: '1' })) }),
}));

jest.mock('@store', () => ({
  useStore: jest.fn(() => mockSetUserId),
}));

describe('StartScreen', () => {
  it('renders correctly', () => {
    render(<StartScreen />);

    expect(screen.getByText(TITLE)).toBeTruthy();
    expect(screen.getByText(BUTTON_TEXT)).toBeTruthy();
    expect(screen.getByText(SUBTITLE)).toBeTruthy();
  });

  it('sets userId on click', async () => {
    render(<StartScreen />);

    const button = screen.getByText(BUTTON_TEXT);
    fireEvent.press(button);

    await waitFor(async () => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(USER_ID_KEY, '1');
      expect(mockSetUserId).toHaveBeenCalledWith(1);
    });
  });
});
