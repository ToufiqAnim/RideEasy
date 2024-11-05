import baseApi from "../baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCar: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["Cars"],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars/create-car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),

    updatecar: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/cars/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Car"],
    }),
    deletecar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
    getSearchCars: builder.query({
      query: (searchTerm) => `/cars?searchTerm=${searchTerm}`,
    }),
  }),
});

export const {
  useGetAllCarQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useDeletecarMutation,
  useUpdatecarMutation,
  useGetSearchCarsQuery,
} = carApi;
