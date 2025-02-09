import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const SignIn = lazy(() => import("@/pages/auth/SignIn/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp/SignUp"));

const routes = createBrowserRouter([
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
]);

export default routes;
