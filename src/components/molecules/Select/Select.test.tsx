import React from 'react';
import { Text } from 'react-native';

import { fireEvent, render, userEvent } from '@test-utils';

import { Select } from './Select';

const user = userEvent.setup();

const itemProps = {
  items: ['Item 1', 'Item 2'],
  renderItem: (item: string) => <Text>{item}</Text>,
};

describe('Select', () => {
  it('should render the input field', () => {
    const { getByTestId } = render(<Select value="" {...itemProps} />);
    const input = getByTestId('input');
    expect(input).toBeTruthy();
  });

  it('should open the dropdown menu on input focus', async () => {
    const { getByTestId, getByText } = render(<Select {...itemProps} />);
    const input = getByTestId('input');

    fireEvent.changeText(input, 'Item');

    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('should close the dropdown menu on blur', async () => {
    const mockOnBlur = jest.fn();
    const { getByTestId } = render(
      <Select {...itemProps} onBlur={mockOnBlur} value="" />,
    );
    const input = getByTestId('input');

    await user.type(input, 'Hello');
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should close the dropdown menu on select', async () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId, getByText, queryByText } = render(
      <Select {...itemProps} onChangeText={mockOnChangeText} value="" />,
    );
    const input = getByTestId('input');

    fireEvent.changeText(input, 'Item');
    expect(queryByText('Item 2')).toBeTruthy();

    fireEvent.press(getByText('Item 1'));
    expect(mockOnChangeText).toHaveBeenCalledWith('Item 1');
    expect(queryByText('Item 2')).not.toBeTruthy();
  });

  it('should close the dropdown when value is an empty string', () => {
    const { rerender, getByTestId, getByText, queryByText } = render(
      <Select value="Some value" {...itemProps} />,
    );

    fireEvent.changeText(getByTestId('input'), 'Some input');
    expect(getByText('Item 1')).toBeTruthy();

    rerender(<Select value="" {...itemProps} />);

    expect(queryByText('Item 1')).toBeNull();
  });

  it('should call the onChangeText prop on input change', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <Select {...itemProps} value="" onChangeText={mockOnChangeText} />,
    );

    const input = getByTestId('input');
    fireEvent.changeText(input, 'New value');
    expect(mockOnChangeText).toHaveBeenCalledWith('New value');
  });
});
