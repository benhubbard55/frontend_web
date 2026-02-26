import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from '../../redux/store';

const apiVersion = process.env.NEXT_PUBLIC_VERSION;
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_HOST_API,
});

export const userDetailApiSlice = createApi({
  reducerPath: "userDetailApi",
  baseQuery,
  endpoints: (builder) => ({
    getuserDetails: builder.query({
      query: (credentials) => ({
        url: `${apiVersion}/all-user/profile/get`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials?.token}`,
        },
        params: {
          userId: credentials?.userId,
        }
      }),
    }),
    updateprofile: builder.mutation({
      query: (credentials) => ({
        url: `${apiVersion}/all-user/profile/update`,
        method: "POST",
        body: credentials.body,
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        }
      }),
    }),
  }),
});

export const { useGetuserDetailsQuery, useUpdateprofileMutation } = userDetailApiSlice;
