import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginedUser } from '../../api/sign-in';

const emptyUser: ILoginedUser = {
  message: null,
  token: null,
  refreshToken: null,
  userId: null,
  name: null,
};

let initialState = emptyUser;
const userInfo = localStorage.getItem('authUserInfo');
if (userInfo) {
  initialState = JSON.parse(userInfo);
}

const userSlice = createSlice({
  name: 'authUserInfo',
  initialState: initialState,
  reducers: {
    updateUser(state, action: PayloadAction<ILoginedUser>): ILoginedUser {
      localStorage.setItem('authUserInfo', JSON.stringify(action.payload));
      const newState = { ...state, ...action.payload };
      return newState;
    },
    removeUser(state): ILoginedUser {
      localStorage.removeItem('authUserInfo');
      const newState = { ...state, ...emptyUser };
      return newState;
    },
    updateToken(
      state,
      action: PayloadAction<Omit<ILoginedUser, 'message' | 'userId' | 'name'>>,
    ): ILoginedUser {
      const newState = { ...state, ...action.payload };
      localStorage.setItem('authUserInfo', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { updateUser, removeUser, updateToken } = userSlice.actions;
export default userSlice.reducer;
