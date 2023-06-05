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
        className="list transition-all text-black  select-none scrollbar-hidden h-[calc(100vh_-_100px)] overflow-x-visible z-[1] relative"
        // style={{ overflowY: 'auto' }}//do not remove overflow auto if you remove it table virtual row will break
        style={{
          overflowX: "auto",
          overflowY: "visible",
          background: "#f7f7f7",
        }}
      >
        <div
          className="tbody scrollbar-hidden select-none mb-40"
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
                  rowIndex={i}
                  row={row}
                  rowVirtualizer={rowVirtualizer}
                  columns={columns}
                  activeRowHeight={activeRowHeight}
                  initialArray={initialArray}
                  activeNumberOfLines={activeNumberOfLines}
                />
              );
            })}
          <div
            className="border flex items-center w-[calc(100%_-_119px)]"
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
      <div className="text-black bg-orange-200">
        There will be our status bar
      </div>
    </>
  );
}

function VirtualRow({
  rowIndex,
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

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      tabIndex={-1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      key={virtualRow?.index || rowIndex}
      data-index={virtualRow.index}
      ref={rowVirtualizer.measureElement}
      className={`row z-0 bg-white select-none ${
        row?.getIsSelected() ? "hover:bg-[#f1f6ff]" : "hover:bg-[#F8F8F8]"
      } ${row?.getIsSelected() && "bg-[#f1f6ff]"}`}
      style={{
        position: "absolute",
        // top: 0,
        // left: 0,
        width: `${columns[virtualRow?.index]}px`,
        height: `${activeRowHeight}px`,

        zIndex: isFocused && 1000,
        transform: `translateY(${virtualRow?.start}px)`,
      }}
    >
      {row?.getVisibleCells().map((cell, i) => {
        return (
          <TableCell
            cell={cell}
            activeRowHeight={activeRowHeight}
            row={row}
            key={cell.id}
            i={i}
            isHovered={isHovered}
            rowIndex={rowIndex}
            isFocused={isFocused}
          />
        );
      })}
    </div>
  );
}

const TableCell = React.memo(function TableCell({
  cell,
  activeRowHeight,
  row,
  isHovered,
  rowIndex,
}) {
  const [isFocused, setIsFocused] = useState(false);

  console.log(cell, row);
  return (
    <div
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
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
          zIndex: isFocused && 1000,
          borderLeftWidth: cell.column.columnDef?.primary && 0,
          boxShadow: isFocused && "0 0 0px 2px #166ee1",
          borderRadius: isFocused && "1px",
          // borderBottomWidth: isFocused && 0,
          // borderLeftWidth: isFocused && 0,
        },
      }}
    >
      {cell.getIsGrouped() ? (
        // If it's a grouped cell, add an expander and row count
        <>
          <button
            className="flex"
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
            rowIndex={rowIndex}
            cell={cell}
            row={row}
            fieldType={cell.column.columnDef.fieldType}
            hiddenInConditions={cell.column.columnDef.hiddenInConditions}
            isHovered={isHovered}
          />
        </>
      )}
    </div>
  );
});

// let columnVirtualizer = useVirtualizer({
//   horizontal: true,
//   count: columns.length,
//   getScrollElement: () => parentRef.current,
//   estimateSize: (i) => 10,
//   overscan: 100,
// });
