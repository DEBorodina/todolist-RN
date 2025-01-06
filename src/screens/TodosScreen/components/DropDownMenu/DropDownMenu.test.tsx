import React from 'react';
import { EventProvider } from 'react-native-outside-press';

import { render as baseRender, fireEvent } from '@test-utils';

import { DropDownMenu } from './DropDownMenu';

const render = (children: React.ReactNode) =>
  baseRender(<EventProvider>{children}</EventProvider>);

describe('DropDownMenu', () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const baseProps = {
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
    withEdit: true,
  };

  it('should render the menu with edit and delete options when "withEdit" is true', () => {
    const { queryByText, getByTestId } = render(
      <DropDownMenu {...baseProps} />,
    );

    expect(queryByText('edit task')).toBeFalsy();
    expect(queryByText('delete task')).toBeFalsy();

    const dots = getByTestId('dots');
    fireEvent.press(dots);

    expect(queryByText('edit task')).toBeTruthy();
    expect(queryByText('delete task')).toBeTruthy();
  });

  it('should render the menu with only the delete option when "withEdit" is false', () => {
    const { getByText, getByTestId } = render(
      <DropDownMenu {...baseProps} withEdit={false} />,
    );

    expect(() => getByText('delete task')).toThrow();

    fireEvent.press(getByTestId('dots'));

    expect(getByText('delete task')).toBeTruthy();
    expect(() => getByText('edit task')).toThrow();
  });

  it('should call onEdit when the edit task item is pressed', () => {
    const { getByText, getByTestId } = render(<DropDownMenu {...baseProps} />);

    fireEvent.press(getByTestId('dots'));

    fireEvent.press(getByText('edit task'));

    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('should call onDelete when the delete task item is pressed', () => {
    const { getByText, getByTestId } = render(<DropDownMenu {...baseProps} />);

    fireEvent.press(getByTestId('dots'));

    fireEvent.press(getByText('delete task'));

    expect(mockOnDelete).toHaveBeenCalled();
  });

  it('should close the menu when clicking outside', () => {
    const { getByTestId, getByText } = render(<DropDownMenu {...baseProps} />);

    fireEvent.press(getByTestId('dots'));

    expect(getByText('edit task')).toBeTruthy();

    fireEvent.press(getByText('delete task'));

    expect(() => getByText('edit task')).toThrow();
    expect(() => getByText('delete task')).toThrow();
  });

  it('should close the menu when the "delete task" or "edit task" options are clicked', () => {
    const { getByText, getByTestId } = render(<DropDownMenu {...baseProps} />);

    fireEvent.press(getByTestId('dots'));

    expect(getByText('edit task')).toBeTruthy();

    fireEvent.press(getByText('delete task'));

    expect(() => getByText('edit task')).toThrow();
    expect(() => getByText('delete task')).toThrow();

    fireEvent.press(getByTestId('dots'));

    fireEvent.press(getByText('edit task'));

    expect(() => getByText('edit task')).toThrow();
    expect(() => getByText('delete task')).toThrow();
  });
});
