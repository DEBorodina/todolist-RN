import React from 'react';

import { fireEvent, render } from '@test-utils';

import { DoneTasksBlock } from './DoneTasksBlock';

describe('DoneTasksBlock', () => {
  const mockOnPress = jest.fn();

  const baseProps = {
    tasksAmount: 5,
    isOpen: false,
    onPress: mockOnPress,
  };

  it('should render the title with the correct amount of done tasks', () => {
    const { getByText } = render(<DoneTasksBlock {...baseProps} />);

    expect(getByText('Done tasks (5)')).toBeTruthy();
  });

  it('should render the chevron-down icon when isOpen is false', () => {
    const { getByTestId } = render(<DoneTasksBlock {...baseProps} />);

    expect(getByTestId('chevron-down')).toBeTruthy();
  });

  it('should render the chevron-up icon when isOpen is true', () => {
    const { getByTestId } = render(
      <DoneTasksBlock {...baseProps} isOpen={true} />,
    );

    expect(getByTestId('chevron-up')).toBeTruthy();
  });

  it('should call onPress when the icon is pressed', () => {
    const { getByTestId } = render(<DoneTasksBlock {...baseProps} />);

    const icon = getByTestId('chevron-down');
    fireEvent.press(icon);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
