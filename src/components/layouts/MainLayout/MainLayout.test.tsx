import React from 'react';

import { Text } from '@components/atoms/Text';
import { render, screen } from '@test-utils';

import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders correctly', () => {
    render(
      <MainLayout>
        <Text>content</Text>
      </MainLayout>,
    );

    const content = screen.getByText('content');
    expect(content).toBeOnTheScreen();
  });
});
