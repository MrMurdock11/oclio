import { FC, useEffect } from "react";
import { useCheckAuthQuery } from "@/store/api/authApi";
import router from "@/routes";
import { RouterProvider } from "react-router-dom";

const AuthLoader: FC = () => {
  const { data, isLoading } = useCheckAuthQuery();

  useEffect(() => {
    if (data && data.isAuthenticated) {
      console.log("User is authenticated:", data.user);
    } else {
      console.log("User is not authenticated");
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};

export default AuthLoader;
