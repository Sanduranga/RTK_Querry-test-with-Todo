import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todoObj } from "../models/models";

export const todoApi = createApi({
  reducerPath: "todoApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555/" }),
  endpoints: (builder) => ({
    getTodos: builder.query<todoObj[], void>({
      query: () => "/todos",
    }),
    postTodos: builder.mutation<todoObj, string>({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useGetTodosQuery, usePostTodosMutation } = todoApi;
