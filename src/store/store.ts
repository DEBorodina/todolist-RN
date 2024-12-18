import { create } from 'zustand';

import { Store } from './types';

export const useStore = create<Store>(set => ({
  setUserId: (userId: string) => set({ userId }),
}));
