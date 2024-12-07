import React from 'react';

import { render } from '@test-utils';

import { StartScreen } from './StartScreen';

// нужно замокать async storage и редакс
describe('StartScreen', () => {
  it('renders correctly', () => {
    const component = render(<StartScreen />);
    expect(component).toMatchSnapshot();
  });
});
