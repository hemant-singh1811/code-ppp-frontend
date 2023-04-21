import React, { useEffect } from 'react';
import Error from '../../components/utilities/Error';
import Loading from '../../components/utilities/Loading';
import {
  useGetModelQuery,
  useGetTableDataQuery,
} from '../../store/services/alphaTruckingApi';
import Table from '../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';

let multipleRecordLinksArray = [];

export default function TableScreen() {
  const { selectedTableId } = useSelector((state) => state.globalState);
  // const token = useSelector((state) => state.auth.userInfo.user_token);
  const dispatch = useDispatch();
  let { data, error, isFetching, refetch } =
    useGetTableDataQuery(selectedTableId);
  let modelResult = useGetModelQuery(selectedTableId);

  const multipleRecordLinksMap = new Map();
  const RecordIdArrayWithTableIdMap = new Map(); // table id -> multiple record [] of a particular column

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

  console.log('Get Model:', modelResult.data);
  console.log('Get data:', data);

  // stores the linked model in the map by linked  table keys and model as values
  multipleRecordLinksArray = modelResult.data
    .map(({ data }) => {
      if (data.field_type === 'multipleRecordLinks') {
        multipleRecordLinksMap.set(data?.linked_rec?.tableid, data);
        return data;
      }
    })
    .filter((data) => data);

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

  return (
    <Table
      tableData={data}
      tableModel={modelResult.data}
      modifiedArrayOfObject={modifiedArrayOfObject}
      multipleRecordLinksArray={multipleRecordLinksArray}
    />
  );
}

// async function fetchLinkedRecordData(tableId, data, token) {
//   const postData = { record_ids: data };

//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}API/V1/getrecords/${tableId}`,
//       postData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     const userData = response.data;
//     console.log(userData);
//     return userData;

//   } catch (error) {
//     console.error(error);
//     throw new Error(error);
//   }
// }

// function getTableRecords() {

//   const data = useGetTableRecordsQuery()

//   return data;

// }

// // Example usage:
// fetchUserData('octocat')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// function addDataToRow({ key, newArray }) {
//   const val = useGetTableRecordsQuery({ tableId: key, data: newArray })
//   console.log(val)

// }

// console.log(modelResult.data)

// modelResult.data.map(({ data }) => {
//   if (data.field_type === "multipleLookupValues") {
//     // multipleRecordLinksMap.set(data.linked_rec.tableid, data.linked_rec)
//     console.log(data)
//   }
// })
// multipleRecordLinksMap.set(key, {
//   ...multipleRecordLinksMap.get(key), data: data.map(({ data }) => {
//     return data[value?.field_name]
//   })
// })

// let i = 0

// for (let [key, value] of multipleRecordLinksMap.entries()) {
//   console.log(key + ' = ', value);
// }

// console.log(tableData)

// let valuesArray = Array.from(multipleRecordLinksMap.values());
// console.log(valuesArray);
// console.log(data);

// let rowsRecordId = data.map(({ data }) => {
//   let updatedArray = []
//   if (Array.isArray(data[value?.field_name])) {
//     updatedArray = [...data[value?.field_name]]
//   }
//   return data[value?.field_name]
// })

// rowsRecordId.map((ele) => {
//   uniqueRecordIdMap.set(ele, undefined)
// })

// const datad = fetchLinkedRecordData(key, newArray, token)
// console.log(datad)
