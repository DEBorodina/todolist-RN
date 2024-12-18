import { create } from 'zustand';

import { selectSetUserId, selectUserId } from '../selectors';
import { Store } from '../types';

const createTestStore = () => {
  return create<Store>(set => ({
    setUserId: (id: string) => set({ userId: id }),
  }));
};

describe('Selectors', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  describe('selectUserId', () => {
    it('should select userId from state', () => {
      store.setState({ userId: 'test-user-id' });

      const userId = selectUserId(store.getState());
      expect(userId).toBe('test-user-id');
    });

    it('should select setUserId function from state', () => {
      const setUserId = selectSetUserId(store.getState());
      expect(typeof setUserId).toBe('function');
    });

    it('should update userId using setUserId', () => {
      const setUserId = selectSetUserId(store.getState());

      setUserId('new-user-id');

      const userId = selectUserId(store.getState());
      expect(userId).toBe('new-user-id');
    });
  });
});
