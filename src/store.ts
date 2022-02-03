import { configureStore } from '@reduxjs/toolkit';
import someReducer from './store-slices/some-slice';

export const store = configureStore({
  reducer: {
    some: someReducer,
  },
});

store.subscribe((): void => {
  console.log('> store > state updated', store.getState().some);
});
