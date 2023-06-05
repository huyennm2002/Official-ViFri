import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GestureStateManager } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureStateManager";

const initialState = {
    token: null,
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { token } = action.payload;
            return {
                ...state,
                token,
                isLoggedIn: true
            }
        },
        signup() {

        },
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            return state;
        }
    }

})

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;