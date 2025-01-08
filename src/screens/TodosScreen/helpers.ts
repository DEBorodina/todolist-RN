import { Category, Task } from '@firestore';

import { TodosScreenProps } from './types';

const filters = {
  all: (task: Task) => task,
  important: (task: Task) => task.isImportant,
  done: (task: Task) => task.isDone,
  category: (categoryId?: string) => (task: Task) =>
    task.categoryId === categoryId,
  search: (search?: string) => (task: Task) =>
    search &&
    (task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())),
};

export const filterTasks = (
  tasks: Task[],
  { filter, categoryId, search }: TodosScreenProps['route']['params'],
) => {
  if (filter === 'category') {
    return tasks.filter(filters[filter](categoryId));
  }

  if (filter === 'search') {
    return tasks.filter(filters[filter](search));
  }

  return tasks.filter(filters[filter]);
};

export const getTitle = (
  filter: TodosScreenProps['route']['params'],
  categories: Category[],
) => {
  switch (filter.filter) {
    case 'all':
      return 'All tasks';
    case 'category':
      return `Tasks in category "${
        categories.find(({ id }) => id === filter.categoryId)?.name
      }"`;
    case 'important':
      return 'Important tasks';
    case 'done':
      return 'Done tasks';
    case 'search':
      return `Search results for "${filter.search}"`;
  }
};

export const updateTaskDoneStatus = (
  tasks: Task[],
  taskId: string,
  isDone: boolean,
) =>
  tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, isDone: isDone };
    }
    return task;
  });

export const updateSubtaskDoneStatus = (
  tasks: Task[],
  openedTaskId: string | undefined,
  subtaskId: string,
  isDone: boolean,
) =>
  tasks.map(task => {
    if (task.id === openedTaskId) {
      const subtasks = task.subtasks?.map(subtask => {
        if (subtask.id === subtaskId) {
          return { ...subtask, isDone: isDone };
        }
        return subtask;
      });

      if (subtasks?.every(subtask => subtask.isDone)) {
        task.isDone = true;
      }

      return { ...task, subtasks };
    }
    return task;
  });
