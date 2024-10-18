import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const CategoryApi = createApi({
  reducerPath: 'CategoryApi',
  baseQuery: customFetchBase,
  tagTypes: ['CATEGORY'],
  endpoints: (build) => ({
    getCategory: build.query({
      query: ({search,page,sortOrder}) => ({
        url: `/admin/viewCategories/${search}?page=${page}&sortOrder=${sortOrder}&limit=10`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['CATEGORY'],
    }),

    editCategory: build.mutation({
        query: ({ id,data }) => {
           return {
            url: `/admin/updateCategory/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["CATEGORY"],
      }),

    deleteCategory: build.mutation({
      query: ({id}) => ({
        url: `/admin/deleteCategory/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['CATEGORY'],
    }),
  }),
});

export const { useGetCategoryQuery, useDeleteCategoryMutation ,useEditCategoryMutation} = CategoryApi;
