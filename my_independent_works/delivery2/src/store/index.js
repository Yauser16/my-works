
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { geoSlice } from '../api/geoApiSlice';
import { authSlice } from '../api/authApiSlice';



const stringMiddleware = () => next => action => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    } return next(action);
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [geoSlice.reducerPath]: geoSlice.reducer,
        [authSlice.reducerPath]: authSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware, geoSlice.middleware, authSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;