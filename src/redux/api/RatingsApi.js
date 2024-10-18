import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const RatingsApi = createApi({
  reducerPath: 'RatingsApi',
  baseQuery: customFetchBase,
  tagTypes: ['RATINGS'],
  endpoints: (build) => ({
    getRatings: build.query({
      query: ({search,page,sortOrder}) => ({
        url: `/admin/viewRatings/${search}?page=${page}&sortOrder=${sortOrder}&limit=10`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RATINGS'],
    }),

    editTrainerList: build.mutation({
        query: ({ id,data }) => {
           return {
            url: `/admin/updateTrainer/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["RATINGS"],
      }),

    deleteRatings: build.mutation({
      query: ({id}) => ({
        url: `/admin/deleteRating/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['RATINGS'],
    }),
  }),
});

export const { useGetRatingsQuery, useDeleteRatingsMutation ,useEditTrainerListMutation} = RatingsApi;
