import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery } from "../baseQuery/CustomBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: CustomBaseQuery,
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ['myProfile']
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['myProfile']
    }),
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: (file) => ({
        url: `/users/me/avatar`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags: ['myProfile']
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetUserProfileQuery,
  useUpdateProfilePictureMutation
} = userApi;
