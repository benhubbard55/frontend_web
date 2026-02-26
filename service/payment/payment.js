import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiVersion = process.env.NEXT_PUBLIC_VERSION;
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API,
});

export const paymentApiSlice = createApi({
    reducerPath: "paymentApi",
    baseQuery,
    endpoints: (builder) => ({
        purchasedmusic: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/user/payment/history`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                params: {
                    page: payload?.page,
                    limit: payload?.limit
                }
            }),
        }),
        wallethistory: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/payment/history`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                params: {
                    page: payload?.page,
                    limit: payload?.limit
                }
            }),
        }),
    }),
});

export const { useLazyPurchasedmusicQuery, useLazyWallethistoryQuery } = paymentApiSlice;
