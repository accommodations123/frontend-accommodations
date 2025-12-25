import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hostApi = createApi({
    reducerPath: "hostApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "https://accomodation.api.test.nextkinlife.live/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            console.log("🌐 API Request Header - Found Token:", !!token);
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({

        /* ============================
           AUTH / HOST
        ============================ */

        saveHost: builder.mutation({
            query: (hostData) => ({
                url: "host/save",
                method: "POST",
                body: hostData,
            }),
        }),

        sendOtp: builder.mutation({
            query: ({ email, phone }) => ({
                url: "otp/send-otp",
                method: "POST",
                body: { email, phone },
            }),
        }),

        verifyOtp: builder.mutation({
            query: ({ email, phone, otp }) => ({
                url: "otp/verify-otp",
                method: "POST",
                body: { email, phone, otp },
            }),
            transformResponse: (response) => {
                const token =
                    response?.token ||
                    response?.data?.token ||
                    response?.accessToken ||
                    response?.data?.accessToken;

                const user =
                    response?.user ||
                    response?.data?.user;

                return { ...response, token, user };
            },
        }),

        /* ============================
           HOST / PROPERTY FETCH
        ============================ */

        getApprovedHostDetails: builder.query({
            query: () => "admin/approved/approved-host-details",
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.data && Array.isArray(response.data)) return response.data;
                if (response?.hosts && Array.isArray(response.hosts)) return response.hosts;
                if (
                    response?.approved_host_details &&
                    Array.isArray(response.approved_host_details)
                ) return response.approved_host_details;
                return [];
            },
        }),

        getApprovedProperties: builder.query({
            query: () => "property/approved",
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.properties && Array.isArray(response.properties))
                    return response.properties;
                return [];
            },
        }),

        getPropertyById: builder.query({
            query: (id) => `property/${id}`,
            transformResponse: (response) => {
                if (response?.property) return response;
                if (response?.data?.property) return response.data;
                return { property: response, host: {} };
            },
        }),

        /* ============================
           EVENTS
        ============================ */

        getApprovedEvents: builder.query({
            query: () => "events/approved",
            transformResponse: (response) => {
                const events =
                    response?.data?.events ||
                    response?.events ||
                    response ||
                    [];

                return events.map((apiEvent) => ({
                    ...apiEvent,
                    host: apiEvent.Host
                        ? {
                              full_name: apiEvent.Host.full_name,
                              selfie_photo: apiEvent.Host.selfie_photo,
                              phone: apiEvent.Host.phone,
                              email: apiEvent.Host.email,
                              status: apiEvent.Host.status,
                          }
                        : null,
                }));
            },
        }),

        getEventById: builder.query({
            query: (id) => `events/${id}`,
            transformResponse: (response) => {
                if (response?.event) return response.event;
                if (response?.data) return response.data;
                return response;
            },
        }),

        /* ============================
           PROPERTY CREATION FLOW
        ============================ */

        uploadFile: builder.mutation({
            query: (formData) => ({
                url: "property/upload",
                method: "POST",
                body: formData,
            }),
        }),

        createPropertyDraft: builder.mutation({
            query: (data) => ({
                url: "property/create-draft",
                method: "POST",
                body: data,
            }),
        }),

        updatePropertyBasic: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/basic-info/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        updatePropertyAddress: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/address/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        updatePropertyPricing: builder.mutation({
            query: ({ id, data }) => ({
                url: `property/pricing/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        updatePropertyAmenities: builder.mutation({
            query: ({ id, amenities }) => ({
                url: `property/amenities/${id}`,
                method: "PUT",
                body: { amenities },
            }),
        }),

        updatePropertyRules: builder.mutation({
            query: ({ id, rules }) => ({
                url: `property/rules/${id}`,
                method: "PUT",
                body: { rules },
            }),
        }),

        updatePropertyMedia: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/media/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),

        updatePropertyVideo: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/media/video/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),

        updatePropertyLegal: builder.mutation({
            query: ({ id, formData }) => ({
                url: `property/legal/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),

        submitProperty: builder.mutation({
            query: (id) => ({
                url: `property/submit/${id}`,
                method: "PUT",
            }),
        }),

        /* ============================
           BUY & SELL MODULE
        ============================ */

        createBuySell: builder.mutation({
            query: (data) => ({
                url: "buy-sell/create",
                method: "POST",
                body: data,
            }),
        }),

        getBuySellListings: builder.query({
            query: () => "buy-sell/get",
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.data && Array.isArray(response.data)) return response.data;
                if (response?.listings && Array.isArray(response.listings))
                    return response.listings;
                return [];
            },
        }),

        getBuySellById: builder.query({
            query: (id) => `buy-sell/get/${id}`,
            transformResponse: (response) => {
                if (response?.data) return response.data;
                if (response?.listing) return response.listing;
                return response;
            },
        }),

        getMyBuySellListings: builder.query({
            query: () => "buy-sell/my-buy-sell",
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (response?.data && Array.isArray(response.data)) return response.data;
                if (response?.listings && Array.isArray(response.listings))
                    return response.listings;
                return [];
            },
        }),

        updateBuySell: builder.mutation({
            query: ({ id, data }) => ({
                url: `buy-sell/update/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        markBuySellAsSold: builder.mutation({
            query: (id) => ({
                url: `buy-sell/buy-sell/${id}/sold`,
                method: "PATCH",
            }),
        }),

        deleteBuySell: builder.mutation({
            query: (id) => ({
                url: `buy-sell/delete/${id}`,
                method: "DELETE",
            }),
        }),

    }),
});

/* ============================
   EXPORT HOOKS
============================ */

export const {
    useSaveHostMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,

    useGetApprovedHostDetailsQuery,
    useGetApprovedPropertiesQuery,
    useGetPropertyByIdQuery,

    useGetApprovedEventsQuery,
    useGetEventByIdQuery,

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

    // Buy & Sell
    useCreateBuySellMutation,
    useGetBuySellListingsQuery,
    useGetBuySellByIdQuery,
    useGetMyBuySellListingsQuery,
    useUpdateBuySellMutation,
    useMarkBuySellAsSoldMutation,
    useDeleteBuySellMutation,

} = hostApi;
