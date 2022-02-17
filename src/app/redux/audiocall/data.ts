import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWordData } from '../../pages/game-audio-call/types';

const initialData: Array<IWordData> = [];

const audiocallDataSlice = createSlice({
  name: 'audiocallData',
  initialState: initialData,
  reducers: {
    updateAudioCallData(state, action: PayloadAction<IWordData[]>) {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { updateAudioCallData } = audiocallDataSlice.actions;
export default audiocallDataSlice.reducer;
