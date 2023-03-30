import React, { useContext, useEffect, useState } from "react";
import { flexRender } from "@tanstack/react-table";
// import { useVirtual } from "react-virtual";
import { TableContext } from "../tableComponents/TableComponents";
import ImageReader from "../tableUtilities/ImageReader";
import { useVirtualizer } from '@tanstack/react-virtual'


export default function TableVirtualRows({ tableContainerRef, rows }) {
  const { activeRowHeight, activeNumberOfLines, table } = useContext(TableContext);

  const columns = table.getAllColumns();
  const parentRef = React.useRef()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => activeRowHeight,
    overscan: 10,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 150,
    overscan: 100,
  })

  return (
    <>
      <div
        ref={parentRef}
        className="list text-black scrollbar-hidden h-[calc(100vh_-_72px)]"
        style={{
          // height: `100vh`,
          overflow: 'auto',
        }}
      >
        <div
          className='tbody scrollbar-hidden'
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            // width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <React.Fragment key={virtualRow.index}>
                {/* {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  return ( */}
                <div
                  // key={virtualColumn.index}
                  className='tr z-0'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // width: `${columns[virtualRow.index]}px`,
                    height: `${rows[virtualRow.index]}px`,
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
                {/* )
                })
                } */}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )

  // return (
  //   table.getRowModel().rows.map(row => {
  //     return <div
  //       {...{
  //         key: row.id,
  //         className: "tr text-black",
  //         style: {
  //           height: activeRowHeight,
  //         },
  //       }}
  //     >
  //       {/* {console.log(table.getRowModel())} */}
  //       {row.getVisibleCells().map((cell, index) => {
  //         return (
  //           <div
  //             className={`td webkitLineClamp${activeNumberOfLines} mx-auto my-auto text-center `}
  //             key={cell.id}
  //             {...{
  //               style: {
  //                 width: cell.column.getSize(),
  //                 height: activeRowHeight,
  //                 background: cell.getIsGrouped()
  //                   ? "#0aff0082"
  //                   : cell.getIsAggregated()
  //                     ? "#ffa50078"
  //                     : cell.getIsPlaceholder()
  //                       ? "#ff000042"
  //                       : "",
  //               },
  //             }}
  //           >
  //             {cell.getIsGrouped() ? (
  //               // If it's a grouped cell, add an expander and row count
  //               <>
  //                 <button
  //                   className="flex"
  //                   {...{
  //                     onClick: row.getToggleExpandedHandler(),
  //                     style: {
  //                       cursor: row.getCanExpand() ? "pointer" : "normal",
  //                     },
  //                   }}
  //                 >
  //                   <div>{row.getIsExpanded() ? "👇" : "👉"} </div>
  //                   {flexRender(
  //                     cell.column.columnDef.cell,
  //                     cell.getContext()
  //                   )}
  //                   ({row.subRows.length})
  //                 </button>
  //               </>
  //             ) : cell.getIsAggregated() ? (
  //               // If the cell is aggregated, use the Aggregated
  //               // renderer for cell
  //               flexRender(
  //                 cell.column.columnDef.aggregatedCell ??
  //                 cell.column.columnDef.cell,
  //                 cell.getContext()
  //               )
  //             ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
  //               // Otherwise, just render the regular cell
  //               <>
  //                 {cell.column.columnDef.field_type ===
  //                   "multipleAttachments" ? (
  //                   <ImageReader data={cell?.getValue()} />
  //                 ) : (
  //                   flexRender(
  //                     cell.column.columnDef.cell,
  //                     cell.getContext()
  //                   )
  //                 )}
  //               </>
  //             )}
  //           </div>
  //         )
  //       })}
  //     </div>
  //   }
  //   ))

  // return (
  //   <div className="tbody text-black">
  //     {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }}></div>}
  //     {virtualRows.map((virtualRow) => {
  //       const row = rows[virtualRow.index];
  //       return (
  //         <div
  //           {...{
  //             key: row.id,
  //             className: "tr",
  //             style: {
  //               height: activeRowHeight,
  //             },
  //           }}
  //         >
  //           {/* {console.log(table.getRowModel())} */}
  //           {row.getVisibleCells().map((cell, index) => {
  //             return (
  //               <div
  //                 className={`td webkitLineClamp${activeNumberOfLines} mx-auto my-auto text-center `}
  //                 key={cell.id}
  //                 {...{
  //                   style: {
  //                     width: cell.column.getSize(),
  //                     height: activeRowHeight,
  //                     background: cell.getIsGrouped()
  //                       ? "#0aff0082"
  //                       : cell.getIsAggregated()
  //                         ? "#ffa50078"
  //                         : cell.getIsPlaceholder()
  //                           ? "#ff000042"
  //                           : "",
  //                   },
  //                 }}
  //               >
  //                 {cell.getIsGrouped() ? (
  //                   // If it's a grouped cell, add an expander and row count
  //                   <>
  //                     <button
  //                       className="flex"
  //                       {...{
  //                         onClick: row.getToggleExpandedHandler(),
  //                         style: {
  //                           cursor: row.getCanExpand() ? "pointer" : "normal",
  //                         },
  //                       }}
  //                     >
  //                       <div>{row.getIsExpanded() ? "👇" : "👉"} </div>
  //                       {flexRender(
  //                         cell.column.columnDef.cell,
  //                         cell.getContext()
  //                       )}
  //                       ({row.subRows.length})
  //                     </button>
  //                   </>
  //                 ) : cell.getIsAggregated() ? (
  //                   // If the cell is aggregated, use the Aggregated
  //                   // renderer for cell
  //                   flexRender(
  //                     cell.column.columnDef.aggregatedCell ??
  //                     cell.column.columnDef.cell,
  //                     cell.getContext()
  //                   )
  //                 ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
  //                   // Otherwise, just render the regular cell
  //                   <>
  //                     {cell.column.columnDef.field_type ===
  //                       "multipleAttachments" ? (
  //                       <ImageReader data={cell?.getValue()} />
  //                     ) : (
  //                       flexRender(
  //                         cell.column.columnDef.cell,
  //                         cell.getContext()
  //                       )
  //                     )}
  //                   </>
  //                 )}
  //               </div>
  //             )
  //           })}
  //         </div>
  //       );
  //     })}
  //     {
  //       paddingBottom > 0 && (
  //         <div style={{ height: `${paddingBottom}px` }}></div>
  //       )
  //     }
  //     <div className="h-20" />
  //   </div >
  // );
}


