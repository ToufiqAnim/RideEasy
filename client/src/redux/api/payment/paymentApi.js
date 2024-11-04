import baseApi from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/initiate",
          method: "POST",
          body: data,
        };
      },
    }),
    confirmPayment: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/confirm",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useInitiatePaymentMutation, useConfirmPaymentMutation } =
  paymentApi;
