import baseApi from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookingsByAdmin: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getAllBookingsByUser: builder.query({
      query: () => ({
        url: "/bookings/user-bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    createBookings: builder.mutation({
      query: (data) => ({
        url: "/bookings/create-bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetAllBookingsByAdminQuery,
  useGetAllBookingsByUserQuery,
  useCreateBookingsMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
