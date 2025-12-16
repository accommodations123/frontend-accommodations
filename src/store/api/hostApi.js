import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const hostApi = createApi({
    reducerPath: 'hostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'http://3.147.226.49:5000/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            console.log("🌐 API Request Header - Found Token:", !!token);
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        saveHost: builder.mutation({
            query: (hostData) => ({
                url: 'host/save',
                method: 'POST',
                body: hostData,
            }),
        }),
        sendOtp: builder.mutation({
            query: ({ email, phone }) => ({
                url: 'otp/send-otp',
                method: 'POST',
                body: { email, phone },
            }),
        }),
        verifyOtp: builder.mutation({
            query: ({ email, phone, otp }) => ({
                url: 'otp/verify-otp',
                method: 'POST',
                body: { email, phone, otp },
            }),
            transformResponse: (response) => {
                const token = response?.token || response?.data?.token || response?.accessToken || response?.data?.accessToken;
                const user = response?.user || response?.data?.user;
                return { ...response, token, user };
            }
        }),

        // --- FETCH HOOKS ---
        getApprovedHostDetails: builder.query({
            query: () => 'admin/approved/approved-host-details',
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.data && Array.isArray(response.data)) return response.data;
                if (response?.hosts && Array.isArray(response.hosts)) return response.hosts;
                if (response?.approved_host_details && Array.isArray(response.approved_host_details)) return response.approved_host_details;
                return [];
            },
        }),

        getApprovedProperties: builder.query({
            query: () => 'property/approved',
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.properties && Array.isArray(response.properties)) return response.properties;
                return [];
            },
        }),

        getPropertyById: builder.query({
            query: (id) => `property/${id}`,
            transformResponse: (response) => {
                // Return consistent structure: { property: {}, host: {} }
                if (response?.property) return response;
                if (response?.data?.property) return response.data;
                return { property: response, host: {} }; // Fallback
            }
        }),

        getApprovedEvents: builder.query({
            query: () => 'events/approved',
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.events && Array.isArray(response.events)) return response.events;
                if (response?.data && Array.isArray(response.data)) return response.data;
                return [];
            }
        }),

        getEventById: builder.query({
            query: (id) => `events/${id}`,
            transformResponse: (response) => {
                if (response?.event) return response.event;
                if (response?.data) return response.data;
                return response;
            }
        }),

        // --- PROPERTY CREATION (MUTATIONS) ---
        uploadFile: builder.mutation({
            query: (formData) => ({
                url: 'property/upload',
                method: 'POST',
                body: formData,
            }),
        }),
        createPropertyDraft: builder.mutation({
            query: (data) => ({
                url: 'property/create-draft',
                method: 'POST',
                body: data,
            }),
        }),
        updatePropertyBasic: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/basic-info/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePropertyAddress: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/address/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePropertyPricing: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/pricing/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePropertyAmenities: builder.mutation({
            query: ({ id, amenities }) => ({
                url: `property/amenities/${id}`,
                method: 'PUT',
                body: { amenities },
            }),
        }),
        updatePropertyRules: builder.mutation({
            query: ({ id, rules }) => ({
                url: `property/rules/${id}`,
                method: 'PUT',
                body: { rules },
            }),
        }),
        updatePropertyMedia: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/media/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        updatePropertyVideo: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/media/video/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        updatePropertyLegal: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/legal/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        submitProperty: builder.mutation({
            query: (id) => ({
                url: `property/submit/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useSaveHostMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useGetApprovedHostDetailsQuery,
    useGetApprovedPropertiesQuery,
    useGetPropertyByIdQuery,
    // New Hooks
    useUploadFileMutation,
    useCreatePropertyDraftMutation,
    useUpdatePropertyBasicMutation,
    useUpdatePropertyAddressMutation,
    useUpdatePropertyPricingMutation,
    useUpdatePropertyAmenitiesMutation,
    useUpdatePropertyRulesMutation,
    useUpdatePropertyMediaMutation,
    useUpdatePropertyVideoMutation,
    useUpdatePropertyLegalMutation,
    useSubmitPropertyMutation,
    useGetApprovedEventsQuery,
    useGetEventByIdQuery
} = hostApi
