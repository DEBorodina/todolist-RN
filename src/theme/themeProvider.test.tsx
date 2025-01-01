import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { useStore } from '@store';
import { getAsyncStorageItem } from '@utils';

import { LIGHT } from './constants';
import { GlobalThemeProvider } from './themeProvider';

jest.mock('@store', () => ({
  useStore: jest.fn(),
  selectTheme: 'selectTheme',
  selectSetTheme: 'selectSetTheme',
}));

jest.mock('@utils', () => ({
  getAsyncStorageItem: jest.fn(),
}));

(useStore as unknown as jest.Mock).mockImplementation(selector => {
  if (selector === 'selectTheme') {
    return LIGHT;
  }
  if (selector === 'selectSetTheme') {
    return jest.fn();
  }
  return null;
});

describe('GlobalThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', async () => {
    (useStore as unknown as jest.Mock).mockImplementation(selector => {
      if (selector === 'selectTheme') {
        return LIGHT;
      }
      if (selector === 'selectSetTheme') {
        return jest.fn();
      }
      return null;
    });
    (getAsyncStorageItem as jest.Mock).mockResolvedValue(LIGHT);

    const { getByText } = render(
      <GlobalThemeProvider>
        <Text>Test Children</Text>
      </GlobalThemeProvider>,
    );

    await waitFor(() => {
      expect(getByText('Test Children')).toBeTruthy();
    });
  });

  it('should render correct without initial theme', async () => {
    (useStore as unknown as jest.Mock).mockImplementation(selector => {
      if (selector === 'selectTheme') {
        return undefined;
      }
      if (selector === 'selectSetTheme') {
        return jest.fn();
      }
      return null;
    });
    (getAsyncStorageItem as jest.Mock).mockResolvedValue(undefined);

    const { getByText } = render(
      <GlobalThemeProvider>
        <Text>Test Children</Text>
      </GlobalThemeProvider>,
    );

    await waitFor(() => {
      expect(getByText('Test Children')).toBeTruthy();
    });
  });
});
