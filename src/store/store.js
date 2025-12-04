import { configureStore } from '@reduxjs/toolkit'
import { hostApi } from './api/hostApi'

export const store = configureStore({
    reducer: {
        [hostApi.reducerPath]: hostApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(hostApi.middleware),
})
