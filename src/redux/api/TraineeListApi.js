import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const TraineeListApi = createApi({
  reducerPath: 'TraineeListApi',
  baseQuery: customFetchBase,
  tagTypes: ['TRAINEELIST'],
  endpoints: (build) => ({
    getTraineeList: build.query({
      query: () => ({
        url: `/admin/viewTrainers`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['TRAINEELIST'],
    }),

    deleteTraineeList: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteUser/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['TRAINEELIST'],
    }),
  }),
});

export const { useGetTraineeListQuery, useDeleteTraineeListMutation } = TraineeListApi;
