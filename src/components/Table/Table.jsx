import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableComponents from "./tableComponents/TableComponents";
import { useSelector } from "react-redux";
import AddTable from "./tableUtilities/AddTable";
import Loading from "../utilities/Loading";
import Error from "../utilities/Error";
import { useGetTableRecordsQuery } from "../../store/services/alphaTruckingApi";

export default function Table({ tableData, tableModel, modifiedArrayOfObject }) {
  const { driver } = useSelector((state) => state.views);
  const { model } = useSelector((state) => state.views);
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  const { data, isFetching, error, isSuccess } = useGetTableRecordsQuery({ data: modifiedArrayOfObject });
  // const { data, error, isFetching , } = useGetSavedViewQuery();

  // this is for checking is the side bar is opened ?

  const defaultColumns = tableModel.map(({ id, data }) => {
    return {
      accessorKey: data?.field_name,
      id: data?.field_name,
      header: data?.field_name,
      ...data,
    };
  });

  console.log(tableModel)


  const [tableDataModified, setTableDataModified] = React.useState([]
    // tableData.map(({ data, id }) => {
    //   const object = {};
    //   defaultColumns.map(({ header }) => {
    //     object[header] = data?.[header] || "";
    //   });
    //   object.id52148213343234567 = id;
    //   return object;
    // })
  );

  useEffect(() => {
    if (data) {
      // let multipleLinkedRecColumns = defaultColumns.map(({ field_type, field_name }) => {
      //   if (field_name === "multipleRecordLinks") {
      //   }
      // })
      // console.log(defaultColumns)

      setTableDataModified(
        tableData.map(({ data, id }) => {
          const object = {};
          defaultColumns.map(({ header, field_type, linked_rec }) => {
            object[header] = data?.[header] || "";
            if (field_type === "multipleRecordLinks") {
              // console.log(data)
              if (Array.isArray(data?.[header])) {
                object[header] = data?.[header].map((ele) => {
                  return { data: linkedRecordIdAndDataMap.get(ele), recordId: ele }
                })
              }
            }
          });
          object.id52148213343234567 = id;

          return object;
        })
      )
    }
  }, [isSuccess])



  if (isFetching) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const linkedRecordIdAndDataMap = new Map();

  data.forEach((ele) => {
    ele?.data.forEach(({ id, data }) => {
      linkedRecordIdAndDataMap.set(id, data)
    })
  })

  // for (let [key, value] of linkedRecordIdAndDataMap) {
  //   console.log(key, value)
  // }








  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative overflow-hidden">
        <AddTable />
        <TableComponents
          toggle={toggle}
          defaultColumns={defaultColumns}
          data={tableDataModified}
          setData={setTableDataModified}
        // tableConditions={model}
        />
      </div>
    </DndProvider>
  );
}

// <pre>{JSON.stringify(table.getState(), null, 2)}</pre>


  // console.log(tableModel)
  // const keysMap = new Map();

  // for (let index = 0; index < tableData.length; index++) {
  //   const keys = Object.keys(tableData[index].data);
  //   keys.map((ele) => {
  //     keysMap.set(ele);
  //   })
  // }

  // const dataKeys = [];
  // for (const [key] of keysMap) {
  //   dataKeys.push(key);
  // }

  // const defaultColumns = dataKeys.map((item) => {
  //   return ({
  //     accessorKey: item,
  //     id: item,
  //     header: item,
  //   })
  // })

  // console.log(tableModel)

  // console.log(tableData)

    // if (isFetching) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <Error />
  // }

  // console.log(tableModel)

  // console.log(defaultColumns, model)


    // console.log(defaultColumns)

  // for (let index = 0; index < defaultColumns.length; index++) {
  //   const keys = Object.keys(defaultColumns[index].field_type);
  //   keys.map((ele) => {
  //     keysMap.set(ele);
  //   })
  // }
  // console.log(keysMap)


  // import { useGetSavedViewQuery } from "../../store/services/alphaTruckingApi";
// import Loading from "../utilities/Loading";
// import Error from "../utilities/Error";
// import AddRowTable from "./tableUtilities/AddRowTable