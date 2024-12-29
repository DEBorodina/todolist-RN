import React from 'react';

import { render, screen } from '@test-utils';

import { CategoryCard } from './CategoryCard';

const card = {
  color: '#2A8899',
  iconName: 'school-outline',
  name: 'School',
  tasksAmount: 12,
};

describe('CategoryCard', () => {
  it('renders correctly', () => {
    render(<CategoryCard {...card} />);

    expect(screen.getByText(card.name)).toBeOnTheScreen();
    expect(screen.getByText(String(card.tasksAmount))).toBeOnTheScreen();
  });
});
