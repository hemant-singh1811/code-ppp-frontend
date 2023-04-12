import React, { useEffect } from "react";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import {
  useGetModelQuery,
  useGetTableDataQuery,
  useGetTableRecordsQuery,
} from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";

export default function TableScreen() {
  const { selectedTableId } = useSelector((state) => state.globalState);
  let { data, error, isFetching, refetch } =
    useGetTableDataQuery(selectedTableId);
  let modelResult = useGetModelQuery(selectedTableId);

  useEffect(() => {
    refetch(selectedTableId);
    modelResult.refetch(selectedTableId);
  }, [selectedTableId]);

  if (isFetching || modelResult?.isFetching) {
    return <Loading />;
  }
  if (error || modelResult?.error) {
    return <Error error={error} />;
  }



  const multipleRecordLinksMap = new Map();

  modelResult.data.map(({ data }) => {
    if (data.field_type === "multipleRecordLinks") {
      // console.log(data)
      multipleRecordLinksMap.set(data?.linked_rec?.tableid, data)
    }
  })

  // modelResult.data.map(({ data }) => {
  //   if (data.field_type === "multipleLookupValues") {
  //     // multipleRecordLinksMap.set(data.linked_rec.tableid, data.linked_rec)
  //     console.log(data)
  //   }
  // })

  let i = 0

  for (let [key, value] of multipleRecordLinksMap.entries()) {
    // multipleRecordLinksMap.set(key, {
    //   ...multipleRecordLinksMap.get(key), data: data.map(({ data }) => {
    //     return data[value?.field_name]
    //   })
    // })

    let newArray = data.map(({ data }) => {
      // console.log(value?.field_name)
      let updatedArray = []
      if (Array.isArray(data[value?.field_name])) {
        updatedArray = [...data[value?.field_name]]
      }
      return data[value?.field_name]
    })

    // console.log(newArray)
  }

  // for (let [key, value] of multipleRecordLinksMap.entries()) {
  //   console.log(key + ' = ', value);
  // }

  // console.log(tableData)

  // let valuesArray = Array.from(multipleRecordLinksMap.values());
  // console.log(valuesArray);
  // console.log(data);

  return <Table tableData={data} tableModel={modelResult.data} />;
}

function getTableRecords() {

  const data = useGetTableRecordsQuery()



  return data;


}