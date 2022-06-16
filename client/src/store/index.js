import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isLoggedIn: false,
        error: false,
        missingFile: null,
        posts: []
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true
            state.error = false
            state.currentUser = action.payload
        },
        logout(state) {
            localStorage.removeItem("userId")
            state.isLoggedIn = false
        },
        loginFailure: (state) => {
            state.error = true
        },
        // to check if image is uploaded to create new post
        missingFile(state) {
            state.missingFile = true
        },
        fileUploaded(state) {
            state.missingFile = false
        },
        like(state, action) {
            state.posts = action.payload
        }
    }
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})