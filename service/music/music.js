import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiVersion = process.env.NEXT_PUBLIC_VERSION;
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API,
});

export const musicApiSlice = createApi({
    reducerPath: "musicApi",
    baseQuery,
    endpoints: (builder) => ({
        genretype: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/all-user/music/get-genre-type`,
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
        uploadmusic: builder.mutation({
            query: (credentials) => ({
                url: `${apiVersion}/artist/music/add`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${credentials?.token}`,
                },
                body: credentials.body,
            }),
        }),
        imageupload: builder.mutation({
            query: (credentials) => ({
                url: `${apiVersion}/artist/music/image-upload`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${credentials?.token}`,
                },
                body: credentials.body,
            }),
        }),
        videoupload: builder.mutation({
            query: (credentials) => ({
                url: `${apiVersion}/artist/music/video-upload`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${credentials?.token}`,
                },
                body: credentials.body,
            }),
        }),
        audioupload: builder.mutation({
            query: (credentials) => ({
                url: `${apiVersion}/artist/music/audio-upload`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${credentials?.token}`,
                },
                body: credentials.body,
            }),
        }),
        musiclist: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/music/get`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                params: {
                    page: payload?.page,
                    limit: payload?.limit,
                    userId: payload?.userId
                }
            }),
        }),
        deletemusic: builder.query({
            query: ({ id, token }) => ({
                url: `${apiVersion}/artist/music/delete/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

    }),
});

export const { useLazyGenretypeQuery, useUploadmusicMutation, useAudiouploadMutation, useVideouploadMutation, useImageuploadMutation, useLazyMusiclistQuery, useLazyDeletemusicQuery } = musicApiSlice;
