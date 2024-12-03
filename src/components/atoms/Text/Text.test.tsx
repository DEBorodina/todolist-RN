import React from 'react';

import { render, screen } from '@test-utils';

import { Text } from './Text';

describe('Text', () => {
  it('renders with correct children', () => {
    render(<Text>Hello world</Text>);

    const textContent = screen.getByText('Hello world');
    expect(textContent).toBeOnTheScreen();
  });
});
