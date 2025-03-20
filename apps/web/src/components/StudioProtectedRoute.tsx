import { FC } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/user/userSlice";
import { useCheckBookAccessQuery } from "@/store/api/booksApi";
import { Loader2 } from "lucide-react";
import ForbiddenBook from "./forbidden/ForbiddenBook";
type StudioProtectedRouteProps = {
  children?: React.ReactNode;
};

const StudioProtectedRoute: FC<StudioProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector(selectUser);
  const { uid } = useParams();
  const { data, isLoading } = useCheckBookAccessQuery({
    uid: uid as string,
  });

  const hasAccess = Boolean(data?.hasAccess);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!hasAccess) {
    return <ForbiddenBook />;
  }

  return children ?? <Outlet />;
};

export default StudioProtectedRoute;
