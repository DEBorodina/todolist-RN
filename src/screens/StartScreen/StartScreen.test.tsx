import React from 'react';

import { render } from '@test-utils';

import { StartScreen } from './StartScreen';

// нужно замокать async storage и редакс
describe('StartScreen', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders correctly', () => {
    const component = render(<StartScreen />);
    expect(component).toMatchSnapshot();
  });
});
