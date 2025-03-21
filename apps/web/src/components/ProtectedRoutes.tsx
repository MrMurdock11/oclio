import React, { FC } from "react";
import { Navigate, Outlet, To } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "@/store/features/user/userSlice";

interface ProtectedRouteProps {
  redirectPath?: To;
  children?: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  redirectPath = "/sign-in",
  children,
}) => {
  const { isAuthenticated } = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
