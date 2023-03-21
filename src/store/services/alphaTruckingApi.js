import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const alphaTruckingApi = createApi({
  reducerPath: 'alphaTruckingApi',
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, state) => {
      const token = state.getState().auth?.userInfo?.user_token;
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`);
        // headers.set('method', 'POST');
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    GetBases: builder.query({
      query: () => ({
        url: '/API/V1/bases',
        method: 'POST',
      }),
    }),
    GetModel: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getmodel/${tableId}`,
        method: 'POST',
      }),
    }),
    GetTableData: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getdata/${tableId}`,
        method: 'POST',
      }),
    }),
    PostViews: builder.mutation({
      query: (payload) => ({
        url: 'API/V1/changesaved',
        body: { model: payload },
        method: 'POST',
      }),
    }),
    GetLoad: builder.query({
      query: () => ({
        url: '/API/V1/getload',
        method: 'POST',
      }),
    }),
    GetSavedView: builder.query({
      query: () => ({
        url: 'API/V1/getsavedviewmodel',
        method: 'POST',
      }),
    }),

    CreateTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createtable/${payload.tableId}`,
        body: payload.data,
        method: 'PUT',
      }),
    }),

    AddTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/addcolumn/${payload.tableId}`,
        body: payload.data,
        method: 'PUT',
      }),
    }),

    DeleteTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/remcolumn/${payload.tableId}`,
        body: payload.data, // field id is required to delete a column; like this:- {"field_id":"fldzmC9cdc4LgvYGI"}
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateTableMutation,
  usePostViewsMutation,
  useAddTableColumnMutation,
  useDeleteTableColumnMutation,
  useGetBasesQuery,
  useGetModelQuery,
  useGetTableDataQuery,
  useGetLoadQuery,
  useGetSavedViewQuery,
} = alphaTruckingApi;
