import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import audiocallReducer from './audiocall/data';

export const store = configureStore({
  reducer: {
    user: userReducer,
    audiocallData: audiocallReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});
