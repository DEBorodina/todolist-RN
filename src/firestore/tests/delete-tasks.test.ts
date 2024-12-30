import { deleteTask } from '../delete-task';

const mockDelete = jest.fn(() => Promise.resolve());
const mockDoc = jest.fn(() => ({
  delete: mockDelete,
}));

jest.mock('@react-native-firebase/firestore', () => () => {
  return {
    collection: jest.fn(() => ({
      doc: mockDoc,
    })),
  };
});

describe('Firestore delete task functions', () => {
  const taskId = 'test-task-id';

  it('should call firestore.delete with the correct taskId', async () => {
    await deleteTask(taskId);

    expect(mockDoc).toHaveBeenCalledWith(taskId);
    expect(mockDelete).toHaveBeenCalled();
  });
});
