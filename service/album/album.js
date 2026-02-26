import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiVersion = process.env.NEXT_PUBLIC_VERSION;
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API,
});

export const albumApiSlice = createApi({
    reducerPath: "albumApi",
    baseQuery,
    endpoints: (builder) => ({
        getAlbumList: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/album/get-album-list`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                params: {
                    page: payload?.page,
                    limit: payload?.limit,
                    userId: payload?.userId,
                }
            }),
        }),
        createAlbum: builder.mutation({
            query: ({ payload, token }) => ({
                url: `${apiVersion}/artist/album/create-album`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: payload,
            }),
        }),
        updateAlbum: builder.mutation({
            query: ({ payload, token}) => ({
                url: `${apiVersion}/artist/album/update-album`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: payload,
            }),
        }),
        deleteAlbum: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/album/delete-album/${payload?.albumId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
            }),
        }),
        addMusicToAlbum: builder.mutation({
            query: (payload) => ({
                url: `${apiVersion}/artist/album/add-album-music`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                body: {
                    musicId: payload?.musicId,
                    albumId: payload?.albumId,
                },
            }),
        }),
        getAlbumMusicList: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/album/get-album-music-list`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
                params: {
                    albumId: payload?.albumId,
                }
            }),
        }),        
        deleteAlbumMusic: builder.query({
            query: (payload) => ({
                url: `${apiVersion}/artist/album/delete-album-music/${payload?.albumMusicId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${payload?.token}`,
                },
            }),
        }),
    }),
});

export const { useLazyGetAlbumListQuery, useCreateAlbumMutation, useAddMusicToAlbumMutation, useLazyGetAlbumMusicListQuery, useLazyDeleteAlbumQuery, useUpdateAlbumMutation, useLazyDeleteAlbumMusicQuery } = albumApiSlice;
