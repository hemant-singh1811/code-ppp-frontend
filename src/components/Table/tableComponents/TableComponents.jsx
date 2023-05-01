import React, { useContext, useEffect, useState } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";
import TableUtilityBar from "../tableUtilityBar/TableUtilityBar";
import CustomTable from "./CustomTable";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const TableContext = React.createContext();

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function handleRowHeight(rowHeight) {
  let activeRowHeight = 30;
  let activeNumberOfLines = 1;
  rowHeight.map((ele) => {
    if (ele.isActive) {
      activeRowHeight = ele.height;
      activeNumberOfLines = ele.numberOfLines;
    }
  });
  return { activeRowHeight, activeNumberOfLines };
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
}

// {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */ }

// Give our default column cell renderer editing superpowers!
const defaultColumn = {
  cell: ({
    getValue,
    row: { original, index },
    column: { id, columnDef },
    table,
    row,
  }) => {
    const initialValue = getValue();
    const location = useLocation();
    const socket = useSelector((state) => state.socketWebData.socket);
    const { selectedBaseId, selectedTableId } = useSelector(
      (state) => state.globalState
    );

    // console.log(row._valuesCache)
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    // console.log(id)
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = (e) => {
      table.options.meta?.updateData(index, id, value);
      let rowCopy = original;
      rowCopy[id] = e.target.value;

      // console.log(rowCopy);
      let updatedRowKey = id;
      let updatedRowValue = row.original[id];
      let newRowPart = { [updatedRowKey]: updatedRowValue };

      let obj = {
        base_id: selectedBaseId,
        table_id: selectedTableId,
        record_id: rowCopy.id52148213343234567,
        updated_data: newRowPart,
        field_type: columnDef.field_type,
        field_name: columnDef.field_name,
        field_id: columnDef.field_id,
      };
      console.log(obj);
      socket.emit("updatedata", obj, (response) => {
        console.log("res : ", response);
      });
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      // <div contentEditable="true"
      //   value={value}
      //   onChange={(e) => {
      //     setValue(e.target.value);
      //   }}
      //   onBlur={onBlur}>
      // </div>

      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={onBlur}
      />
    );
  },
};

export default function TableComponents({
  defaultColumns,
  data,
  toggle,
  setData,
}) {
  const { model } = useSelector((state) => state.views);
  const [columns, setColumns] = useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = useState(model?.globalFilter || "");
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [columnOrder, setColumnOrder] = useState(
    //must start out with populated columnOrder so we can splice
    model?.columnOrder || columns?.map((column) => column.id)
  );

  const [rowHeight, setRowHeight] = useState([
    {
      name: "small",
      isActive: true,
      icon: "density_small",
      height: 30,
      numberOfLines: 1,
    },
    // {
    //   name: "medium",
    //   isActive: false,
    //   icon: "density_medium",
    //   height: 50,
    //   numberOfLines: 2,
    // },
    // {
    //   name: "large",
    //   isActive: false,
    //   icon: "density_large",
    //   height: 70,
    //   numberOfLines: 3,
    // },
    // {
    //   name: "Extra large",
    //   isActive: false,
    //   icon: "density_large",
    //   height: 90,
    //   numberOfLines: 4,
    // },
  ]);
  let { activeRowHeight, activeNumberOfLines } = handleRowHeight(rowHeight);
  const [columnPinning, setColumnPinning] = useState({});
  // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    //onChange
    columnResizeMode: "onEnd",
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
      columnPinning,
      grouping,
      sorting,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnPinningChange: setColumnPinning,

    //new editable row code

    // autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        // skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  useEffect(() => {
    console.log("model:", model);
    if (model != []) {
      table.setState(model);
    }
    console.log("model updated", table.options.state);
  }, []);

  // console.log(table)
  return (
    <TableContext.Provider
      value={{
        table: table,
        rowHeight: rowHeight,
        setRowHeight: setRowHeight,
        globalFilter: globalFilter,
        setGlobalFilter: setGlobalFilter,
        toggle: toggle,
        activeRowHeight: activeRowHeight,
        activeNumberOfLines: activeNumberOfLines,
        setColumns: setColumns,
        columns: columns,
        setData: setData,
        data: data,
        columnOrder: columnOrder,
        columnFilters: columnFilters,
        sorting: sorting,
        grouping: grouping,
      }}
    >
      <div className=" w-full  overflow-hidden h-screen text-white">
        <TableUtilityBar />
        <CustomTable />
      </div>
    </TableContext.Provider>
  );
}
