import React from 'react';

import { render, screen } from '@test-utils';

import { Text } from '../Text';

import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  it('renders with correct children', () => {
    render(
      <StatusBar>
        <Text>content</Text>
      </StatusBar>,
    );

    expect(screen.getByText('content')).toBeOnTheScreen();
  });
});
