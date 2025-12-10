import { configureStore } from '@reduxjs/toolkit'
import { hostApi } from './api/hostApi'
import { authApi } from './api/authApi'

export const store = configureStore({
    reducer: {
        [hostApi.reducerPath]: hostApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hostApi.middleware, authApi.middleware),
})
