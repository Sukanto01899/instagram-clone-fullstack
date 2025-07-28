import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery } from "../baseQuery/CustomBaseQuery";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: CustomBaseQuery,
  tagTypes: ["Posts"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60, // Keep data for 60 seconds
  cacheTime: 60, // Cache data for 60 seconds
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ page, limit }) => ({
        url: `/posts/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts", id: _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    postLikeUnlike: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Posts", id: postId },
      ],
    }),
    getUserPosts: builder.query({
      query: (userId) => ({
        url: `/posts/user/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ _id }) => ({ type: "Posts", id: _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addComment: builder.mutation({
      query: ({ id, text }) => ({
        url: `/posts/${id}/comment`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deleteMyPost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useDeleteMyPostMutation,
  useAddCommentMutation,
  useCreatePostMutation,
  useGetPostQuery,
  usePostLikeUnlikeMutation,
  useGetUserPostsQuery,
  useGetAllNotificationsQuery
} = postsApi;
