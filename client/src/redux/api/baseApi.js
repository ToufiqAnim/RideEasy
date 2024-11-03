import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const storedAuthData = localStorage.getItem("auth");
    const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["Cars", "Car", "Bookings"],
  endpoints: () => ({}),
});

export default baseApi;
