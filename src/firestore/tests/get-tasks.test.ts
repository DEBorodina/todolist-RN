import { getFirestoreData } from '../get-data';
import { getFirestoreTasks } from '../get-tasks';

jest.mock('../helpers');

jest.mock('@react-native-firebase/firestore', () => () => ({}));

describe('Firestore get tasks functions', () => {
  it('should return an empty array when no userId is provided', async () => {
    const result = await getFirestoreTasks(undefined);
    expect(result).toEqual([]);
  });

  it('should return an array of tasks when userId is provided', async () => {
    const mockTasks = [
      { id: 'task1', title: 'Task 1', userId: 'validUserId' },
      { id: 'task2', title: 'Task 2', userId: 'validUserId' },
    ];

    (
      getFirestoreData as jest.MockedFunction<typeof getFirestoreData>
    ).mockResolvedValueOnce(mockTasks);

    const result = await getFirestoreTasks('validUserId');
    expect(result).toEqual(mockTasks);
  });
});
