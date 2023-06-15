import React, { useEffect, useState } from "react";
import TableComponents from "./tableComponents/TableComponents";
import { useDispatch } from "react-redux";
import Loading from "../utilities/Loading";
import Error from "../utilities/Error";
import { useGetLinkedTableRecordsQuery } from "../../store/services/alphaTruckingApi";
import IndeterminateCheckbox from "./tableUtilities/IndeterminateCheckbox";
import { handelAddTableWithMultipleRecords } from "../../store/features/globalStateSlice";
import { useEffectOnce } from "react-use";
import { handelAddInitialViewsState } from "../../store/features/viewsSlice";
import { setInitialTableData } from "../../store/features/TableSlice";

const Table = function Table({
  tableData,
  tableModel,
  tableView,
  modifiedArrayOfObject,
  multipleRecordLinksArray,
  selectedTableId,
}) {
  const getLinkedRecordsApi = useGetLinkedTableRecordsQuery({
    data: modifiedArrayOfObject,
  });
  const dispatch = useDispatch();
  const linkedRecordIdAndDataMap = new Map();

  useEffect(() => {
    getLinkedRecordsApi.refetch({
      data: { tableId: modifiedArrayOfObject },
    });
  }, [selectedTableId]);

  // useEffect(() => {
  //   dispatch(handelAddInitialViewsState(tableView));
  // }, [tableView]);

  useEffectOnce(() => {
    console.log(
      "array of multiple Linked records send to server:",
      modifiedArrayOfObject
    );
  });

  // this is for checking is the side bar is opened ?
  let defaultColumns = [];
  defaultColumns = tableModel
    .map(({ id, data }) => {
      // console.log(data, id);
      return (
        !data?.primary && {
          accessorKey: id,
          id: id,
          header: id,
          minSize: 100,
          ...data,
        }
      );
    })
    .filter((ele) => ele);
  tableModel.map(({ id, data }) => {
    if (data?.primary) {
      defaultColumns.unshift({
        accessorKey: id,
        id: id,
        header: id,
        enableHiding: false,
        minSize: 100,
        ...data,
      });
    }
  });
  ` `;
  defaultColumns.unshift({
    accessorKey: "",
    id: "select",
    primary: true,
    hiddenInConditions: true,
    size: 75,
    enableHiding: false,
    header: ({ table }) => (
      <IndeterminateCheckbox
        className="-ml-[10px]"
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    // cell: ({ row }) => (
    //   <IndeterminateCheckbox
    //     data={row}
    //     checked={row.getIsSelected()}
    //     indeterminate={row.getIsSomeSelected()}
    //     onChange={row.getToggleSelectedHandler()}
    //   />
    // ),
  });

  // console.log(tableModel)

  const [tableDataModified, setTableDataModified] = useState([]);
  // tableData.map(({ data, id }) => {
  //   const object = {};
  //   defaultColumns.map(({ header }) => {
  //     object[header] = data?.[header] || "";
  //   });
  //   object.recordId = id;
  //   return object;
  // })

  useEffect(() => {
    if (multipleRecordLinksArray.length > 0)
      dispatch(handelAddTableWithMultipleRecords(multipleRecordLinksArray));
  }, []);

  useEffect(() => {
    if (getLinkedRecordsApi.data) {
      console.log("Get linked table Records", getLinkedRecordsApi.data);
      const updatedTableData = tableData.map(({ data, id }, index) => {
        const object = {};
        defaultColumns.map(({ header, fieldType }) => {
          // console.log(data?.lastModifiedBy.toString());
          object[header] = data?.[header] || "";
          if (fieldType === "linkedRecords") {
            if (Array.isArray(data?.[header])) {
              object[header] = data?.[header].map((ele) => {
                return {
                  data: linkedRecordIdAndDataMap.get(ele),
                  recordId: ele,
                };
              });
            }
          }
          if (fieldType === "autoNumber") {
            object[header] = index + 1;
          }
        });
        object.recordId = id;
        object.createdBy = data?.createdBy;
        object.lastModifiedBy = data?.lastModifiedBy;
        object.lastModifiedTime = data?.lastModifiedTime;
        object.createdTime = data?.createdTime;

        return object;
      });
      setTableDataModified(updatedTableData);
      dispatch(setInitialTableData({ tableData: updatedTableData }));
    }
  }, [getLinkedRecordsApi.isSuccess]);

  if (getLinkedRecordsApi.isFetching) {
    return <Loading />;
  }
  if (getLinkedRecordsApi.error) {
    return <Error />;
  }

  // console.log(data);
  getLinkedRecordsApi.data.forEach((ele) => {
    ele?.data.forEach(({ id, data }) => {
      linkedRecordIdAndDataMap.set(id, data);
    });
  });

  // for (let [key, value] of linkedRecordIdAndDataMap) {
  //   console.log(key, value);
  // }

  // console.log(
  //   "table called ----------------------------------------------------------"
  // );

  // return <div>table</div>;

  return (
    <div className="relative overflow-hidden">
      <TableComponents
        defaultColumns={defaultColumns}
        data={tableDataModified}
        setData={setTableDataModified}
        linkedRecordIdAndDataMap={linkedRecordIdAndDataMap}
        // tableConditions={model}
      />
    </div>
  );
};

export default Table;
