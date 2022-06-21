import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './auth';
import postSlice from './post';

const allReducers = combineReducers({
    auth: authSlice.reducer,
    post: postSlice.reducer
});

export const store = configureStore({
    reducer: allReducers
})

