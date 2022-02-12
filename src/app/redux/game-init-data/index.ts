import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookNav } from '../../types';

const initialState: IBookNav = {
  group: -1,
  page: -1,
};

const gameInitDataSlice = createSlice({
  name: 'game-init-data',
  initialState,
  reducers: {
    updateGameInitData(state, action: PayloadAction<IBookNav>) {
      state.group = action.payload.group;
      state.page = action.payload.page;
    },
    resetGameInitData(state) {
      state.group = -1;
      state.page = -1;
    },
  },
});

export const { updateGameInitData, resetGameInitData } = gameInitDataSlice.actions;
export default gameInitDataSlice.reducer;
