import { addFirestoreTask } from '../add-tasks';

const task = {
  title: 'New Task',
  completed: false,
  description: 'description',
  userId: 'user-id',
  categoryId: 'category-id',
  isDone: false,
  isImportant: false,
  subtasks: [],
};

const mockAdd = jest.fn().mockReturnValue(Promise.resolve({ id: 'task-id' }));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn().mockReturnValue({ add: mockAdd }),
}));

describe('Firestore add task functions', () => {
  it('addFirestoreTask should add a task and return the ID', async () => {
    const taskId = await addFirestoreTask(task);

    expect(mockAdd).toHaveBeenCalledWith(task);
    expect(taskId).toBe('task-id');
  });
});
