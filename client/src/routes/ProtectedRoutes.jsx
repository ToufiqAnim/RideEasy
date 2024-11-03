import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { verifyToken } from "../utils/verifyToken";

import { logout, useCurrentToken } from "../redux/feature/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (!token) {
    return <p>Token Not fount</p>;
  }

  return children;
};

export default ProtectedRoute;
