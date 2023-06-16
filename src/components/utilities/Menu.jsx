import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu } from "../../store/features/menuSlice";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useDeleteTableRowMutation } from "../../store/services/alphaTruckingApi";

const Menu = () => {
  const dispatch = useDispatch();
  const { isOpen, position, row, deleteRow, selectedRow } = useSelector(
    (state) => state.menu
  );
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const [deleteRowApi, deleteRowResponse] = useDeleteTableRowMutation();
  // const { meta } = useSelector((state) => state.table);

  // console.log(deleteRow);

  // console.log(row);
  // const handleContextMenu = (event) => {
  //   event.preventDefault();
  //   console.log(event.clientX, event.clientY);
  //   dispatch(openMenu({ x: event.clientX, y: event.clientY }));
  // };

  const handleMenuItemClick = () => {
    dispatch(closeMenu());
    // Perform the desired action when a menu item is clicked
  };

  const ref = useRef(null);
  useClickAway(ref, () => {
    dispatch(closeMenu());
  });

  useEffect(() => {
    if (deleteRowResponse.isSuccess) {
      console.log(deleteRowResponse.data);
      console.log(selectedRow());
      deleteRow(row.original.recordId);
    }
  }, [deleteRowResponse.isSuccess]);

  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="absolute z-[1000] bg-white p-3.5 w-[240px] rounded-lg shadow-custom   text-[#4D4D4D]"
          style={{ top: position.y, left: position.x }}
        >
          <div
            onClick={() => {
              handleMenuItemClick();
            }}
            className={` cursor-not-allowed opacity-75 rounded-[4px] py-2 text-left px-4 flex items-center hover:bg-gray-100 `}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              shapeRendering="geometricprecision"
              className="w-4 h-4  text-lg font-light mr-4"
            >
              <path
                fill="currentColor"
                d="M8 2a.5.5 0 00-.354.146l-4.5 4.5a.5.5 0 00.708.708L7.5 3.707V13.5a.5.5 0 001 0V3.707l3.646 3.647a.5.5 0 10.707-.708l-4.5-4.5a.508.508 0 00-.014-.006A.5.5 0 008 2z"
              />
            </svg>
            Insert record above
          </div>
          <div
            onClick={() => {
              handleMenuItemClick();
            }}
            className={` cursor-not-allowed opacity-75 rounded-[4px] py-2 text-left px-4 flex items-center hover:bg-gray-100`}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              shapeRendering="geometricprecision"
              className="w-4 h-4  text-lg font-light mr-4"
            >
              <path
                fill="currentColor"
                d="M8 2a.5.5 0 00-.5.5v9.793L3.853 8.646a.5.5 0 00-.707.708l4.5 4.5a.5.5 0 00.708 0l4.5-4.5a.5.5 0 00-.707-.708L8.5 12.293V2.5A.5.5 0 008 2z"
              />
            </svg>
            Insert record below
          </div>
          <div className="h-[1px] w-[92%] bg-[#0000000d] my-2  mx-auto" />
          <div
            onClick={() => {
              handleMenuItemClick();
            }}
            className={` cursor-not-allowed opacity-75 rounded-[4px] py-2 text-left px-4 flex items-center hover:bg-gray-100`}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              className="w-4 h-4 text-lg font-light mr-4"
              shapeRendering="geometricprecision"
            >
              <path
                fill="currentColor"
                d="M2.5 5a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-8a.5.5 0 00-.5-.5h-8zM3 6h7v7H3V6zm2.5-4a.5.5 0 00-.5.5v3a.5.5 0 101 0V3h7v7h-2.5a.5.5 0 000 1h3a.5.5 0 00.5-.5v-8a.5.5 0 00-.5-.5h-8z"
              />
            </svg>
            Duplicate record
          </div>
          <div
            onClick={() => {
              handleMenuItemClick();
            }}
            className={` cursor-pointer rounded-[4px] py-2 text-left px-4 flex items-center hover:bg-gray-100`}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              className="w-4 h-4 text-lg font-light mr-4"
              shapeRendering="geometricprecision"
            >
              <path
                fill="currentColor"
                d="M10 2.5a.5.5 0 100 1h1.793L9.146 6.146a.5.5 0 00.708.708L12.5 4.207V6a.5.5 0 001 0V3a.714.714 0 00-.006-.015.5.5 0 00-.14-.339A.5.5 0 0013 2.5h-3zM6.5 9a.5.5 0 00-.354.146L3.5 11.793V10a.5.5 0 10-1 0v3a.5.5 0 00.5.5h3a.5.5 0 000-1H4.207l2.647-2.646A.5.5 0 006.5 9z"
              />
            </svg>
            Expand record
          </div>
          <div className="h-[1px] w-[92%] bg-[#0000000d] my-2  mx-auto" />
          <div
            className={`  cursor-pointer rounded-[4px] py-2 text-left px-4 flex items-center hover:bg-gray-100`}
            onClick={() => {
              handleMenuItemClick();
              deleteRowApi({
                baseId: selectedBaseId,
                data: {
                  tableId: selectedTableId,
                  record_ids: [row.original.recordId],
                },
              });
              // deleteRow(row.original.recordId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4  text-lg font-light mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete Record
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
