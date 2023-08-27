import {configureStore} from '@reduxjs/toolkit';
import { articleApi } from './article';
export const store = configureStore({
    reducer:{
        [articleApi.reducerPath]:articleApi.reducer
    },//to get a part of some state.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware) //it allows to do something before getting this state.
});