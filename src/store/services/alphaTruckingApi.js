import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const dataAdapter = createEntityAdapter();

export const alphaTruckingApi = createApi({
  reducerPath: "alphaTruckingApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, state) => {
      const token = state.getState().auth?.userInfo?.userToken;
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
        url: "/API/V1/getLoad",
        method: "POST",
      }),
    }),

    // views api

    GetSavedView: builder.query({
      query: (payload) => ({
        url: "API/V1/getSavedViewModel",
        body: payload.data, // {tableId}
        method: "POST",
      }),
    }),

    CreateView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createView`,
        body: payload, // {name , model , tableId}
        method: "POST",
      }),
    }),

    DeleteView: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deleteView/${payload.tableId}`,
        body: { viewId: payload.viewId }, // {viewId:''}
        method: "DELETE",
      }),
    }),

    // get table data api

    GetBases: builder.query({
      query: () => ({
        url: "/API/V1/getBases",
        method: "POST",
        // transformResponse: (response) => response.data,
      }),
    }),

    // this is used to get columns and metaData
    GetModel: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getModel/${tableId}`,
        method: "POST",
        // transformResponse: (response) => response.data,
      }),
    }),

    GetMultiModel: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getTableModel/${tableId}`,
        method: "POST",
        // transformResponse: (response) => response.data,
      }),
    }),

    GetTableData: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getData/${tableId}`,
        method: "POST",
        // transformResponse: (response) => response.data,
      }),
    }),

    GetModelData: builder.mutation({
      query: (tableId) => ({
        url: `/API/V1/getModel/${tableId}`,
        method: "POST",
      }),
    }),

    GetTableDataPart: builder.mutation({
      query: (tableId) => ({
        url: `/API/V1/getData/${tableId}`,
        method: "POST",
      }),
    }),

    GetTableRecords: builder.query({
      query: (payload) => ({
        url: `API/V1/getRecords`,
        method: "POST",
        body: payload.data,
      }),
    }),

    // table api
    CreateTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createTable/${payload.baseId}`,
        body: payload.data,
        method: "PUT",
      }),
    }),

    DeleteTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deleteTable/${payload.baseId}`,
        body: payload.data, //tableId
        method: "DELETE",
      }),
    }),

    RenameTable: builder.mutation({
      query: (payload) => ({
        url: `API/V1/tableRename/${payload.baseId}`,
        body: payload.data, //tableId
        method: "PUT",
      }),
    }),

    RenameTableFile: builder.mutation({
      query: (payload) => ({
        url: `API/V1/renameTableFile`,
        body: payload, //tableId
        method: "PATCH",
      }),
    }),
    // {
    // "tableId":"tbl2lFS8fwFz5pEjx",
    // "tableName":"changed table nam1e"
    // }

    // base api
    CreateBase: builder.mutation({
      query: (payload) => ({
        url: `API/V1/createBase`,
        body: payload.data,
        method: "POST",
      }),
    }),

    DeleteBase: builder.mutation({
      query: (payload) => ({
        url: `API/V1/deleteBase`,
        body: payload.data, //baseId
        method: "DELETE",
      }),
    }),

    RenameBase: builder.mutation({
      query: (payload) => ({
        url: `API/V1/baseRename`,
        body: payload.data,
        method: "PATCH",
      }),
    }),

    // rows api

    AddTableRow: builder.mutation({
      query: (payload) => ({
        url: `API/V1/addData/${payload.baseId}`,
        body: payload.data, // field id is required to add a row; like this:- {"fieldId":"fldzmC9cdc4LgvYGI"}
        method: "POST",
      }),
    }),

    // columns api

    AddTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/addColumn/${payload.baseId}`,
        body: payload,
        method: "PUT",
      }),
    }),

    DeleteTableColumn: builder.mutation({
      query: (payload) => ({
        url: `API/V1/removeColumn/${payload.baseId}`,
        body: payload.data, // field id is required to delete a column; like this:- {"fieldId":"fldzmC9cdc4LgvYGI"}
        method: "DELETE",
      }),
    }),
  }),
});

const dataSlice = createSlice({
  name: "data",
  initialState: dataAdapter.getInitialState(),
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetBases.matchFulfilled,
  //       (state, action) => {
  //         dataAdapter.setAll(state, action.payload);
  //         console.log(builder);
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetModel.matchFulfilled,
  //       (state, action) => {
  //         dataAdapter.setAll(state, action.payload);
  //         console.log(builder);
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetTableData.matchFulfilled,
  //       (state, action) => {
  //         dataAdapter.setAll(state, action.payload);
  //         console.log(builder);
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetBases.matchPending,
  //       (state, action) => {
  //         // Set the `loading` flag to true while the request is in progress
  //         state.loading = true;
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetModel.matchPending,
  //       (state, action) => {
  //         // Set the `loading` flag to true while the request is in progress
  //         state.loading = true;
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetTableData.matchPending,
  //       (state, action) => {
  //         // Set the `loading` flag to true while the request is in progress
  //         state.loading = true;
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetBases.matchRejected,
  //       (state, action) => {
  //         // Set the `error` flag and clear the `loading` flag if the request fails
  //         state.loading = false;
  //         state.error = action.error.message;
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetModel.matchRejected,
  //       (state, action) => {
  //         // Set the `error` flag and clear the `loading` flag if the request fails
  //         state.loading = false;
  //         state.error = action.error.message;
  //       }
  //     )
  //     .addMatcher(
  //       alphaTruckingApi.endpoints.GetTableData.matchRejected,
  //       (state, action) => {
  //         // Set the `error` flag and clear the `loading` flag if the request fails
  //         state.loading = false;
  //         state.error = action.error.message;
  //       }
  //     );
  // },
});

export const selectDataLoading = (state) => state.data.loading;
export const selectDataError = (state) => state.data.error;
export const { selectAll: selectAllData } = dataAdapter.getSelectors(
  (state) => state.data
);

export const {
  useCreateTableMutation,
  useCreateBaseMutation,
  useCreateViewMutation,
  useAddTableColumnMutation,
  useDeleteTableMutation,
  useDeleteViewMutation,
  useDeleteTableColumnMutation,
  useDeleteBaseMutation,
  useAddTableRowMutation,
  useRenameTableMutation,
  useRenameBaseMutation,
  useRenameTableFileMutation,
  useGetModelDataMutation,
  useGetTableDataPartMutation,

  useGetTableRecordsQuery,
  useGetBasesQuery,
  useGetModelQuery,
  useGetMultiModelQuery,
  useGetTableDataQuery,
  useGetLoadQuery,
  useGetSavedViewQuery,
} = alphaTruckingApi;

export default dataSlice.reducer;
