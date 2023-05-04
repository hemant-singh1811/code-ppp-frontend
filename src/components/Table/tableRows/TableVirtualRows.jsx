import React, { useContext, useEffect, useState } from 'react';
import { flexRender } from '@tanstack/react-table';
// import { useVirtual } from "react-virtual";
import { TableContext } from '../tableComponents/TableComponents';
import { useVirtualizer } from '@tanstack/react-virtual';
import CellByFieldType from './tableCells/CellByFieldType';
import CreateRow from './CreateRow';
import { useWindowSize } from 'react-use';

export default function TableVirtualRows({ tableContainerRef, rows }) {
  let { activeRowHeight, activeNumberOfLines, table } =
    useContext(TableContext);
  const { width, height } = useWindowSize();

  let shortHeight = 32;
  let mediumHeight = 56;
  let tallHeight = 88;
  let extraTallHeight = 128;

  activeRowHeight = extraTallHeight;

  let heightOverScan = ((height - 68) / activeRowHeight).toFixed();

  const columns = table.getAllColumns();
  const parentRef = React.useRef();

  let rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => activeRowHeight,
    overscan: heightOverScan,
  });

  let columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 10,
    overscan: 100,
  });

  console.log(heightOverScan);
  // useEffect(() => {
  // }, [activeRowHeight])

  // console.log(rowVirtualizer)

  // console.log(activeRowHeight)

  // let totalSize = undefined
  return (
    <>
      <div
        ref={parentRef}
        className='list text-black scrollbar-hidden h-[calc(100vh_-_100px)] overflow-x-visible z-[1] relative'
        // style={{ overflowY: 'auto' }}//do not remove overflow auto if you remove it table virtual row will break
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          background: '#f7f7f7',
        }}>
        <div
          className='tbody scrollbar-hidden mb-40'
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            // width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow, i) => {
            const row = rows[virtualRow?.index];
            // console.log(row);
            return (
              <React.Fragment key={virtualRow?.index || i}>
                {/* {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  return ( */}
                <div
                  // key={virtualColumn.index}
                  className={`tr z-0 bg-white  ${
                    row?.getIsSelected()
                      ? 'hover:bg-[#f1f6ff]'
                      : 'hover:bg-[#F8F8F8]'
                  } 
                   ${row?.getIsSelected() && 'bg-[#f1f6ff]'}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${columns[virtualRow?.index]}px`,
                    height: `${activeRowHeight}px`,
                    zIndex: rowVirtualizer.getVirtualItems().length - i,
                    transform: `translateY(${virtualRow?.start}px)`,
                    // height: `${rows[virtualRow.index]}px`,
                  }}>
                  {row?.getVisibleCells().map((cell, index) => {
                    // console.log(cell);
                    return (
                      <div
                        className={`td  webkitLineClamp${activeNumberOfLines} mx-auto my-auto text-center `}
                        key={cell.id}
                        {...{
                          style: {
                            width: cell.column.getSize(),
                            height: activeRowHeight,
                            background: cell.getIsGrouped()
                              ? '#0aff0082'
                              : cell.getIsAggregated()
                              ? '#ffa50078'
                              : cell.getIsPlaceholder()
                              ? '#ff000042'
                              : '',
                            borderLeftWidth:
                              cell.column.columnDef?.is_primary && 0,
                          },
                        }}>
                        {cell.getIsGrouped() ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <button
                              className='flex'
                              {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: {
                                  cursor: row.getCanExpand()
                                    ? 'pointer'
                                    : 'normal',
                                },
                              }}>
                              <div>{row.getIsExpanded() ? '👇' : '👉'} </div>
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
                            <CellByFieldType
                              cell={cell}
                              field_type={cell.column.columnDef.field_type}
                            />
                            {/* {console.log(cell.column.columnDef.field_type)} */}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
          <div
            className='border flex items-center w-[calc(100%_-_119px)]'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: `30px`,
              transform: `translateY(${rowVirtualizer.getTotalSize()}px)`,
              borderTopWidth: 0,
              background: '#fff',
              // width: `${columns[virtualRow.index]}px`,
              // zIndex: rowVirtualizer.getVirtualItems().length - i,
              // height: `${rows[virtualRow.index]}px`,
            }}>
            <CreateRow />
          </div>
        </div>
      </div>
      <div className='text-black'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
        perspiciatis explicabo quisquam ullam fuga rem sed a, dolores temporibus
        voluptate pariatur eveniet eaque. Sed accusamus cupiditate porro
        recusandae similique alias?
      </div>
    </>
  );
}
