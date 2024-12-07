import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  id?: string;
};

const messageSlice = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const userActions = messageSlice.actions;
export const userReducer = messageSlice.reducer;
