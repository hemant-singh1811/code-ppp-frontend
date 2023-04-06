import React, { useContext, useEffect, useState } from "react";
import { flexRender } from "@tanstack/react-table";
// import { useVirtual } from "react-virtual";
import { TableContext } from "../tableComponents/TableComponents";
import ImageReader from "../tableUtilities/ImageReader";
import { useVirtualizer } from "@tanstack/react-virtual";
import AwesomeImageReader from "../tableUtilities/AwesomeImageReader";
import SingleSelectWithAddOption from "./SingleSelectWithAddOption";
import MultiselectWithAddOption from "./MultiselectWithAddOption";

export default function TableVirtualRows({ tableContainerRef, rows }) {
  const { activeRowHeight, activeNumberOfLines, table } =
    useContext(TableContext);

  const columns = table.getAllColumns();
  const parentRef = React.useRef();

  let rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => activeRowHeight,
    overscan: 10,
  });

  let columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 150,
    overscan: 100,
  });

  // useEffect(() => {
  // }, [activeRowHeight])

  // console.log(rowVirtualizer)

  // console.log(activeRowHeight)

  return (
    <>
      <div
        ref={parentRef}
        className="list text-black scrollbar-hidden h-[calc(100vh_-_72px)] overflow-x-visible"
        // style={{ overflowY: 'auto' }}//do not remove overflow auto if you remove it table virtual row will break
        style={{
          overflowX: "auto",
          overflowY: "visible",
        }}
      >
        <div
          className="tbody scrollbar-hidden"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            // width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow, i) => {
            const row = rows[virtualRow.index];
            return (
              <React.Fragment key={virtualRow.index}>
                {/* {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  return ( */}
                <div
                  // key={virtualColumn.index}
                  className="tr z-0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${columns[virtualRow.index]}px`,
                    height: `${activeRowHeight}px`,
                    zIndex: rowVirtualizer.getVirtualItems().length - i,
                    // height: `${rows[virtualRow.index]}px`,
                    transform: ` translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <div
                        className={`td webkitLineClamp${activeNumberOfLines} mx-auto my-auto text-center `}
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
                                  cursor: row.getCanExpand()
                                    ? "pointer"
                                    : "normal",
                                },
                              }}
                            >
                              <div>{row.getIsExpanded() ? "👇" : "👉"} </div>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                              ({row.subRows.length})
                            </button>
                          </>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          flexRender(
                            cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          <>
                            {/* {console.log(cell.column.columnDef.field_type)} */}

                            {cell.column.columnDef.field_type ===
                              "multipleAttachments" ? (
                              // <></>
                              <ImageReader data={cell?.getValue()} />
                            ) : cell.column.columnDef.field_type ===
                              "singleSelect" ? (

                              <SingleSelectWithAddOption columnData={cell.column.columnDef} cell={cell} rowData={cell?.getValue()} />

                            ) : cell.column.columnDef.field_type ===
                              "multipleSelects" ? (<MultiselectWithAddOption columnData={cell.column.columnDef} cell={cell} rowData={cell?.getValue()} />) : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* )
                })
                } */}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
