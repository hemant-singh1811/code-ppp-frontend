import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableComponents from "./tableComponents/TableComponents";
import { useSelector } from "react-redux";
import { useGetSavedViewQuery } from "../../store/services/alphaTruckingApi";
import Loading from "../utilities/Loading";
import Error from "../utilities/Error";
import AddTable from "./tableUtilities/AddTable";
import AddRowTable from "./tableUtilities/AddRowTable";

export default function Table({ tableData, tableModel }) {
  const { driver } = useSelector((state) => state.views);
  const { data, error, isFetching } = useGetSavedViewQuery();

  // this is for checking is the side bar is opened ?
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  // console.log(tableModel)
  const keysMap = new Map();

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

  const defaultColumns = tableModel.map(({ id, data }) => {
    return {
      accessorKey: data?.field_name,
      id: data?.field_name,
      header: data?.field_name,
      field_type: data?.field_type,
      created_at: data?.created_at,
      created_by: data?.created_by,
      field_description: data?.field_description,
      field_id: data?.field_id,
      linked_rec: data?.linked_rec,
    };
  });

  // console.log(tableModel);

  // console.log(defaultColumns)

  // for (let index = 0; index < defaultColumns.length; index++) {
  //   const keys = Object.keys(defaultColumns[index].field_type);
  //   keys.map((ele) => {
  //     keysMap.set(ele);
  //   })
  // }
  // console.log(keysMap)
  const [tableDataModified, setTableDataModified] = React.useState(
    tableData.map(({ data }) => {
      const object = {};
      defaultColumns.map(({ header }) => {
        object[header] = data?.[header];
      });
      // dataKeys.map((key) => {
      //   console.log(key)
      //   object[key] = data?.[key]
      // })
      return object;
    })
  );

  // if (isFetching) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <Error />
  // }

  // console.log(data)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <AddTable />
        <TableComponents
          toggle={toggle}
          defaultColumns={defaultColumns}
          data={tableDataModified}
          setData={setTableDataModified}
          tableConditions={data}
        />
      </div>
    </DndProvider>
  );
}

// <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
