import { User } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query<{ isAuthenticated: boolean; user?: User }, void>({
      query: () => "auth/check",
    }),
  }),
});

export const { useCheckAuthQuery } = authApi;
