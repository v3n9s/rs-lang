import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginedUser } from '../../app/api/sign-in';



const emptyUser = {
    message: null,
    token: null,
    refreshToken: null,
    userId: null,
    name: null
};
const rawUser = window.localStorage.getItem("user");
const initialState: ILoginedUser = rawUser !== null ? JSON.parse(rawUser): emptyUser;
console.log(initialState);
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser(state, action: PayloadAction<ILoginedUser>) {
            state.message = action.payload.message;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            console.log(state);
            window.localStorage.setItem("user", JSON.stringify(action.payload))
        },
        removeUser(state) {
            state = emptyUser;
            window.localStorage.removeItem("user");
        }
    },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;