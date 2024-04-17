import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todoObj, todoObj2 } from "../models/models";

export const todoApi = createApi({
  reducerPath: "todoApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<todoObj[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    postTodos: builder.mutation<void, todoObj2>({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery, usePostTodosMutation } = todoApi;
