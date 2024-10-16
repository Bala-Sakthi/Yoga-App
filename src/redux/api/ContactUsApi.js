import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const ContactUsApi = createApi({
  reducerPath: 'ContactUsApi',
  baseQuery: customFetchBase,
  tagTypes: ['CONTACTUS'],
  endpoints: (build) => ({
    getContactUs: build.query({
      query: () => ({
        url: `/admin/viewContactUsRequests?limit=2&page=3`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['CONTACTUS'],
    }),

    deleteContactUs: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteUser/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['CONTACTUS'],
    }),
  }),
});

export const { useGetContactUsQuery, useDeleteContactUsMutation } = ContactUsApi;
