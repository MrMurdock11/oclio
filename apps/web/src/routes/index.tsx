import ProtectedRoute from "@/components/ProtectedRoutes";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const SignIn = lazy(() => import("@/pages/auth/SignIn/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp/SignUp"));

const routes = createBrowserRouter([
  {
    element: <ProtectedRoute redirectPath="/sign-in" />,
    children: [{ path: "/profile", element: <p>Profile</p> }],
  },
  { path: "/", element: <p>Home</p> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "*", element: <p>There's nothing here: 404!</p> },
]);

export default routes;
