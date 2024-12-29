import React from 'react';

import { render } from '@test-utils';

import { CategoryCardsSection } from './CategoryCardsSection';

describe('CategoryCardsSection', () => {
  it('renders correctly', () => {
    render(<CategoryCardsSection categories={[]} setCategories={() => {}} />);
  });
});
