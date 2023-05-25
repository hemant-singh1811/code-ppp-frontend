import React, { useEffect } from "react";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import {
  useGetMultiModelQuery,
  useGetSavedViewQuery,
  useGetTableDataQuery,
} from "../../store/services/alphaTruckingApi";
import { useSelector } from "react-redux";
import Table from "../../components/Table/Table";

let multipleRecordLinksArray = [];

export default function TableScreen() {
  const { selectedTableId } = useSelector((state) => state.globalState);

  let getTableDataApi = useGetTableDataQuery(selectedTableId);
  let getModalApi = useGetMultiModelQuery(selectedTableId);
  const getViewsApi = useGetSavedViewQuery({
    data: { tableId: selectedTableId },
  });

  const multipleRecordLinksMap = new Map();

  const RecordIdArrayWithTableIdMap = new Map(); // table id -> multiple record [] of a particular column

  useEffect(() => {
    getTableDataApi.refetch(selectedTableId);
    getModalApi.refetch(selectedTableId);
    getViewsApi.refetch({
      data: { tableId: selectedTableId },
    });
  }, [selectedTableId]);

  useEffect(() => {
    if (getViewsApi.isSuccess) {
      console.log("GET SAVED VIEW MODAL:", getViewsApi.data);
    }
  }, [getViewsApi.isSuccess]);

  useEffect(() => {
    if (getModalApi.data) {
      console.log("GET MODAL:", getModalApi.data);
    }
  }, [getModalApi.isSuccess]);

  useEffect(() => {
    if (getTableDataApi.data) {
      console.log("GET DATA:", getTableDataApi.data);
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
      if (data.fieldType === "linkedRecords") {
        multipleRecordLinksMap.set(data?.linkedRecord?.tableId, data);
        return data;
      }
    })
    .filter((data) => data); // removes empty array

  for (let [key, value] of multipleRecordLinksMap.entries()) {
    const uniqueRecordIdSet = new Set();
    getTableDataApi.data.map(({ data }) => {
      if (Array.isArray(data[value?.fieldId])) {
        data[value?.fieldId].map((item) => {
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
      tableId: key,
      recordIds: value,
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
