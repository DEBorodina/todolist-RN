import { updateFirestoreTask } from '../update-task';

const mockUpdate = jest.fn(() => Promise.resolve());
const mockDoc = jest.fn(() => ({
  update: mockUpdate,
}));

jest.mock('@react-native-firebase/firestore', () => () => {
  return {
    collection: jest.fn(() => ({
      doc: mockDoc,
    })),
  };
});

const mockTask = {
  title: 'New Task',
  completed: false,
  description: 'description',
  userId: 'user-id',
  categoryId: 'category-id',
  isDone: false,
  isImportant: false,
  subtasks: [],
  id: 'task-id',
};

describe('Firestore update tasks functions', () => {
  it('should update a task in Firestore', async () => {
    await updateFirestoreTask(mockTask);

    expect(mockDoc).toHaveBeenCalledWith(mockTask.id);
    expect(mockUpdate).toHaveBeenCalledWith(mockTask);
  });
});
