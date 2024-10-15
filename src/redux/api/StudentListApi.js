import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const StudentListApi = createApi({
  reducerPath: 'StudentListApi',
  baseQuery: customFetchBase,
  tagTypes: ['STUDENTLIST'],
  endpoints: (build) => ({
    getStudentList: build.query({
      query: () => ({
        url: `/admin/viewUsers/Admin/+918978722969`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['STUDENTLIST'],
    }),

    deleteStudentList: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteUser/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['STUDENTLIST'],
    }),
  }),
});

export const { useGetStudentListQuery, useDeleteStudentListMutation } = StudentListApi;
