import { FC, useEffect } from "react";
import { useCheckAuthQuery } from "@/store/api/authApi";
import router from "@/routes";
import { RouterProvider } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const AuthLoader: FC = () => {
  const { data, isLoading } = useCheckAuthQuery();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (data && data.isAuthenticated) {
      setTheme(data.user?.preferences.theme as "dark" | "light");
    }
  }, [data, setTheme]);

  if (isLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};

export default AuthLoader;
