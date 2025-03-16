import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    createBook: builder.mutation<{ uid: string }, void>({
      query: () => ({
        url: `/books/new`,
        method: "POST",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useCreateBookMutation } = booksApi;

export default booksApi;
