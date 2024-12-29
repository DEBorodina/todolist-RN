import React from 'react';

import { render } from '@test-utils';

import { TodosScreen } from './TodosScreen';

describe('TodosScreen', () => {
  it('renders correctly', () => {
    render(<TodosScreen />);
  });
});
