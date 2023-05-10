import React, { useEffect } from 'react';
import Error from '../../components/utilities/Error';
import Loading from '../../components/utilities/Loading';
import {
  useGetModelQuery,
  useGetSavedViewQuery,
  useGetTableDataQuery,
} from '../../store/services/alphaTruckingApi';
import { useDispatch, useSelector } from 'react-redux';
import { handelAddInitialState } from '../../store/features/viewsSlice';
import Table from '../../components/Table/Table';
import { initSocket } from '../../store/features/sockets/SocketWebDataSlice';

let multipleRecordLinksArray = [];

export default function TableScreen() {
  const dispatch = useDispatch();
  const { selectedTableId } = useSelector((state) => state.globalState);

  let getTableDataApi = useGetTableDataQuery(selectedTableId);
  let getModalApi = useGetModelQuery(selectedTableId);
  const getViewsApi = useGetSavedViewQuery({
    data: { table_id: selectedTableId },
  });

  const multipleRecordLinksMap = new Map();

  const RecordIdArrayWithTableIdMap = new Map(); // table id -> multiple record [] of a particular column

  useEffect(() => dispatch(initSocket()), [dispatch]);

  useEffect(() => {
    getTableDataApi.refetch(selectedTableId);
    getModalApi.refetch(selectedTableId);
    getViewsApi.refetch({
      data: { table_id: selectedTableId },
    });
  }, [selectedTableId]);

  useEffect(() => {
    if (getViewsApi.isSuccess) {
      console.log('GET SAVED VIEW MODAL:', getViewsApi.data);
    }
  }, [getViewsApi.isSuccess]);

  useEffect(() => {
    if (getModalApi.data) {
      console.log('GET MODAL:', getModalApi.data);
    }
  }, [getModalApi.isSuccess]);

  useEffect(() => {
    if (getTableDataApi.data) {
      console.log('GET DATA:', getTableDataApi.data);
    }
  }, [getTableDataApi.isSuccess]);

  if (
    getTableDataApi.isFetching ||
    getModalApi?.isFetching ||
    getViewsApi.isFetching
  ) {
    return <Loading />;
  }
  if (getTableDataApi.error || getModalApi?.error || getViewsApi.error) {
    return (
      <Error
        error={getTableDataApi.error || getModalApi?.error || getViewsApi.error}
      />
    );
  }

  // stores the linked model in the map by linked  table keys and model as values
  multipleRecordLinksArray = getModalApi.data
    .map(({ data }) => {
      if (data.field_type === 'multipleRecordLinks') {
        multipleRecordLinksMap.set(data?.linked_rec?.tableid, data);
        return data;
      }
    })
    .filter((data) => data); // removes empty array

  // console.log(multipleRecordLinksArray);

  for (let [key, value] of multipleRecordLinksMap.entries()) {
    const uniqueRecordIdSet = new Set();
    // console.log(data);
    getTableDataApi.data.map(({ data }) => {
      if (Array.isArray(data[value?.field_name])) {
        data[value?.field_name].map((item) => {
          // console.log(item);
          uniqueRecordIdSet.add(item);
        });
      }
    });

    let uniqueRecordIdArray = Array.from(uniqueRecordIdSet);

    RecordIdArrayWithTableIdMap.set(key, uniqueRecordIdArray);
  }

  let modifiedArrayOfObject = [];

  for (let [key, value] of RecordIdArrayWithTableIdMap) {
    modifiedArrayOfObject.push({
      table_id: key,
      record_ids: value,
    });
  }

  return (
    <Table
      tableView={getViewsApi.data}
      tableData={getTableDataApi.data}
      tableModel={getModalApi.data}
      modifiedArrayOfObject={modifiedArrayOfObject}
      multipleRecordLinksArray={multipleRecordLinksArray}
    />
  );
}
