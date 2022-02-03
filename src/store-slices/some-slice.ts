import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISomeThing {
  item: string;
}

const initialState: ISomeThing = {
  item: 'init',
};

const someSlice = createSlice({
  name: 'smth',
  initialState,
  reducers: {
    updateSomething(state, action: PayloadAction<string>) {
      state.item = action.payload;
    },
  },
});

// actions export
export const { updateSomething } = someSlice.actions;

// reducers export
export default someSlice.reducer;
// name for import will be -> someReducer
