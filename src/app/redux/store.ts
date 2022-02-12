import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import gameInitDataReducer from './game-init-data';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameInitData: gameInitDataReducer,
  },
});
