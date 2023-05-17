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
    const socket = useSelector((state) => state?.socketWebData.socket);
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
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: rowCopy.id52148213343234567,
        updatedData: newRowPart,
        fieldType: columnDef.fieldType,
        fieldName: columnDef.fieldName,
        fieldId: columnDef.fieldId,
      };
      console.log(obj);
      socket.emit("updateData", obj, (response) => {
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
  const { selectedView } = useSelector((state) => state.views);
  const [columns, setColumns] = useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [selectedColorCondition, setSelectedColorCondition] = useState();
  const [columnOrder, setColumnOrder] = useState(
    //must start out with populated columnOrder so we can splice
    columns?.map((column) => column.id)
  );

  const [rowHeight, setRowHeight] = useState([
    {
      name: "small",
      isActive: true,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 fill-current'
          viewBox='0 96 960 960'
        >
          <path d='M161.899 260Q145 260 132.5 247.5T120 218q0-17 12.5-29.5t29.399-12.5h636.202Q815 176 827.5 188.5T840 218q0 17-12.5 29.5T798.101 260H161.899Zm0 716Q145 976 132.5 963.5T120 934q0-17 12.5-29.5t29.399-12.5h636.202Q815 892 827.5 904.5T840 934q0 17-12.5 29.5T798.101 976H161.899Zm0-238Q145 738 132.5 725.5T120 696q0-17 12.5-29.5t29.399-12.5h636.202Q815 654 827.5 666.5T840 696q0 17-12.5 29.5T798.101 738H161.899Zm0-240Q145 498 132.5 485.5T120 456q0-17 12.5-29.5t29.399-12.5h636.202Q815 414 827.5 426.5T840 456q0 17-12.5 29.5T798.101 498H161.899Z' />
        </svg>
      ),
      height: 30,
      numberOfLines: 1,
    },
    {
      name: "medium",
      isActive: false,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 fill-current'
          viewBox='0 96 960 960'
        >
          <path d='M161.899 300Q145 300 132.5 287.5T120 258q0-17 12.5-29.5t29.399-12.5h636.202Q815 216 827.5 228.5T840 258q0 17-12.5 29.5T798.101 300H161.899Zm0 636Q145 936 132.5 923.5T120 894q0-17 12.5-29.5t29.399-12.5h636.202Q815 852 827.5 864.5T840 894q0 17-12.5 29.5T798.101 936H161.899Zm0-318Q145 618 132.5 605.5T120 576q0-17 12.5-29.5t29.399-12.5h636.202Q815 534 827.5 546.5T840 576q0 17-12.5 29.5T798.101 618H161.899Z' />
        </svg>
      ),
      height: 46,
      // height: 56,
      numberOfLines: 2,
    },
    {
      name: "large",
      isActive: false,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 fill-current'
          viewBox='0 96 960 960'
        >
          <path d='M161.899 300Q145 300 132.5 287.5T120 258q0-17 12.5-29.5t29.399-12.5h636.202Q815 216 827.5 228.5T840 258q0 17-12.5 29.5T798.101 300H161.899Zm0 636Q145 936 132.5 923.5T120 894q0-17 12.5-29.5t29.399-12.5h636.202Q815 852 827.5 864.5T840 894q0 17-12.5 29.5T798.101 936H161.899Z' />
        </svg>
      ),
      height: 88,
      numberOfLines: 3,
    },
    {
      name: "Extra large",
      isActive: false,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 fill-current'
          viewBox='0 96 960 960'
        >
          <path d='M294 912v-72h72v72h-72Zm150 0v-72h72v72h-72Zm150 0v-72h72v72h-72Zm150-150v-72h72v72h-72Zm0-150v-72h72v72h-72Zm0-150v-72h72v72h-72ZM216 768q-29.7 0-50.85-21.15Q144 725.7 144 696V312q0-29.7 21.15-50.85Q186.3 240 216 240h384q29.7 0 50.85 21.15Q672 282.3 672 312v384q0 29.7-21.15 50.85Q629.7 768 600 768H216Zm0-72h384V312H216v384Zm0 0V312v384Zm528-384v-72q29.7 0 50.85 21.15Q816 282.3 816 312h-72Zm0 600v-72h72q0 30-21.15 51T744 912Zm-528 0q-29.7 0-50.85-21.15Q144 869.7 144 840h72v72Z' />
        </svg>
      ),
      height: 128,
      numberOfLines: 4,
    },
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

  // useEffect(() => {
  //   if (selectedView && Object.keys(selectedView?.model).length > 0) {
  //     console.log('model:', selectedView);
  //     table.setState(selectedView?.model);
  //   }
  //   console.log('model updated', table.options.state);
  // }, [selectedView?.model]);

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
        selectedColorCondition: selectedColorCondition,
        setSelectedColorCondition: setSelectedColorCondition,
      }}
    >
      <div className=' w-full  overflow-hidden h-screen text-white'>
        <TableUtilityBar />
        <CustomTable />
      </div>
    </TableContext.Provider>
  );
}
