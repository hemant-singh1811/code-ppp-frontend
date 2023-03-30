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
import AddRowTable from "../tableUtilities/AddRowTable";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
const socket = io(import.meta.env.VITE_SERVER_URL + "webdata")


export const TableContext = React.createContext();

// Give our default column cell renderer editing superpowers!
const defaultColumn = {
  cell: ({ getValue, row: { original, index }, column: { id }, table, row }) => {
    const initialValue = getValue()
    const location = useLocation()

    // console.log(row._valuesCache)
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)
    // console.log(id)
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = (e) => {
      table.options.meta?.updateData(index, id, value)
      let rowCopy = original;
      rowCopy[id] = e.target.value;
      let obj = {
        base_id: '',
        table_id: location.pathname.split('/')[2],
        record_id: rowCopy.id52148213343234567,
        updated_data: rowCopy
      }
      console.log(rowCopy)
      if (rowCopy.id !== original.id) {
        socket.emit("updatedata", obj, (response) => {
          console.log("res : ", response);
        });
      }
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    // console.log(location.pathname.split('/')[2])
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
    )
  }
}

export default function TableComponents({
  defaultColumns,
  data,
  toggle,
  setData,
  tableConditions,
}) {
  const [columns, setColumns] = useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = useState(
    tableConditions?.model?.globalFilter || ""
  );
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [rowHeight, setRowHeight] = useState([
    {
      name: "small",
      isActive: true,
      icon: "density_small",
      height: 30,
      numberOfLines: 1,
    },
    {
      name: "medium",
      isActive: false,
      icon: "density_medium",
      height: 50,
      numberOfLines: 2,
    },
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
  const [grouping, setGrouping] = useState([]);
  const [viewsToggle, setViewsToggle] = useState(false);
  let { activeRowHeight, activeNumberOfLines } = handleRowHeight(rowHeight);
  const [columnOrder, setColumnOrder] = useState(
    //must start out with populated columnOrder so we can splice
    tableConditions?.model?.columnOrder || columns?.map((column) => column.id)
  );
  const [columnPinning, setColumnPinning] = useState({});
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    columnResizeMode: "onChange",
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

    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

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
        viewsToggle: viewsToggle,
        setViewsToggle: setViewsToggle,
        setColumns: setColumns,
        columns: columns,
        setData: setData,
        data: data,
      }}
    >
      <div className=" w-full  overflow-hidden h-screen text-white">
        <TableUtilityBar />
        <CustomTable />
        <AddRowTable />
      </div>
    </TableContext.Provider>
  );
}

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
