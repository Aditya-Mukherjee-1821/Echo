import React from "react";
import { Navigate } from "react-router";

const ProtectRoutes = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children;
};

export default ProtectRoutes;
