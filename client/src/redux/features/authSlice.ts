import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../../../types";
  
const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    info: {
        id: null,
        avatar: null,
        dob: null,
        email: '',
        first_name: '',
        last_name: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            return {
                info: user,
                token,
                isLoggedIn: true
            }
        },
        logout: (state) => ({
            info: {
                id: null,
                first_name: '',
                last_name: '',
                email: '',
                dob: null,
                avatar: null,
            },
            token: '',
            isLoggedIn: false
        }),
        updateUserInfo: (state, action) => {
            state.info = {...state.info, ...action.payload}
        },
        handleChangeAvatarAction: (state) => {
            state.info.avatar += 1;
        }
    }
})

export const { login, logout, updateUserInfo, handleChangeAvatarAction } = authSlice.actions;
export default authSlice.reducer;