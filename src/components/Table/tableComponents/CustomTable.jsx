import React, { useContext, useRef, useState } from "react";
import TableVirtualRows from "../tableRows/TableVirtualRows";
import { useDrag, useDrop } from "react-dnd";
import { flexRender } from "@tanstack/react-table";
import { TableContext } from "./TableComponents";
import { ResizableSidebar } from "../tableUtilityBar/ResizableSidebar";
import TableColumnAdd from "../tableUtilities/TableColumnAdd";
import TableColumnDropDown from "../tableUtilities/TableColumnDropDown";
import AddRowTable from "../tableUtilities/AddRowTable";
import { useGetSavedViewQuery } from "../../../store/services/alphaTruckingApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleUpdateViews } from "../../../store/features/viewsSlice";

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
      className={`th  bg-[#f5f5f5] relative ${index === 0 && "fixed-column "}`}
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

        <TableColumnDropDown
          columnDropdownRef={columnDropdownRef}
          columnDef={header?.column?.columnDef}
        />
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
  const columnOrderUpdated = Object.assign([], columnOrder);
  // debugger
  columnOrderUpdated.splice(
    columnOrderUpdated.indexOf(targetColumnId),
    0,
    columnOrderUpdated.splice(columnOrderUpdated.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrderUpdated];
};

export default function CustomTable() {
  const { selectedTableId } = useSelector((state) => state.globalState);
  const { data, error, isFetching, isSuccess } = useGetSavedViewQuery({
    data: { table_id: selectedTableId },
  });
  const { toggle, table, viewsToggle } = useContext(TableContext);
  const tableContainerRef = React.useRef(null);
  const { rows } = table.getRowModel();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      data?.personalview?.map((ele, i) => {
        if (i === 0) {
          dispatch(
            handleUpdateViews({
              name: ele?.metadata?.name,
              id: ele?.metadata?.views_id,
              model: ele?.model,
            })
          );
        }
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex overflow-hidden">
      {viewsToggle && (
        <ResizableSidebar
          data={data}
          error={error}
          isFetching={isFetching}
          isSuccess={isSuccess}
        />
      )}
      <div
        className={`overflow-scroll scrollbar-hidden 
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
          <div className="thead bg-[#f5f5f5] text-[#333333] relative z-10" >
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
                <TableColumnAdd headers={headerGroup.headers} />
              </div>
            ))}
          </div>
          <TableVirtualRows tableContainerRef={tableContainerRef} rows={rows} />
        </div>
        <AddRowTable />
      </div>
    </div>
  );
}
