import React from 'react';
import { Text } from 'react-native';

import { fireEvent, render, screen } from '../../../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct children', () => {
    render(
      <Button onPress={() => {}}>
        <Text>Click Me</Text>
      </Button>,
    );
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeOnTheScreen();
  });

  it('calls onPress function when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button onPress={handleClick}>
        <Text>Click Me</Text>
      </Button>,
    );
    const buttonElement = screen.getByText('Click Me');

    fireEvent.press(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
