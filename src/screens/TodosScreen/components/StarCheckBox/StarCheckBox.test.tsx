import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { StarCheckBox } from './StarCheckBox';

jest.mock('assets/images/yellow-start.png', () => 'yellow-star');
jest.mock('assets/images/gray-star.png', () => 'gray-star');

describe('StarCheckBox', () => {
  const mockOnChange = jest.fn();

  const baseProps = {
    isChecked: false,
    onChange: mockOnChange,
  };

  it('should render the gray star when isChecked is false', () => {
    const { getByTestId } = render(<StarCheckBox {...baseProps} />);

    const image = getByTestId('star');
    expect(image.props.source).toBe('gray-star');
  });

  it('should render the yellow star when isChecked is true', () => {
    const { getByTestId } = render(
      <StarCheckBox {...baseProps} isChecked={true} />,
    );

    const image = getByTestId('star');
    expect(image.props.source).toBe('yellow-star');
  });

  it('should call onChange with the opposite value when pressed', () => {
    const { getByTestId } = render(<StarCheckBox {...baseProps} />);

    fireEvent.press(getByTestId('star'));

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
