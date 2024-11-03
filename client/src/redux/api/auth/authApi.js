import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    signUp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
