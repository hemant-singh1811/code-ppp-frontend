import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const alphaTruckingApi = createApi({
  reducerPath: "alphaTruckingApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, state) => {
      const token = state.getState().auth?.userInfo?.user_token;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        // headers.set('method', 'POST');
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    GetLoad: builder.query({
      query: () => ({
        url: "/API/V1/getload",
        method: "POST",
      }),
    }),

    PostViews: builder.mutation({
      query: (payload) => ({
        url: "API/V1/changesaved",
        body: { model: payload },
        method: "POST",
      }),
    }),

    GetSavedView: builder.query({
      query: (payload) => ({
        url: "API/V1/getsavedviewmodel",
        body: payload.data, // {table_id}
        method: "POST",
      }),
    }),

    // views api
    CreateView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createnewview`,
        body: payload, // {name , model , table_id}
        method: "POST",
      }),
    }),

    DeleteView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deleteview/${payload.tableId}`,
        body: { view_id: payload.viewId }, // {view_id:''}
        method: "DELETE",
      }),
    }),

    // table api

    GetBases: builder.query({
      query: () => ({
        url: "/API/V1/bases",
        method: "POST",
      }),
    }),
    GetModel: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getmodel/${tableId}`,
        method: "POST",
      }),
    }),
    GetTableData: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getdata/${tableId}`,
        method: "POST",
      }),
    }),

    CreateTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createtable/${payload.tableId}`,
        body: payload.data,
        method: "PUT",
      }),
    }),

    AddTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/addcolumn/${payload.tableId}`,
        body: payload.data,
        method: "PUT",
      }),
    }),

    DeleteTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/remcolumn/${payload.tableId}`,
        body: payload.data, // field id is required to delete a column; like this:- {"field_id":"fldzmC9cdc4LgvYGI"}
        method: "DELETE",
      }),
    }),

    AddTableRow: builder.mutation({
      query: (payload) => ({
        url: `API/V1/adddata/${payload.tableId}`,
        body: payload.data, // field id is required to add a row; like this:- {"field_id":"fldzmC9cdc4LgvYGI"}
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateTableMutation,
  useCreateViewMutation,
  useDeleteViewMutation,
  usePostViewsMutation,
  useAddTableColumnMutation,
  useDeleteTableColumnMutation,
  useAddTableRowMutation,
  useGetBasesQuery,
  useGetModelQuery,
  useGetTableDataQuery,
  useGetLoadQuery,
  useGetSavedViewQuery,
} = alphaTruckingApi;
