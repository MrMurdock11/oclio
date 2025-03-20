import ProtectedRoute from "@/components/ProtectedRoutes";
import StudioProtectedRoute from "@/components/StudioProtectedRoute";
import Home from "@/pages/Home";
import Studio from "@/pages/studio/Studio";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const SignIn = lazy(() => import("@/pages/auth/SignIn/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp/SignUp"));

const routes = createBrowserRouter([
  {
    element: <ProtectedRoute redirectPath="/sign-in" />,
    children: [{ path: "/profile", element: <p>Profile</p> }],
  },
  {
    element: <StudioProtectedRoute />,
    children: [{ path: "/studio/books/:uid", element: <Studio /> }],
  },
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/403", element: <p>403</p> },
  { path: "*", element: <p>There's nothing here: 404!</p> },
]);

export default routes;
