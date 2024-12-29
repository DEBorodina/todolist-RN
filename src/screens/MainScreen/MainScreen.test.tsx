import React from 'react';

import { render } from '@test-utils';

import { MainScreen } from './MainScreen';

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: () => ({ add: jest.fn() }),
}));

describe('MainScreen', () => {
  it('renders correctly', () => {
    render(<MainScreen />);
  });
});
