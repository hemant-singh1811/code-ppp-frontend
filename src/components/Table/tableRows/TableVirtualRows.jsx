import React, { useContext, useEffect, useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { TableContext } from "../tableComponents/TableComponents";
import ImageReader from "../tableUtilities/ImageReader";




export default function TableVirtualRows({ tableContainerRef, rows }) {
  // const [onDoubleClick, setonDoubleClick] = useState(false)
  const { activeRowHeight, activeNumberOfLines, table } = useContext(TableContext);
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 50,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className="tbody text-black">
      {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }}></div>}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <div
            {...{
              key: row.id,
              className: "tr",
              style: {
                height: activeRowHeight,
              },
            }}
            onChange={() => {
              // row.getVisibleCells().map((cell, index) => {
              //   console.log(cell.getValue(cell.id))
              // })
            }}
          >
            {/* {console.log(table.getRowModel())} */}
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
                            cursor: row.getCanExpand() ? "pointer" : "normal",
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

                      {cell.column.columnDef.field_type ===
                        "multipleAttachments" ? (
                        <ImageReader data={cell?.getValue()} />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        );
      })}
      {
        paddingBottom > 0 && (
          <div style={{ height: `${paddingBottom}px` }}></div>
        )
      }
      <div className="h-20" />
    </div >
  );
}
