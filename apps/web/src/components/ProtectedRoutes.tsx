import React from "react";
import { Navigate, Outlet, To } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/store/features/user/userSlice";

interface ProtectedRouteProps {
  redirectPath?: To;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/sign-in",
  children,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
