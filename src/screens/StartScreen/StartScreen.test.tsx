import { render } from '@testing-library/react-native';
import React from 'react';

import { StartScreen } from './StartScreen';

describe('StartScreen', () => {
  it('renders correctly', () => {
    const component = render(<StartScreen />);
    expect(component).toMatchSnapshot();
  });
});
