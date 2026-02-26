import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API,
});

export const contactApiSlice = createApi({
    reducerPath: "contactApi",
    baseQuery,
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: (credentials) => ({
                url: `/inquiry`,
                method: "POST",
                body: credentials,
            }),
        }),
        term: builder.query({
            query: (credentials) => ({
                url: `/get-terms`,
                method: "GET",
                body: credentials,
            }),
        }),
        policy: builder.query({
            query: (credentials) => ({
                url: `/get-policy`,
                method: "GET",
                body: credentials,
            }),
        }),
    }),
});

export const { useContactMutation, usePolicyQuery, useTermQuery } = contactApiSlice;
