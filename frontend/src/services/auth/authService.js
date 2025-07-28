import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery } from "../baseQuery/CustomBaseQuery";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: CustomBaseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  })
})

export const { useSignupMutation, useLoginMutation, useLogoutMutation } = authApi;
