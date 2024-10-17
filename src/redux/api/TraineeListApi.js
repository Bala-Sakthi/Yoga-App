import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const TraineeListApi = createApi({
  reducerPath: 'TraineeListApi',
  baseQuery: customFetchBase,
  tagTypes: ['TRAINEELIST'],
  endpoints: (build) => ({
    getTraineeList: build.query({
      query: ({search,page,sortOrder}) => ({
        url: `/admin/viewTrainers/${search}?page=${page}&sortOrder=${sortOrder}&limit=10`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['TRAINEELIST'],
    }),

    editTrainerList: build.mutation({
        query: ({ id,data }) => {
           return {
            url: `/admin/updateTrainer/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["TRAINEELIST"],
      }),

    deleteTraineeList: build.mutation({
      query: ({id}) => ({
        url: `/admin/deleteTrainer/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['TRAINEELIST'],
    }),
  }),
});

export const { useGetTraineeListQuery, useDeleteTraineeListMutation ,useEditTrainerListMutation} = TraineeListApi;
