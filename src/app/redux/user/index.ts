import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginedUser } from '../../api/sign-in';

const emptyUser = {
  message: null,
  token: null,
  refreshToken: null,
  userId: null,
  name: null,
};
const rawUser = window.localStorage.getItem('authUserInfo');
const initialState: ILoginedUser = rawUser !== null ? JSON.parse(rawUser) : emptyUser;
const userSlice = createSlice({
  name: 'authUserInfo',
  initialState: initialState,
  reducers: {
    updateUser(state, action: PayloadAction<ILoginedUser>) {
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      window.localStorage.setItem('authUserInfo', JSON.stringify(action.payload));
    },
    removeUser(state) {
      state.message = emptyUser.message;
      state.token = emptyUser.token;
      state.refreshToken = emptyUser.refreshToken;
      state.userId = emptyUser.userId;
      state.name = emptyUser.name;
      window.localStorage.removeItem('authUserInfo');
    },
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
