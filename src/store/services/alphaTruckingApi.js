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
    GetLoad: builder.query({
      query: () => ({
        url: '/API/V1/getload',
        method: 'POST',
      }),
    }),

    // views api

    PostViews: builder.mutation({
      query: (payload) => ({
        url: 'API/V1/changesaved',
        body: { model: payload },
        method: 'POST',
      }),
    }),

    GetSavedView: builder.query({
      query: (payload) => ({
        url: 'API/V1/getsavedviewmodel',
        body: payload.data, // {table_id}
        method: 'POST',
      }),
    }),

    CreateView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createnewview`,
        body: payload, // {name , model , table_id}
        method: 'POST',
      }),
    }),

    DeleteView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deleteview/${payload.tableId}`,
        body: { view_id: payload.viewId }, // {view_id:''}
        method: 'DELETE',
      }),
    }),

    // get table data api

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

    GetModelData: builder.mutation({
      query: (tableId) => ({
        url: `/API/V1/getmodel/${tableId}`,
        method: 'POST',
      }),
    }),

    GetTableDataPart: builder.mutation({
      query: (tableId) => ({
        url: `/API/V1/getdata/${tableId}`,
        method: 'POST',
      }),
    }),

    // GetTableRecords: builder.query({
    //   query: (payload) => ({
    //     url: `API/V1/getrecords/${payload.tableId}`,
    //     body: payload.data, // field id is required to add a row; like this:- {"record_ids":[
    //     //     "recNnTzcV4LU5QyL3",
    //     //     "recSsQ1umIxk9UonT",
    //     //     "receBpDSAcAy9IwZj",
    //     //     "rechy2iQZtd44slZ5"
    //     // ]}
    //     method: 'PUT',
    //   }),
    // }),

    GetTableRecords: builder.query({
      query: async (payload) => {
        const response = await fetch(`API/V1/getrecords/${payload.tableId}`, {
          body: payload.data,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        return data;
      },
    }),

    // table api
    CreateTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createtable/${payload.tableId}`,
        body: payload.data,
        method: 'PUT',
      }),
    }),

    DeleteTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deletetable/${payload.baseId}`,
        body: payload.data, //table_id
        method: 'DELETE',
      }),
    }),

    RenameTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/tablerename/${payload.baseId}`,
        body: payload.data, //table_id
        method: 'DELETE',
      }),
    }),
    // {
    // "table_id":"tbl2lFS8fwFz5pEjx",
    // "table_name":"changed table nam1e"
    // }

    // rows api

    AddTableRow: builder.mutation({
      query: (payload) => ({
        url: `API/V1/adddata/${payload.baseId}`,
        body: payload.data, // field id is required to add a row; like this:- {"field_id":"fldzmC9cdc4LgvYGI"}
        method: 'PUT',
      }),
    }),

    // columns api

    AddTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/addcolumn/${payload.base_id}`,
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
  useAddTableColumnMutation,
  useCreateTableMutation,
  useCreateViewMutation,
  useDeleteTableMutation,
  useDeleteViewMutation,
  usePostViewsMutation,
  useDeleteTableColumnMutation,
  useAddTableRowMutation,
  useRenameTableMutation,
  useGetModelDataMutation,
  useGetTableDataPartMutation,

  useGetBasesQuery,
  useGetModelQuery,
  useGetTableDataQuery,
  useGetLoadQuery,
  useGetSavedViewQuery,
  useGetTableRecordsQuery,
} = alphaTruckingApi;
