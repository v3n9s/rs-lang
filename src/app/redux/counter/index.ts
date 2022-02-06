import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICounter {
  value: number;
}

const initialState: ICounter = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrCount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrCount(state, action: PayloadAction<number>) {
      state.value -= action.payload;
    },
  },
});

export const { incrCount, decrCount } = counterSlice.actions;
export default counterSlice.reducer;
