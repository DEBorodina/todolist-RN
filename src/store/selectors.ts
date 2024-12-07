import { TState } from './store';

export const selectUserId = (state: TState) => state.user.id;
