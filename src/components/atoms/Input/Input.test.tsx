import React from 'react';

import { fireEvent, render, userEvent } from '@test-utils';

import { Input } from './Input';

const user = userEvent.setup();

describe('Input Component', () => {
  it('renders the search icon when withSearchIcon is true', () => {
    const { getByTestId } = render(<Input withSearchIcon={true} />);

    const searchIcon = getByTestId('search-icon');
    expect(searchIcon).toBeTruthy();
  });

  it('does not render the search icon when withSearchIcon is false', () => {
    const { queryByTestId } = render(<Input withSearchIcon={false} />);

    expect(queryByTestId('search-icon')).toBeNull();
  });

  it('calls onIconClick when search icon is pressed', () => {
    const onIconClick = jest.fn();
    const { getByTestId } = render(
      <Input withSearchIcon={true} onIconClick={onIconClick} />,
    );

    const searchIcon = getByTestId('search-icon');
    fireEvent.press(searchIcon);
    expect(onIconClick).toHaveBeenCalled();
  });

  it('passes the correct props to StyledInput', () => {
    const { getByPlaceholderText } = render(
      <Input
        size="l"
        withShadow={true}
        placeholder="Search"
        withSearchIcon={false}
      />,
    );

    const input = getByPlaceholderText('Search');

    expect(input).toBeTruthy();
    expect(input.props.size).toBe('l');
    expect(input.props.withShadow).toBe(true);
  });
  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input onChangeText={onChangeText} placeholder="Type here" value="" />,
    );

    const input = getByPlaceholderText('Type here');
    fireEvent.changeText(input, 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('calls onBlur when input is blurred', async () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <Input onBlur={onBlur} placeholder="Type here" value="" />,
    );

    const input = getByPlaceholderText('Type here');
    await user.type(input, 'Hello world!');

    expect(onBlur).toHaveBeenCalled();
  });

  it('displays the correct value and placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input value="Current text" placeholder="Type here" />,
    );

    const input = getByPlaceholderText('Type here');
    expect(input.props.value).toBe('Current text');
  });
});
