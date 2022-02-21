import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TTokenTime = {
  value: number;
};

const initialState: TTokenTime = {
  value: 0,
};
const tokenSaved = localStorage.getItem('tokenTimeSave');
if (tokenSaved) {
  initialState.value = Number(JSON.parse(tokenSaved));
}

const tokenTimeSlice = createSlice({
  name: 'authUserInfo',
  initialState: initialState,
  reducers: {
    updateTokenTime(state, action: PayloadAction<number>): void {
      localStorage.setItem('tokenTimeSave', JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

export const { updateTokenTime } = tokenTimeSlice.actions;
export default tokenTimeSlice.reducer;
