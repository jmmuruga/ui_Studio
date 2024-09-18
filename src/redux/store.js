import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';

export const store = configureStore({
    reducer: {
        users: userSlice,
       // menus: menusReducer,
        //gallery: galleryReducer,
    },
});
