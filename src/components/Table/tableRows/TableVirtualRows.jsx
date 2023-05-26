import React, { useContext, useEffect, useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { TableContext } from "../tableComponents/TableComponents";
import { useVirtualizer } from "@tanstack/react-virtual";
import CellByFieldType from "./tableCells/CellByFieldType";
import CreateRow from "./CreateRow";
import { useWindowSize } from "react-use";

export default function TableVirtualRows({ tableContainerRef, rows }) {
  let { activeRowHeight, activeNumberOfLines, table } =
    useContext(TableContext);
  const { width, height } = useWindowSize();
  let heightOverScan = ((height - 68) / activeRowHeight).toFixed();
  const columns = table.getAllColumns();
  const parentRef = React.useRef();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => activeRowHeight,
    overscan: 0,
  });

  return (
    <>
      <div
        ref={parentRef}
        className='list transition-all text-black  select-none scrollbar-hidden h-[calc(100vh_-_100px)] overflow-x-visible z-[1] relative'
        // style={{ overflowY: 'auto' }}//do not remove overflow auto if you remove it table virtual row will break
        style={{
          overflowX: "auto",
          overflowY: "visible",
          background: "#f7f7f7",
        }}
      >
        <div
          className='tbody scrollbar-hidden select-none mb-40'
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer
            .getVirtualItems()
            .map((virtualRow, i, initialArray) => {
              const row = rows[virtualRow?.index];
              return (
                <VirtualRow
                  key={i}
                  virtualRow={virtualRow}
                  i={i}
                  row={row}
                  rowVirtualizer={rowVirtualizer}
                  columns={columns}
                  activeRowHeight={activeRowHeight}
                  initialArray={initialArray}
                  activeNumberOfLines={activeNumberOfLines}
                />
                // VirtualRow(
                //   i,
                //   rowVirtualizer,
                //   virtualRow,
                //   row,
                //   columns,
                //   activeRowHeight,
                //   initialArray
                // )
              );
            })}
          <div
            className='border flex items-center w-[calc(100%_-_119px)]'
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: `30px`,
              transform: `translateY(${rowVirtualizer.getTotalSize()}px)`,
              borderTopWidth: 0,
              background: "#fff",
              // width: `${columns[virtualRow.index]}px`,
              // zIndex: rowVirtualizer.getVirtualItems().length - i,
              // height: `${rows[virtualRow.index]}px`,
            }}
          >
            <CreateRow />
          </div>
        </div>
      </div>
      <div className='text-black bg-orange-200'>
        There will be our status bar
      </div>
    </>
  );
}

function VirtualRow({
  i,
  rowVirtualizer,
  virtualRow,
  row,
  columns,
  activeRowHeight,
  initialArray,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={virtualRow?.index || i}
      data-index={virtualRow.index}
      ref={rowVirtualizer.measureElement}
      tabIndex={0}
      className={`row z-0 bg-white select-none ${
        row?.getIsSelected() ? "hover:bg-[#f1f6ff]" : "hover:bg-[#F8F8F8]"
      } ${row?.getIsSelected() && "bg-[#f1f6ff]"}`}
      style={{
        position: "absolute",
        // top: 0,
        // left: 0,
        width: `${columns[virtualRow?.index]}px`,
        height: `${activeRowHeight}px`,
        zIndex: initialArray.length - i,
        transform: `translateY(${virtualRow?.start}px)`,
      }}
    >
      {row?.getVisibleCells().map((cell, i) => {
        return (
          // <TableData
          //   activeNumberOfLines={activeNumberOfLines}
          //   cell={cell}
          //   activeRowHeight={activeRowHeight}
          //   row={row}
          //   key={cell.id}
          //   i={i}
          // />
          TableData(cell, activeRowHeight, row, isHovered)
        );
      })}
    </div>
  );
}

function TableData(cell, activeRowHeight, row, isHovered) {
  return (
    <div
      tabIndex={0}
      className={`cell mx-auto my-auto text-center select-none  `}
      key={cell.id}
      {...{
        style: {
          width: cell.column.getSize(),
          height: activeRowHeight,
          background: cell.getIsGrouped()
            ? "#0aff0082"
            : cell.getIsAggregated()
            ? "#ffa50078"
            : cell.getIsPlaceholder()
            ? "#ff000042"
            : "",
          borderLeftWidth: cell.column.columnDef?.primary && 0,
        },
      }}
    >
      {cell.getIsGrouped() ? (
        // If it's a grouped cell, add an expander and row count
        <>
          <button
            className='flex'
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: {
                cursor: row.getCanExpand() ? "pointer" : "normal",
              },
            }}
          >
            <div>{row.getIsExpanded() ? "👇" : "👉"} </div>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}(
            {row.subRows.length})
          </button>
        </>
      ) : cell.getIsAggregated() ? (
        // If the cell is aggregated, use the Aggregated
        // renderer for cell
        // flexRender(
        //   cell.column.columnDef.aggregatedCell ??
        //     cell.column.columnDef.cell,
        //   cell.getContext()
        // )
        <CellByFieldType
          row={row}
          cell={cell}
          fieldType={cell.column.columnDef.fieldType}
        />
      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
        // Otherwise, just render the regular cell
        <>
          <CellByFieldType
            cell={cell}
            row={row}
            fieldType={cell.column.columnDef.fieldType}
            hiddenInConditions={cell.column.columnDef.hiddenInConditions}
            isHovered={isHovered}
          />
          {/* {console.log(cell.column.columnDef.fieldType)} */}
        </>
      )}
    </div>
  );
}

// let columnVirtualizer = useVirtualizer({
//   horizontal: true,
//   count: columns.length,
//   getScrollElement: () => parentRef.current,
//   estimateSize: (i) => 10,
//   overscan: 100,
// });
