import React, { useContext, useRef, useState } from "react";
import TableVirtualRows from "../tableRows/TableVirtualRows";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { flexRender } from "@tanstack/react-table";
import { TableContext } from "./TableComponents";
import { ResizableSidebar } from "../tableUtilityBar/ResizableSidebar";
import TableColumnAdd from "../tableUtilities/TableColumnAdd";
import TableColumnDropDown from "../tableUtilities/TableColumnDropDown";
import AddRowTable from "../tableUtilities/AddRowTable";
import { useSelector } from "react-redux";
import { Popover } from "@headlessui/react";
import { useClickAway } from "react-use";
import { HTML5Backend } from "react-dnd-html5-backend";
import getSvg from "../tableUtilities/getSvg";

const fieldName = (dataType) => {
  switch (dataType) {
    case "linkedRecords":
      return "Multiple Record Links";
    case "singleLineText":
      return "Single Line Text";
    case "multilineText":
      return "Multiline Text";
    case "attachments":
      return "Multiple Attachments";
    case "checkbox":
      return "Checkbox";
    case "multipleSelect":
      return "Multiple Selects";
    case "singleSelect":
      return "Single Select";
    case "phoneNumber":
      return "Phone Number";
    case "email":
      return "Email";
    case "url":
      return "Url";
    case "createdTime":
      return "Created Time";
    case "lastModifiedTime":
      return "Last Modified Time";
    case "createdBy":
      return "Created By";
    case "lastModifiedBy":
      return "Last Modified By";
    case "autoNumber":
      return "Auto Number";
    case "button":
      return "Button";
    case "date":
      return "Date";
    default:
      return `${dataType}: UnSupported Field Type ⚠️`;
  }
};

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

  const divRef = useRef(null);

  const handleMouseOver = () => {
    divRef.current.style.display = "block";
    // divRef.current.style.opacity = 100;
  };

  const handleMouseLeave = () => {
    divRef.current.style.display = "none";
    // divRef.current.style.opacity = 0;
  };

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonRef = useRef(null);

  useClickAway(buttonRef, () => {
    setIsMenuOpen(false);
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsMenuOpen(true);
  };
  // console.log(column);
  return (
    <Popover className='' ref={buttonRef}>
      {({ open, close }) => (
        <div
          onContextMenu={handleContextMenu}
          className={`th  bg-[#f5f5f5] relative ${
            index === 0 && "fixed-column "
          } relative`}
          {...{
            key: header.id,
            style: {
              width: header.getSize(),
              boxShadow: column.columnDef?.hiddenInConditions && "none",
              height: 32,
            },
          }}
          ref={(el) => {
            previewRef(el);
            if (!column?.columnDef?.primary) dropRef(el);
            // divRef;
          }}
          colSpan={header.colSpan}
        >
          <div
            ref={!column?.columnDef?.primary ? dragRef : null}
            className='capitalize text-lg font-normal px-2  flex justify-between item items-center h-full'
          >
            <div
              className={`flex items-center ${
                index === 0 ? "w-full" : " w-[calc(100%_-_20px)]"
              }`}
            >
              {index !== 0 && (
                <div
                  className='h-full min-w-[20px]'
                  onMouseEnter={() =>
                    handleMouseOver(column.columnDef.fieldType)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(column.columnDef.fieldType)
                  }
                >
                  {getSvg(column.columnDef.fieldType)}
                </div>
              )}
              <div
                className={`truncate w-full text-left ${index !== 0 && "ml-1"}`}
              >
                {/* {console.log(header.column.columnDef)} */}
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.fieldName,
                      header.getContext()
                    )}
              </div>
            </div>
            {index !== 0 && (
              <div
                ref={divRef}
                className='absolute top-9 bg-white rounded-md px-2 border-2 hidden min-w-max'
              >
                {fieldName(column.columnDef.fieldType)}
              </div>
            )}

            {index !== 0 && (
              <TableColumnDropDown
                open={open}
                close={close}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                columnDropdownRef={columnDropdownRef}
                columnDef={header?.column?.columnDef}
              />
            )}
          </div>
          {index !== 0 && (
            <div
              {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
              }}
              className=' absolute z-10 w-4 h-full top-0 -right-2 resize-container flex justify-center items-center'
            >
              <div
                {...{
                  className: `resizerHeader ${
                    header.column.getIsResizing() ? "isResizingHeader" : ""
                  }`,
                }}
              />
            </div>
          )}
        </div>
      )}
    </Popover>
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
  const { toggle, table } = useContext(TableContext);
  const { isViewsOpen } = useSelector((state) => state.globalState);
  const tableContainerRef = React.useRef(null);
  const { rows } = table.getRowModel();
  return (
    <div className='flex overflow-hidden'>
      {isViewsOpen && <ResizableSidebar />}
      <DndProvider backend={HTML5Backend}>
        <div
          id='custom-scrollbar'
          className={`overflow-auto overflow-y-hidden bg-[#f7f7f7] 
       ${
         toggle
           ? isViewsOpen
             ? "w-[calc(100vw_-_330px)]"
             : "w-[calc(100vw_-_80px)]"
           : isViewsOpen
           ? `w-[calc(100vw_-_495px)]`
           : `w-[calc(100vw_-_245px)]`
       }
        `}
        >
          <div
            ref={tableContainerRef}
            {...{
              style: {
                width: table.getTotalSize() + 120,
              },
            }}
            className={`divTable `}
          >
            <div className='thead bg-[#f5f5f5] text-[#333333] relative z-[2]'>
              {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className='row'>
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
            <TableVirtualRows
              tableContainerRef={tableContainerRef}
              rows={rows}
            />
          </div>
          {/* <AddRowTable /> */}
        </div>
      </DndProvider>
    </div>
  );
}
