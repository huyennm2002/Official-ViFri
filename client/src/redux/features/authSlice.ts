import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        first_name: '',
        last_name: '',
        email: '',
        dob: null,
        avatar: null,
    },
    token: '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { user, token } = action.payload;
            return {
                ...state,
                user,
                token,
                isLoggedIn: true
            }
        },
        logout(state) {
            return {
                ...state,
                user: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    dob: null,
                    avatar: null,
                },
                token: '',
                isLoggedIn: false
            };
        }
    }

})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;