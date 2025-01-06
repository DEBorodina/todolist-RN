import React, { act } from 'react';
import { EventProvider } from 'react-native-outside-press';

import { useModal } from '@components/molecules/Modal';
import { deleteTask, getFirestoreTasks, updateFirestoreTask } from '@firestore';
import { useStore } from '@store';
import { fireEvent, render, screen, waitFor } from '@test-utils';

import { TodosScreen } from './TodosScreen';
import { TodosScreenProps } from './types';

jest.mock('@firestore', () => ({
  updateFirestoreTask: jest.fn(),
  deleteTask: jest.fn(),
  getFirestoreTasks: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@components/molecules/Modal', () => ({
  useModal: jest.fn(),
}));

jest.mock('@store', () => ({
  useStore: jest.fn(),
  selectCategories: 'selectCategories',
  selectUserId: 'selectUserId',
}));

const mockTasks = [
  {
    id: '1',
    title: 'Test Task 1',
    isDone: false,
    isImportant: true,
    categoryId: '1',
    subtasks: [{ id: '1', title: 'Subtask 1', isDone: false }],
  },
  { id: '2', title: 'Test Task 2', isDone: false, categoryId: '2' },
  { id: '2', title: 'Test Task 3', isDone: true, categoryId: '1' },
];

const mockCategories = [{ id: '1', name: 'Work', tasksAmount: 2 }];

const routeParams = {
  route: { params: { filter: 'all' } },
} as TodosScreenProps;

describe('TodosScreen', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockImplementation(selector => {
      switch (selector) {
        case 'selectCategories':
          return mockCategories;
        case 'selectUserId':
          return 'user1';
        default:
          return jest.fn();
      }
    });
    (useModal as jest.Mock).mockReturnValue({
      setIsOpen: jest.fn(),
      setModalContent: jest.fn(),
    });
    (getFirestoreTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
  });

  it('should render the loading spinner initially', () => {
    render(<TodosScreen {...routeParams} />);

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  it('should filter tasks based on the done filter in route params', async () => {
    render(
      <TodosScreen
        {...{
          ...routeParams,
          route: {
            params: { filter: 'done' },
          } as TodosScreenProps['route'],
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText('Test Task 3')).toBeTruthy();
      expect(screen.queryByText('Test Task 1')).toBeNull();
      expect(screen.queryByText('Test Task 2')).toBeNull();
    });
  });

  it('should handle deleting a task', async () => {
    render(
      <EventProvider>
        <TodosScreen {...routeParams} />
      </EventProvider>,
    );

    await waitFor(() => {
      fireEvent.press(screen.getByText('All tasks'));
    });

    act(() => {
      const dots = screen.getAllByTestId('dots')[0];
      fireEvent.press(dots);
    });

    fireEvent.press(screen.getByText('delete task'));

    expect(deleteTask).toHaveBeenCalledWith('1');
  });

  it('should handle editing a task', async () => {
    const { setIsOpen, setModalContent } = useModal();

    render(
      <EventProvider>
        <TodosScreen {...routeParams} />
      </EventProvider>,
    );

    await waitFor(() => {
      fireEvent.press(screen.getByText('All tasks'));
    });

    act(() => {
      const dots = screen.getAllByTestId('dots')[0];
      fireEvent.press(dots);
    });

    fireEvent.press(screen.getByText('edit task'));

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setModalContent).toHaveBeenCalled();
  });

  it('should toggle the DoneTasksBlock when clicked', async () => {
    render(<TodosScreen {...routeParams} />);

    await waitFor(() => {
      const doneTasksBlock = screen.getByTestId('chevron-down');
      fireEvent.press(doneTasksBlock);
    });

    await waitFor(() => {
      expect(screen.getByText('Done tasks (1)')).toBeTruthy();
    });
  });

  it('should render tasks after fetching them', async () => {
    render(<TodosScreen {...routeParams} />);

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeTruthy();
      expect(screen.getByText('Test Task 2')).toBeTruthy();
    });
  });

  it('should filter tasks based on the filter in route params', async () => {
    render(
      <TodosScreen
        {...{
          ...routeParams,
          route: {
            params: { filter: 'important' },
          } as TodosScreenProps['route'],
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeTruthy();
      expect(screen.queryByText('Test Task 2')).toBeFalsy();
      expect(screen.queryByText('Test Task 3')).toBeFalsy();
    });
  });

  it('should handle adding a new task', async () => {
    const { setIsOpen, setModalContent } = useModal();

    render(<TodosScreen {...routeParams} />);

    await waitFor(() => {
      fireEvent.press(screen.getByTestId('add'));
    });

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setModalContent).toHaveBeenCalled();
  });

  it('should handle marking a task as done', async () => {
    render(<TodosScreen {...routeParams} />);

    await waitFor(() => {
      fireEvent.press(screen.getAllByTestId('checkbox')[0]);
    });

    expect(updateFirestoreTask).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', isDone: true }),
    );
  });

  it('should handle marking a subtask as done', async () => {
    render(<TodosScreen {...routeParams} />);

    await waitFor(() => {
      fireEvent.press(screen.getByText('Test Task 1'));
    });

    fireEvent.press(screen.getAllByTestId('checkbox')[1]);

    expect(updateFirestoreTask).toHaveBeenCalled();
  });
});
