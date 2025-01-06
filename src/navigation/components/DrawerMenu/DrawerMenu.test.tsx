import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';

import { useStore } from '@store';
import { fireEvent, render } from '@test-utils';

import { SCREENS } from '../../constants';

import { DrawerMenu } from './DrawerMenu';
import { DRAWER_MENU_ITEMS, SWITCH_THEME } from './constants';

// Mock navigation and other hooks
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

    // Test that the drawer items are rendered
    DRAWER_MENU_ITEMS.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('should navigate when an item is pressed', () => {
    const { getByText } = render(<DrawerMenu {...defaultProps} />);

    const menuItem = DRAWER_MENU_ITEMS[0]; // Test first item
    fireEvent.press(getByText(menuItem.name));

    // Ensure navigation was called with the correct screen and params
    expect(mockNavigate).toHaveBeenCalledWith(
      SCREENS.TODOS_SCREEN,
      menuItem.params,
    );
  });

  it('should close the drawer when the back arrow is pressed', () => {
    const { getByTestId } = render(<DrawerMenu {...defaultProps} />);

    // Press back arrow to close the drawer
    fireEvent.press(getByTestId('back-arrow'));

    expect(mockCloseDrawer).toHaveBeenCalled();
  });

  it('should trigger theme switch when the theme item is pressed', () => {
    const { getByText } = render(<DrawerMenu {...defaultProps} />);

    // Test the theme switch item
    fireEvent.press(getByText(SWITCH_THEME));

    // Ensure that the theme switch function was called
    expect(mockSwitchTheme).toHaveBeenCalled();
  });
});
