import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';

import { useStore } from '@store';
import { fireEvent, render } from '@test-utils';

import { SCREENS } from '../../constants';

import { DrawerMenu } from './DrawerMenu';
import { DRAWER_MENU_ITEMS, SWITCH_THEME } from './constants';

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
}));

jest.mock('@store', () => ({
  useStore: jest.fn(),
  selectSwitchTheme: jest.fn(),
}));

describe('DrawerMenu', () => {
  const mockNavigate = jest.fn();
  const mockCloseDrawer = jest.fn();
  const mockSwitchTheme = jest.fn();

  const defaultProps = {
    navigation: {
      closeDrawer: mockCloseDrawer,
      navigate: mockNavigate,
    },
  } as unknown as DrawerContentComponentProps;

  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue(mockSwitchTheme);
  });

  it('should render menu items correctly', () => {
    const { getByText } = render(<DrawerMenu {...defaultProps} />);

    DRAWER_MENU_ITEMS.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('should navigate when an item is pressed', () => {
    const { getByText } = render(<DrawerMenu {...defaultProps} />);

    const menuItem = DRAWER_MENU_ITEMS[0];
    fireEvent.press(getByText(menuItem.name));

    expect(mockNavigate).toHaveBeenCalledWith(
      SCREENS.TODOS_SCREEN,
      menuItem.params,
    );
  });

  it('should close the drawer when the back arrow is pressed', () => {
    const { getByTestId } = render(<DrawerMenu {...defaultProps} />);

    fireEvent.press(getByTestId('back-arrow'));

    expect(mockCloseDrawer).toHaveBeenCalled();
  });

  it('should trigger theme switch when the theme item is pressed', () => {
    const { getByText } = render(<DrawerMenu {...defaultProps} />);

    fireEvent.press(getByText(SWITCH_THEME));

    expect(mockSwitchTheme).toHaveBeenCalled();
  });
});
