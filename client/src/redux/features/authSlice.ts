import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
    avatar: string | null;
    dob: Date | null;
    email: string;
    first_name: string;
    last_name: string;
}
  
type AuthState = {
    isLoggedIn: boolean;
    token: string;
    user: User;
}
  
const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    user: {
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
        login(state, action: PayloadAction<{ user: User; token: string }>) {
            const { user, token } = action.payload;
            return {
                user,
                token,
                isLoggedIn: true
            }
        },
        logout(state) {
            return {
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