import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const TrainerVideosApi = createApi({
  reducerPath: 'TrainerVideosApi',
  baseQuery: customFetchBase,
  tagTypes: ['TRAINERVIDEOS'],
  endpoints: (build) => ({
    getTrainerVideos: build.query({
      query: ({phoneNumber}) => ({
        url: `/admin/videosByTrainer/${phoneNumber}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['TRAINERVIDEOS'],
    }),

    
    deleteTrainerVideos: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteUser/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['TRAINERVIDEOS'],
    }),
  }),
});

export const { useGetTrainerVideosQuery, useDeleteTrainerVideosMutation } = TrainerVideosApi;
