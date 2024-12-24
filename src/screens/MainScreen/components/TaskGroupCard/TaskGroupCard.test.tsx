import React from 'react';

import { render, screen } from '@test-utils';

import { TaskGroupCard } from './TaskGroupCard';

const card = {
  color: '#2A8899',
  iconName: 'school-outline',
  name: 'School',
  tasksAmount: 12,
};

describe('TaskGroupCard', () => {
  it('renders correctly', () => {
    render(<TaskGroupCard {...card} />);

    expect(screen.getByText(card.name)).toBeOnTheScreen();
    expect(screen.getByText(String(card.tasksAmount))).toBeOnTheScreen();
  });
});
