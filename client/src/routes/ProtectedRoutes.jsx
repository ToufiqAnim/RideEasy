import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, TUser, useCurrentToken } from "../redux/features/authSlice";
import React from "react";

const ProtectedRoute = ({ children, role }) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (!token) {
    return <p>Token Not fount</p>;
  }

  return children;
};

export default ProtectedRoute;
