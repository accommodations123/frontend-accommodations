// src/store/api/hostApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const normalizeProperty = (p) => {
  if (!p || typeof p !== 'object') return null;

  // Ensure id
  const id = p.id ?? p._id ?? null;

  // Normalize photos to an array (API uses null or an array)
  const photos = Array.isArray(p.photos) ? p.photos : (p.photos ? [p.photos] : []);

  // Safe host extraction: property.User?.Host may be null
  const user = p.User ?? p.user ?? null;
  const host = user?.Host ?? user?.host ?? null;

  return {
    ...p,
    id,
    photos,
    User: user,
    Host: host,
  };
};

export const hostApi = createApi({
  reducerPath: 'hostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://3.147.226.49:5000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("🌐 API Request Header - Found Token:", !!token);
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Properties', 'Hosts'],
  endpoints: (builder) => ({
    // ----- AUTH / HOST -----
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
      },
    }),

    // ----- GET APPROVED HOST DETAILS (using /property/all response shape) -----
    // Returns an array of normalized property objects from response.data
    getApprovedHostDetails: builder.query({
      query: () => 'property/all',
      transformResponse: (response) => {
        // Your provided JSON shape: { success: true, data: [ ... ] }
        if (!response) return [];

        // If response.data is the array we want — use it
        if (Array.isArray(response.data)) {
          return response.data
            .map(normalizeProperty)
            .filter(Boolean);
        }

        // Defensive fallbacks for other envelopes
        if (Array.isArray(response)) {
          return response.map(normalizeProperty).filter(Boolean);
        }
        if (Array.isArray(response.properties)) {
          return response.properties.map(normalizeProperty).filter(Boolean);
        }
        if (Array.isArray(response.hosts)) {
          return response.hosts.map(normalizeProperty).filter(Boolean);
        }

        // find first array in object and assume it contains items
        const firstArray = Object.values(response).find((v) => Array.isArray(v));
        if (firstArray) {
          return firstArray.map(normalizeProperty).filter(Boolean);
        }

        // fallback: wrap single object
        if (typeof response === 'object') return [normalizeProperty(response)].filter(Boolean);

        return [];
      },
      providesTags: (result) =>
        result ? [{ type: 'Properties', id: 'LIST' }, ...result.map((p) => ({ type: 'Properties', id: p.id }))] : [{ type: 'Properties', id: 'LIST' }],
    }),

    // ----- GET APPROVED PROPERTIES -----
    getApprovedProperties: builder.query({
      query: () => 'property/approved',
      transformResponse: (response) => {
        if (!response) return [];
        if (Array.isArray(response)) return response.map(normalizeProperty).filter(Boolean);
        if (Array.isArray(response.data)) return response.data.map(normalizeProperty).filter(Boolean);
        if (Array.isArray(response.properties)) return response.properties.map(normalizeProperty).filter(Boolean);
        const firstArray = Object.values(response).find((v) => Array.isArray(v));
        if (firstArray) return firstArray.map(normalizeProperty).filter(Boolean);
        return [];
      },
      providesTags: (result) =>
        result ? [{ type: 'Properties', id: 'LIST' }, ...result.map((p) => ({ type: 'Properties', id: p.id }))] : [{ type: 'Properties', id: 'LIST' }],
    }),

    // ----- GET PROPERTY BY ID -----
    getPropertyById: builder.query({
      query: (id) => `property/${id}`,
      transformResponse: (response) => {
        // API may return { property: {...} } or { data: {...} } or the property directly
        const payload = response?.property ?? response?.data ?? response;
        return normalizeProperty(payload);
      },
      providesTags: (result, error, id) => [{ type: 'Properties', id }],
    }),

    // ----- PROPERTY MUTATIONS -----
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
});

export const {
  useSaveHostMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,

  useGetApprovedHostDetailsQuery,
  useGetApprovedPropertiesQuery,
  useGetPropertyByIdQuery,

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
} = hostApi;
