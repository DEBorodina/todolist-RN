import React from 'react';

import { render } from '@test-utils';

import { TaskGroupSection } from './TaskGroupSection';

describe('TaskGroupSection', () => {
  it('renders correctly', () => {
    render(<TaskGroupSection categories={[]} />);
  });
});
