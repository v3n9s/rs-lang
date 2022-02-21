import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import audiocallReducer from './audiocall/data';
import tokenTimeReducer from './token-time';

export const store = configureStore({
  reducer: {
    user: userReducer,
    audiocallData: audiocallReducer,
    tokenTime: tokenTimeReducer,
  },
});
