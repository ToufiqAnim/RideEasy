// src/redux/feature/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentStatus: null,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    clearPaymentStatus: (state) => {
      state.paymentStatus = null;
    },
    setPaymentError: (state, action) => {
      state.error = action.payload;
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setPaymentStatus,
  clearPaymentStatus,
  setPaymentError,
  clearPaymentError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
