import React from 'react';
import { Text } from 'react-native';

import { render } from '@test-utils';

import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders with the full layout image when isFullLayout is true', () => {
    const { getByTestId } = render(
      <MainLayout isFullLayout={true}>
        <Text>Child Component</Text>
      </MainLayout>,
    );

    const backgroundImage = getByTestId('background');

    expect(backgroundImage.props.source).toEqual(
      require('assets/images/full-layout.png'),
    );
  });

  it('renders with the default layout image when isFullLayout is false', () => {
    const { getByTestId } = render(
      <MainLayout isFullLayout={false}>
        <Text>Child Component</Text>
      </MainLayout>,
    );

    const backgroundImage = getByTestId('background');

    expect(backgroundImage.props.source).toEqual(
      require('assets/images/layout.png'),
    );
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <MainLayout isFullLayout={false}>
        <Text>Child Component</Text>
      </MainLayout>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });
});
