import React from 'react';

import { fireEvent, render } from '@test-utils';

import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  const mockOnDone = jest.fn();
  const mockOnSubtaskDone = jest.fn();
  const mockOnTaskPress = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const baseProps = {
    isOpen: true,
    isDone: false,
    title: 'Task Title',
    description: 'Task Description',
    userId: '1',
    id: '1',
    categoryId: '1',
    isImportant: false,
    subtasks: [
      { id: '1', title: 'Subtask 1', isDone: false },
      { id: '2', title: 'Subtask 2', isDone: true },
    ],
    onDone: mockOnDone,
    onSubtaskDone: () => mockOnSubtaskDone,
    onTaskPress: mockOnTaskPress,
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
  };

  it('should render the task title and description', () => {
    const { getByText } = render(<TaskCard {...baseProps} />);

    expect(getByText('Task Title')).toBeTruthy();
    expect(getByText('Task Description')).toBeTruthy();
  });

  it('should render subtasks when isOpen is true and there are subtasks', () => {
    const { getByText } = render(<TaskCard {...baseProps} />);

    expect(getByText('Subtask 1')).toBeTruthy();
    expect(getByText('Subtask 2')).toBeTruthy();
  });

  it('should not render subtasks when isOpen is false', () => {
    const { queryByText } = render(<TaskCard {...baseProps} isOpen={false} />);

    expect(queryByText('Subtask 1')).toBeNull();
    expect(queryByText('Subtask 2')).toBeNull();
  });

  it('should call onDone when the main task checkbox is clicked', () => {
    const { getAllByTestId } = render(<TaskCard {...baseProps} />);

    fireEvent.press(getAllByTestId('checkbox')[0]);
    expect(mockOnDone).toHaveBeenCalled();
  });

  it('should call onSubtaskDone when a subtask checkbox is clicked', () => {
    const { getAllByTestId } = render(<TaskCard {...baseProps} />);

    fireEvent.press(getAllByTestId('checkbox')[1]);
    expect(mockOnSubtaskDone).toHaveBeenCalledWith(true);

    fireEvent.press(getAllByTestId('checkbox')[2]);
    expect(mockOnSubtaskDone).toHaveBeenCalledWith(true);
  });

  it('should call onTaskPress when the task card is pressed', () => {
    const { getByText } = render(<TaskCard {...baseProps} />);

    fireEvent.press(getByText('Task Title'));
    expect(mockOnTaskPress).toHaveBeenCalled();
  });
});
