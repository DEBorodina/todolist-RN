import React from 'react';

import { fireEvent, render } from '@test-utils';

import { BurgerMenu } from './BurgerMenu';

describe('BurgerMenu', () => {
  const mockToggleDrawer = jest.fn();
  const navigation = { toggleDrawer: mockToggleDrawer, goBack: jest.fn() };

  it('calls toggleDrawer when pressed', () => {
    const { getByTestId } = render(<BurgerMenu navigation={navigation} />);

    const menu = getByTestId('burger-menu');
    fireEvent.press(menu);

    expect(mockToggleDrawer).toHaveBeenCalled();
  });
});
