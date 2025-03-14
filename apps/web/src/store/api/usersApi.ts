import { UserPreferences } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updatePreferences: builder.mutation<UserPreferences, UserPreferences>({
      query: (preferences) => {
        return {
          url: `users/preferences`,
          method: "PATCH",
          body: preferences,
        };
      },
    }),
  }),
});

export const { useUpdatePreferencesMutation } = usersApi;
