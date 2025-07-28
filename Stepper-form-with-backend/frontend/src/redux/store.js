import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import noteReducer from './noteSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        note: noteReducer
    }
});

export default store;