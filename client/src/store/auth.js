import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        error: false,
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
            state.error = false;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;

        },
        loginFailure: (state) => {
            state.error = true;
        }
    }
})

export const authActions = authSlice.actions
export default authSlice;

