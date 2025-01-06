import { Category, Task } from '@firestore';

import { filterTasks, getTitle } from './helpers';
import { updateTaskDoneStatus } from './helpers';
import { updateSubtaskDoneStatus } from './helpers';

describe('getTitle', () => {
  const categories = [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' },
    { id: '3', name: 'Shopping' },
  ] as Category[];

  it('should return "All tasks" for filter "all"', () => {
    const filter = { filter: 'all' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('All tasks');
  });

  it('should return "Tasks in category" with the correct category name for filter "category"', () => {
    const filter = { filter: 'category', categoryId: '2' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('Tasks in category "Personal"');
  });

  it('should return "Important tasks" for filter "important"', () => {
    const filter = { filter: 'important' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('Important tasks');
  });

  it('should return "Done tasks" for filter "done"', () => {
    const filter = { filter: 'done' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('Done tasks');
  });

  it('should return "Search results for <search term>" for filter "search"', () => {
    const filter = { filter: 'search', search: 'Groceries' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('Search results for "Groceries"');
  });

  it('should return "Tasks in category <name>" for an invalid categoryId (not found)', () => {
    const filter = { filter: 'category', categoryId: '999' } as const;
    const result = getTitle(filter, categories);
    expect(result).toBe('Tasks in category "undefined"');
  });
});

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Important task',
    isImportant: true,
    isDone: false,
    categoryId: '1',
    userId: '1',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Another task',
    isImportant: false,
    isDone: true,
    categoryId: '2',
    userId: '1',
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Some task',
    isImportant: false,
    isDone: false,
    categoryId: '1',
    userId: '1',
  },
  {
    id: '4',
    title: 'Task 4',
    description: 'Important task',
    isImportant: true,
    isDone: true,
    categoryId: '3',
    userId: '1',
  },
  {
    id: '5',
    title: 'Shopping',
    description: 'Buy groceries',
    isImportant: false,
    isDone: false,
    categoryId: '3',
    userId: '1',
  },
];

describe('filterTasks', () => {
  it('should return all tasks when filter is "all"', () => {
    const params = {
      filter: 'all',
      categoryId: undefined,
      search: undefined,
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual(tasks);
  });

  it('should return important tasks when filter is "important"', () => {
    const params = {
      filter: 'important',
      categoryId: undefined,
      search: undefined,
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual([tasks[0], tasks[3]]);
  });

  it('should return done tasks when filter is "done"', () => {
    const params = {
      filter: 'done',
      categoryId: undefined,
      search: undefined,
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual([tasks[1], tasks[3]]);
  });

  it('should return tasks from the specified category when filter is "category"', () => {
    const params = {
      filter: 'category',
      categoryId: '1',
      search: undefined,
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual([tasks[0], tasks[2]]);
  });

  it('should return tasks that match the search term when filter is "search"', () => {
    const params = {
      filter: 'search',
      categoryId: undefined,
      search: 'Important task',
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual([tasks[0], tasks[3]]);
  });

  it('should return an empty array when no tasks match the search term', () => {
    const params = {
      filter: 'search',
      categoryId: undefined,
      search: 'nonexistent',
    } as const;
    const result = filterTasks(tasks, params);
    expect(result).toEqual([]);
  });
});

describe('updateTaskDoneStatus', () => {
  const initialTasks = [
    { id: '1', title: 'Task 1', isDone: false },
    { id: '2', title: 'Task 2', isDone: false },
    { id: '3', title: 'Task 3', isDone: true },
  ] as Task[];

  it('should update the isDone status of the specified task', () => {
    const updatedTasks = updateTaskDoneStatus(initialTasks, '1', true);
    expect(updatedTasks).toEqual([
      { id: '1', title: 'Task 1', isDone: true },
      { id: '2', title: 'Task 2', isDone: false },
      { id: '3', title: 'Task 3', isDone: true },
    ]);
  });

  it('should not modify tasks that do not match the specified taskId', () => {
    const updatedTasks = updateTaskDoneStatus(initialTasks, '2', true);
    expect(updatedTasks).toEqual([
      { id: '1', title: 'Task 1', isDone: false },
      { id: '2', title: 'Task 2', isDone: true },
      { id: '3', title: 'Task 3', isDone: true },
    ]);
  });

  it('should return the original tasks array if no task matches the given taskId', () => {
    const updatedTasks = updateTaskDoneStatus(initialTasks, '999', true);
    expect(updatedTasks).toEqual(initialTasks);
  });

  it('should handle an empty task list', () => {
    const updatedTasks = updateTaskDoneStatus([], '1', true);
    expect(updatedTasks).toEqual([]);
  });

  it('should handle a single task list', () => {
    const singleTaskList = [
      { id: '1', title: 'Single Task', isDone: false },
    ] as Task[];
    const updatedTasks = updateTaskDoneStatus(singleTaskList, '1', true);
    expect(updatedTasks).toEqual([
      { id: '1', title: 'Single Task', isDone: true },
    ]);
  });
});
// Adjust the path if necessary

describe('updateSubtaskDoneStatus', () => {
  const initialTasks = [
    {
      id: '1',
      title: 'Task 1',
      isDone: false,
      subtasks: [
        { id: 'a', title: 'Subtask 1a', isDone: false },
        { id: 'b', title: 'Subtask 1b', isDone: false },
      ],
    },
    {
      id: '2',
      title: 'Task 2',
      isDone: false,
      subtasks: [
        { id: 'c', title: 'Subtask 2a', isDone: true },
        { id: 'd', title: 'Subtask 2b', isDone: true },
      ],
    },
    {
      id: '3',
      title: 'Task 3',
      isDone: false,
      subtasks: [],
    },
  ] as Task[];

  it('should update the isDone status of the specified subtask', () => {
    const updatedTasks = updateSubtaskDoneStatus(initialTasks, '1', 'a', true);
    expect(updatedTasks).toEqual([
      {
        id: '1',
        title: 'Task 1',
        isDone: false,
        subtasks: [
          { id: 'a', title: 'Subtask 1a', isDone: true },
          { id: 'b', title: 'Subtask 1b', isDone: false },
        ],
      },
      {
        id: '2',
        title: 'Task 2',
        isDone: false,
        subtasks: [
          { id: 'c', title: 'Subtask 2a', isDone: true },
          { id: 'd', title: 'Subtask 2b', isDone: true },
        ],
      },
      {
        id: '3',
        title: 'Task 3',
        isDone: false,
        subtasks: [],
      },
    ]);
  });

  it('should not modify tasks that do not match the specified openedTaskId', () => {
    const updatedTasks = updateSubtaskDoneStatus(initialTasks, '99', 'a', true);
    expect(updatedTasks).toEqual(initialTasks);
  });

  it('should mark the parent task as done if all subtasks are completed', () => {
    const updatedTasks = updateSubtaskDoneStatus(initialTasks, '1', 'a', true);
    const furtherUpdatedTasks = updateSubtaskDoneStatus(
      updatedTasks,
      '1',
      'b',
      true,
    );
    expect(furtherUpdatedTasks).toEqual([
      {
        id: '1',
        title: 'Task 1',
        isDone: true,
        subtasks: [
          { id: 'a', title: 'Subtask 1a', isDone: true },
          { id: 'b', title: 'Subtask 1b', isDone: true },
        ],
      },
      {
        id: '2',
        title: 'Task 2',
        isDone: false,
        subtasks: [
          { id: 'c', title: 'Subtask 2a', isDone: true },
          { id: 'd', title: 'Subtask 2b', isDone: true },
        ],
      },
      {
        id: '3',
        title: 'Task 3',
        isDone: false,
        subtasks: [],
      },
    ]);
  });

  it('should not modify tasks with no subtasks', () => {
    const updatedTasks = updateSubtaskDoneStatus(initialTasks, '3', 'a', true);
    expect(updatedTasks).toEqual(initialTasks);
  });

  it('should handle tasks with missing subtasks array gracefully', () => {
    const tasksWithMissingSubtasks = [
      { id: '1', title: 'Task 1', isDone: false },
      { id: '2', title: 'Task 2', isDone: false, subtasks: [] },
    ] as Task[];

    const updatedTasks = updateSubtaskDoneStatus(
      tasksWithMissingSubtasks,
      '2',
      'a',
      true,
    );
    expect(updatedTasks).toEqual(tasksWithMissingSubtasks);
  });
});
