import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=en&with_genres=16,10751&include_video=true&page=1",
  }),
  // keepUnusedDataFor: 120,
  tagTypes: ["Auth", "Product"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: "/signup/chef",
        method: "POST",

        body: user,
      }),
      invalidatesTags: [
        {
          type: "Auth",
          id: "LIST",
        },
      ],
    }),
    logIn: builder.mutation({
      query: (user) => ({
        url: "/login/chef",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [
        {
          type: "Auth",
          id: "LIST",
        },
      ],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgotPasswords",
        method: "POST",
        body: email,
      }),
      invalidatesTags: [
        {
          type: "Auth",
          id: "LIST",
        },
      ],
    }),
    getAllProducts: builder.query({
      query: () => {
        return `/`;
      },
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    verifyResetCode: builder.mutation({
      query: (code) => ({
        url: "/auth/verifyResetCode",
        method: "POST",
        body: code,
      }),
      invalidatesTags: [
        {
          type: "Auth",
          id: "LIST",
        },
      ],
    }),
    resetPassword: builder.mutation({
      query: (user) => ({
        url: `/auth/resetPassword`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [
        {
          type: "Auth",
          id: "LIST",
        },
      ],
    }),
  }),
});
// Dynamic hook
export const {
  useSignUpMutation,
  useGetAllProductsQuery,
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
} = authApi;
