import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableUtilityFilter from "./TableUtilityFilter";
import TableUtilityGrouping from "./TableUtilityGrouping";
import TableUtilityHideFields from "./TableUtilityHideFields";
import TableUtilityRowHeight from "./TableUtilityRowHeight";
import TableUtilitySearching from "./TableUtilitySearch";
import TableUtilitySort from "./TableUtilitySort";
import { TableContext } from "../tableComponents/TableComponents";
import TableUtilityViews from "./tableViews/TableUtilityViews";
import {
  handelUpdateModel,
  handleAddViews,
  handleUpdateSelectedViews,
} from "../../../store/features/viewsSlice";
import TableUtilityColor from "./TableUtilityColor";

export default function TableUtilityBar() {
  const { table } = useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  const dispatch = useDispatch();
  const { selectedView, previousSelectedView } = useSelector(
    (state) => state.views
  );
  const { userInfo } = useSelector((state) => state.auth);
  let tabledata = table?.options.state;

  useEffect(() => {
    // dispatch(
    //   handleUpdateSelectedViews({
    //     name: selectedView?.name,
    //     id: selectedView?.id,
    //     model: table?.options.state,
    //   })
    // );
    // dispatch(
    //   handelUpdateModel({
    //     name: selectedView?.name,
    //     id: selectedView?.id,
    //     model: table?data,
    //   })
    // );
    // let obj = {
    //   userToken: userInfo.userToken,
    //   data: {
    //     model: table?.options.state,
    //     viewId: selectedView?.id,
    //     previousSelectedView,
    //   },
    // };
    // console.log("update views", obj);
    // socket.emit("viewChangedSaved", obj, (response) => {
    //   console.log("socket response update views: " + JSON.stringify(response));
    // });
    // dispatch(handleAddViews({ view: "driver", data: table?States }));
  }, [
    table?.options.state.columnVisibility,
    table?.options.state.columnSizing,
    table?.options.state.columnFilters,
    table?.options.state.columnOrder,
    table?.options.state.columnVisibility,
    table?.options.state.globalFilter,
    table?.options.state.sorting,
    table?.options.state.grouping,
  ]);

  // console.log("tabledata", tabledata);

  // console.log(tableStates)x

  return (
    <div className="flex items-center p-1  w-full justify-between  select-none bg-white border-[#c8c8c8] border-b-[1px]">
      <div className="flex items-center gap-2 ">
        <TableUtilityViews table={table} />
        <div className="w-[.5px] bg-black h-6" />
        <TableUtilityHideFields table={table} />
        <TableUtilityFilter table={table} />
        <TableUtilityGrouping table={table} />
        <TableUtilitySort table={table} />
        <TableUtilityRowHeight />
        <TableUtilityColor table={table} />
      </div>
      <TableUtilitySearching />
    </div>
  );
}
