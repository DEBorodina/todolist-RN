import React from 'react';

import { addFirestoreTask, updateFirestoreTask } from '@firestore';
import { useStore } from '@store';
import { fireEvent, render, waitFor } from '@test-utils';

import { AddTaskForm } from './AddTaskForm';

jest.mock('@firestore', () => ({
  addFirestoreTask: jest.fn(),
  updateFirestoreTask: jest.fn(),
}));

jest.mock('@store', () => ({
  useStore: jest.fn(),
  selectCategories: 'selectCategories',
  selectUserId: 'selectUserId',
}));

const mockSetTasks = jest.fn();
const mockSetOpenedTaskId = jest.fn();

const defaultValues = {
  id: '123',
  title: 'Test Task',
  description: 'Test Description',
  category: 'Work',
  subtasks: [{ title: 'Subtask 1', id: 'subtask1', isDone: false }],
  isImportant: false,
};

const categories = [
  { id: '1', name: 'Work' },
  { id: '2', name: 'Personal' },
];

describe('AddTaskForm', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockImplementation(selector => {
      switch (selector) {
        case 'selectCategories':
          return categories;
        case 'selectUserId':
          return 'user1';
        default:
          return jest.fn();
      }
    });
  });

  it('renders correctly for adding a new task', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={{ ...defaultValues, id: undefined }}
      />,
    );

    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
    expect(getByText('Add new task')).toBeTruthy();
  });

  it('renders correctly for editing an existing task', () => {
    const { getByText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={{ ...defaultValues }}
      />,
    );

    expect(getByText('Edit task')).toBeTruthy();
  });

  it('submits form to add a new task', async () => {
    (addFirestoreTask as jest.Mock).mockResolvedValue('newTaskId');
    const { getByText, getByPlaceholderText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Title'), 'New Task');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'New Description',
    );
    fireEvent.changeText(getByPlaceholderText('Category'), 'Work');
    fireEvent.press(getByText('Add'));

    await waitFor(() => {
      expect(addFirestoreTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New Description',
        categoryId: '1',
        category: 'Work',
        is: undefined,
        userId: 'user1',
        subtasks: [],
        isDone: false,
        isImportant: false,
      });
      expect(mockSetTasks).toHaveBeenCalled();
    });
  });

  it('submits form to add a new task with no user id', async () => {
    (addFirestoreTask as jest.Mock).mockResolvedValue('newTaskId');
    (useStore as unknown as jest.Mock).mockImplementation(selector => {
      switch (selector) {
        case 'selectCategories':
          return categories;
        case 'selectUserId':
          return undefined;
        default:
          return jest.fn();
      }
    });

    const { getByText, getByPlaceholderText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Title'), 'New Task');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'New Description',
    );
    fireEvent.changeText(getByPlaceholderText('Category'), 'Work');
    fireEvent.press(getByText('Add'));

    await waitFor(() => {
      expect(addFirestoreTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New Description',
        categoryId: '1',
        category: 'Work',
        is: undefined,
        userId: '',
        subtasks: [],
        isDone: false,
        isImportant: false,
      });
      expect(mockSetTasks).toHaveBeenCalled();
    });
  });

  it('submits form to update an existing task', async () => {
    (updateFirestoreTask as jest.Mock).mockResolvedValue(undefined);

    const { getByText, getByPlaceholderText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={defaultValues}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Title'), 'Updated Task');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'Updated Description',
    );
    fireEvent.press(getByText('Update'));

    await waitFor(() => {
      expect(updateFirestoreTask).toHaveBeenCalledWith({
        id: '123',
        title: 'Updated Task',
        description: 'Updated Description',
        categoryId: '1',
        userId: 'user1',
        category: 'Work',
        subtasks: [{ title: 'Subtask 1', id: 'subtask1', isDone: false }],
        isDone: false,
        isImportant: false,
      });
      expect(mockSetTasks).toHaveBeenCalled();
    });
  });

  it('handles category selection change', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={{ ...defaultValues, id: undefined }}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Category'), 'Personal');
    expect(getByText('Personal')).toBeTruthy();
  });

  it('adds a subtask when the plus button is clicked', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={{ ...defaultValues, subtasks: [] }}
      />,
    );

    fireEvent.press(getByTestId('add'));

    expect(getByPlaceholderText('Subtask')).toBeTruthy();
  });

  it('doesn`t show add subtask button when there is 5 subtasks', () => {
    const { queryByTestId } = render(
      <AddTaskForm
        setTasks={mockSetTasks}
        setOpenedTaskId={mockSetOpenedTaskId}
        defaultValues={{
          ...defaultValues,
          subtasks: [
            {
              id: '',
              title: '',
              isDone: false,
            },
            {
              id: '',
              title: '',
              isDone: false,
            },
            {
              id: '',
              title: '',
              isDone: false,
            },
            {
              id: '',
              title: '',
              isDone: false,
            },
            {
              id: '',
              title: '',
              isDone: false,
            },
          ],
        }}
      />,
    );

    expect(queryByTestId('add')).toBeFalsy();
  });
});
