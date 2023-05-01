import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableUtilityFilter from './TableUtilityFilter';
import TableUtilityGrouping from './TableUtilityGrouping';
import TableUtilityHideFields from './TableUtilityHideFields';
import TableUtilityRowHeight from './TableUtilityRowHeight';
import TableUtilitySearching from './TableUtilitySearch';
import TableUtilitySort from './TableUtilitySort';
import { TableContext } from '../tableComponents/TableComponents';
import TableUtilityViews from './tableViews/TableUtilityViews';
import {
  handelUpdateModel,
  handleUpdateViews,
} from '../../../store/features/viewsSlice';

export default function TableUtilityBar() {
  const { table } = useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  const dispatch = useDispatch();
  const [tableStates, setTableStates] = useState();
  // const [updatePost, result] = usePostViewsMutation()
  const selectedView = useSelector((state) => state.views);
  const { userToken } = useSelector((state) => state.auth);
  let tabledata = table.options.state;

  // useEffect(() => {
  //   dispatch(
  //     handleUpdateViews({
  //       name: selectedView.name,
  //       id: selectedView.id,
  //       model: table.options.state,
  //     })
  //   );
  //   dispatch(
  //     handelUpdateModel({
  //       name: selectedView.name,
  //       id: selectedView.id,
  //       model: tabledata,
  //     })
  //   );

  //   let obj = {
  //     user_token: userToken,
  //     model: table.options.state,
  //     view_id: selectedView.id,
  //   };

  //   console.log("update views", obj);

  //   socket.emit("changesaved", obj, (response) => {
  //     console.log("socket response update views: " + JSON.stringify(response));
  //     // console.log("res from server : ", response.message);
  //   });

  //   // console.log("socket called");
  //   // console.log(obj);
  //   // let data = table.options.state
  //   // console.log(data)
  //   // setTableStates(table.options.state)
  //   // updatePost({ model: table.options.state })
  //   // dispatch(handleAddViews({ view: "driver", data: tableStates }))
  // }, [
  //   table.options.state.columnVisibility,
  //   table.options.state.columnSizing,
  //   table.options.state.columnFilters,
  //   table.options.state.columnOrder,
  //   table.options.state.columnVisibility,
  //   table.options.state.globalFilter,
  //   table.options.state.sorting,
  //   table.options.state.grouping,
  // ]);

  // console.log("tabledata", tabledata);

  // console.log(tableStates)x

  return (
    <div className='flex items-center p-1  w-full justify-between  select-none bg-white border-[#c8c8c8] border-b-[1px]'>
      <div className='flex items-center gap-2 '>
        <TableUtilityViews table={table} />
        <div className='w-[.5px] bg-black h-6' />
        <TableUtilityHideFields table={table} />
        <TableUtilityFilter table={table} />
        <TableUtilityGrouping table={table} />
        <TableUtilitySort table={table} />
        {/* <TableUtilityRowHeight /> */}
      </div>
      <TableUtilitySearching />
    </div>
  );
}
