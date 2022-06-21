import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: "post",
    initialState: {
        missingFile: null,
        posts: []
    },
    reducers: {
        // to check if image is uploaded to create new post
        missingFile(state) {
            state.missingFile = true
        },
        fileUploaded(state) {
            state.missingFile = false
        },
        // action for after clicking like button
        like(state, action) {
            state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        }
    }
})

export const postActions = postSlice.actions;
export default postSlice;
