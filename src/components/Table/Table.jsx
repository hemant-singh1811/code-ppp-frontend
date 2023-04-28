import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableComponents from './tableComponents/TableComponents';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utilities/Loading';
import Error from '../utilities/Error';
import { useGetTableRecordsQuery } from '../../store/services/alphaTruckingApi';
import IndeterminateCheckbox from './tableUtilities/IndeterminateCheckbox';
import { handelAddTableWithMultipleRecords } from '../../store/features/globalStateSlice';

export default function Table({
  tableData,
  tableModel,
  modifiedArrayOfObject,
  multipleRecordLinksArray,
}) {
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  const { data, isFetching, error, isSuccess } = useGetTableRecordsQuery({
    data: modifiedArrayOfObject,
  });
  const dispatch = useDispatch();

  // this is for checking is the side bar is opened ?

  let defaultColumns = tableModel.map(({ id, data }) => {
    return {
      accessorKey: data?.field_name,
      id: data?.field_name,
      header: data?.field_name,
      ...data,
    };
  });

  defaultColumns.unshift({
    accessorKey: '',
    id: 'select',
    size: 40,
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    width: 20,
    cell: ({ row }) => (
      <IndeterminateCheckbox
        data={row}
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  });

  // console.log(tableModel)

  const [tableDataModified, setTableDataModified] = React.useState(
    []
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
    dispatch(handelAddTableWithMultipleRecords(multipleRecordLinksArray));
  }, []);

  useEffect(() => {
    if (data) {
      console.log('Get linked table Records', data);
      // let multipleLinkedRecColumns = defaultColumns.map(({ field_type, field_name }) => {
      //   if (field_name === "multipleRecordLinks") {
      //   }
      // })
      // console.log(defaultColumns)

      setTableDataModified(
        tableData.map(({ data, id }) => {
          const object = {};
          defaultColumns.map(({ header, field_type, linked_rec }) => {
            object[header] = data?.[header] || '';
            if (field_type === 'multipleRecordLinks') {
              // console.log(data)
              if (Array.isArray(data?.[header])) {
                object[header] = data?.[header].map((ele) => {
                  return {
                    data: linkedRecordIdAndDataMap.get(ele),
                    recordId: ele,
                  };
                });
              }
            }
          });
          object.id52148213343234567 = id;

          return object;
        })
      );
    }
  }, [isSuccess]);

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const linkedRecordIdAndDataMap = new Map();

  data.forEach((ele) => {
    ele?.data.forEach(({ id, data }) => {
      linkedRecordIdAndDataMap.set(id, data);
    });
  });

  // for (let [key, value] of linkedRecordIdAndDataMap) {
  //   console.log(key, value)
  // }
  // return <>   </>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='relative overflow-hidden'>
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
