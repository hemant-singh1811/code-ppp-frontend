import React, { useContext, useRef, useState } from "react";
import TableVirtualRows from "../tableRows/TableVirtualRows";
import { useDrag, useDrop } from "react-dnd";
import { flexRender } from "@tanstack/react-table";
import { TableContext } from "./TableComponents";
import { ResizableSidebar } from "../tableUtilityBar/ResizableSidebar";
import TableColumnAdd from "../tableUtilities/TableColumnAdd";
import TableColumnDropDown from "../tableUtilities/TableColumnDropDown";

const DraggableColumnHeader = ({ header, table, index }) => {
  const { setColumnOrder } = table;
  const { columnOrder } = table.options.state;
  const { column } = header;
  const columnDropdownRef = React.useRef();
  // const divRef = useRef(null);

  // const handleMouseDown = () => {
  //   divRef.current.style.cursor = "grabbing";
  // };

  // const handleMouseUp = () => {
  //   divRef.current.style.cursor = "grab";
  // };

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });


  return (
    <div
      // onDragCapture={handleMouseDown}
      // onDropCapture={handleMouseUp}
      className={`th bg-[#f5f5f5] relative ${index === 0 && "fixed-column "}`}
      {...{
        key: header.id,
        style: {
          width: header.getSize(),
        },
      }}
      ref={(el) => {
        previewRef(el);
        dropRef(el);
        // divRef;
      }}
      colSpan={header.colSpan}
    >
      <div
        ref={dragRef}
        className="capitalize text-lg font-normal px-2  flex justify-between item"
      >
        <div className="truncate">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>

        <TableColumnDropDown columnDropdownRef={columnDropdownRef} columnDef={header?.column?.columnDef} />


      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizerHeader ${header.column.getIsResizing() ? "isResizingHeader" : ""
            }`,
        }}
      />
    </div>
  );
};
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  // console.log(columnOrder, draggedColumnId)
  // debugger
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

export default function CustomTable() {
  const { toggle, table, viewsToggle } = useContext(TableContext);
  const tableContainerRef = React.useRef(null);
  const { rows } = table.getRowModel();
  return (
    <div className="grid grid-cols-[auto_1fr] gri">
      {viewsToggle && <ResizableSidebar />}
      <div
        className={`overflow-scroll scrollbar-hidden pr-64 
       ${toggle ? "w-[calc(100vw_-_80px)]" : `w-[calc(100vw_-_220px)] `}
        `}
      >
        <div
          ref={tableContainerRef}
          {...{
            style: {
              width: table.getTotalSize(),
            },
          }}
          className={`divTable scrollbar-hidden`}
        >
          <div className="thead bg-[#f5f5f5] text-[#333333]">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="tr">
                {headerGroup.headers.map((header, index) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                    index={index}
                  />
                ))}
                <TableColumnAdd />
              </div>
            ))}
          </div>
          <TableVirtualRows tableContainerRef={tableContainerRef} rows={rows} />
        </div>
      </div>
    </div>
  );
}
