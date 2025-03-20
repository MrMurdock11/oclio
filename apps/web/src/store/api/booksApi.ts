import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "@/shared/types";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBook: builder.query<Book, { uid: string }>({
      query: ({ uid }) => ({
        url: `/books/${uid}`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    updateTitle: builder.mutation<void, { uid: string; title: string }>({
      query: ({ uid, title }) => ({
        url: `/books/${uid}/title`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["books"],
    }),
    updateDescription: builder.mutation<
      void,
      { uid: string; description: string }
    >({
      query: ({ uid, description }) => ({
        url: `/books/${uid}/description`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: ["books"],
    }),
    createBook: builder.mutation<{ uid: string }, void>({
      query: () => ({
        url: `/books/new`,
        method: "POST",
      }),
      invalidatesTags: ["books"],
    }),
    checkBookAccess: builder.query<{ hasAccess: boolean }, { uid: string }>({
      query: ({ uid }) => ({
        url: `/books/${uid}/access`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),
  }),
});

export const {
  useUpdateTitleMutation,
  useUpdateDescriptionMutation,
  useCreateBookMutation,
  useGetBookQuery,
  useCheckBookAccessQuery,
} = booksApi;

export default booksApi;
