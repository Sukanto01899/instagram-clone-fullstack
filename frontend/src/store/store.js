import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth/authSlice';
import { userApi } from '../services/user/userService';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/auth/authService';
import { postsApi } from '../services/post/postService';
import postReducer from './slice/posts/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, postsApi.middleware),
});


setupListeners(store.dispatch);