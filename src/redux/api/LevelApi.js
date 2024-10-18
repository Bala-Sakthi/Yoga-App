import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const LevelApi = createApi({
  reducerPath: 'LevelApi',
  baseQuery: customFetchBase,
  tagTypes: ['LEVEL'],
  endpoints: (build) => ({
    getLevel: build.query({
      query: ({search,page,category,sortOrder}) => ({
        url: `/admin/viewLevels/${search}?page=${page}&category=${category}&sortOrder=${sortOrder}&limit=10`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['LEVEL'],
    }),

    editTrainerList: build.mutation({
        query: ({ id,data }) => {
           return {
            url: `/admin/updateLevel/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["LEVEL"],
      }),

    deleteLevel: build.mutation({
      query: ({id}) => ({
        url: `/admin/deleteLevel/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['LEVEL'],
    }),
  }),
});

export const { useGetLevelQuery, useDeleteLevelMutation ,useEditTrainerListMutation} = LevelApi;
