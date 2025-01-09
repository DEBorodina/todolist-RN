import React from 'react';
import { Text } from 'react-native';

import { fireEvent, render } from '@test-utils';

import { Button } from './Button';

describe('Button', () => {
  it('renders with correct children', () => {
    const { getByText } = render(
      <Button onClick={() => {}}>
        <Text>Click Me</Text>
      </Button>,
    );
    const button = getByText('Click Me');
    expect(button).toBeTruthy();
  });

  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>
        <Text>Click Me</Text>
      </Button>,
    );
    const button = getByText('Click Me');

    fireEvent.press(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows spinner and is blocked when isLoading', async () => {
    const handlePress = jest.fn();
    const { queryByText, getByTestId } = render(
      <Button onClick={handlePress} isLoading>
        <Text>Click Me</Text>
      </Button>,
    );
    const text = queryByText('Click Me');
    const spinner = getByTestId('spinner');

    fireEvent.press(spinner);

    expect(handlePress).toHaveBeenCalledTimes(0);
    expect(text).not.toBeTruthy();
    expect(spinner).toBeTruthy();
  });
});
