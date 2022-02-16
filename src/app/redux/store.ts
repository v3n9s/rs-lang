import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/index';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
