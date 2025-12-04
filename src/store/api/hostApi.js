import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const hostApi = createApi({
    reducerPath: 'hostApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://3.147.226.49:5000/' }),
    endpoints: (builder) => ({
        saveHost: builder.mutation({
            query: (hostData) => ({
                url: 'host/save',
                method: 'POST',
                body: hostData,
            }),
        }),
    }),
})

export const { useSaveHostMutation } = hostApi
