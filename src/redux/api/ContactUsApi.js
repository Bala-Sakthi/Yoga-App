import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const ContactUsApi = createApi({
  reducerPath: 'ContactUsApi',
  baseQuery: customFetchBase,
  tagTypes: ['CONTACTUS'],
  endpoints: (build) => ({
    getContactUs: build.query({
      query: ({search,page,sortOrder}) => ({
        url: `/admin/viewContactUsRequests/${search}?page=${page}&sortOrder=${sortOrder}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['CONTACTUS'],
    }),

    editContactUs: build.mutation({
      query: ({ id,data }) => {
         return {
          url: `/admin/updateContactUsRequest/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["CONTACTUS"],
    }),

    deleteContactUs: build.mutation({
      query: ({ id }) => ({
        url: `/admin/deleteContactUsRequest/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['CONTACTUS'],
    }),
  }),
});

export const { useGetContactUsQuery, useDeleteContactUsMutation,useEditContactUsMutation } = ContactUsApi;
