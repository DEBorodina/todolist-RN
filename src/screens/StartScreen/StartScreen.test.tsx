import React from 'react';

import { render } from '@test-utils';

import { StartScreen } from './StartScreen';

describe('StartScreen', () => {
  it('renders correctly', () => {
    const component = render(<StartScreen />);
    expect(component).toMatchSnapshot();
  });
});
