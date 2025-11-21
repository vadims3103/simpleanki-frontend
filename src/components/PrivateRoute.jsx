import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../api";

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render children
  return children;
}
