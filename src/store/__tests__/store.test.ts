import { useStore } from '../store';

describe('Zustand Store', () => {
  it('should set userId', () => {
    const setUserId = useStore.getState().setUserId;

    expect(useStore.getState().userId).toBeUndefined();

    setUserId('test-user-id');

    expect(useStore.getState().userId).toBe('test-user-id');
  });
});
