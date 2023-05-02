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

let multipleRecordLinksArray = [];

export default function TableScreen() {
  const { selectedTableId } = useSelector((state) => state.globalState);

  const dispatch = useDispatch();

  let { data, error, isFetching, refetch } =
    useGetTableDataQuery(selectedTableId);

  let modelResult = useGetModelQuery(selectedTableId);

  const getSavedViewApi = useGetSavedViewQuery({
    data: { table_id: selectedTableId },
  });

  const multipleRecordLinksMap = new Map();

  const RecordIdArrayWithTableIdMap = new Map(); // table id -> multiple record [] of a particular column

  useEffect(() => {
    refetch(selectedTableId);
    modelResult.refetch(selectedTableId);
  }, [selectedTableId]);

  useEffect(() => {
    if (getSavedViewApi.isSuccess) {
      console.log('GET SAVED VIEW MODAL:', getSavedViewApi.data);
      dispatch(handelAddInitialState(getSavedViewApi.data));
    }
  }, [getSavedViewApi.isSuccess]);

  if (isFetching || modelResult?.isFetching || getSavedViewApi.isFetching) {
    return <Loading />;
  }
  if (error || modelResult?.error || getSavedViewApi.error) {
    return <Error error={error} />;
  }

  console.log('GET MODAL:', modelResult.data);

  console.log('GET DATA:', data);

  // stores the linked model in the map by linked  table keys and model as values
  multipleRecordLinksArray = modelResult.data
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
    data.map(({ data }) => {
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

  console.log(
    'array of multiple Linked records send to server:',
    modifiedArrayOfObject
  );

  // return <></>;
  return (
    <Table
      tableData={data}
      tableModel={modelResult.data}
      modifiedArrayOfObject={modifiedArrayOfObject}
      multipleRecordLinksArray={multipleRecordLinksArray}
    />
  );
}
