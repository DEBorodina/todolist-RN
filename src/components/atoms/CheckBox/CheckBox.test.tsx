import React from 'react';

import { fireEvent, render } from '@test-utils';

import { CheckBox } from './CheckBox';

describe('CheckBox', () => {
  it('does not render checkmark icon when unchecked', () => {
    const onChange = jest.fn();
    const { queryByTestId } = render(
      <CheckBox isChecked={false} onChange={onChange} />,
    );

    expect(queryByTestId('check-mark')).toBeNull();
  });

  it('renders checkmark icon when checked', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBox isChecked={true} onChange={onChange} />,
    );

    expect(getByTestId('check-mark')).toBeTruthy();
  });

  it('calls onChange with false when checked and pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBox isChecked={true} onChange={onChange} />,
    );

    fireEvent.press(getByTestId('checkbox'));

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('calls onChange with true when unchecked and pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBox isChecked={false} onChange={onChange} />,
    );

    fireEvent.press(getByTestId('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
