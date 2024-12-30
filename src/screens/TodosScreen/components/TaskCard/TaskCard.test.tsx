import React from 'react';

import { render } from '@test-utils';

import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  it('renders correctly', () => {
    render(<TaskCard />);
  });
});
