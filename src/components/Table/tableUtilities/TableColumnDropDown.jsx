import React, { useContext, useEffect } from "react";
import { useDeleteTableColumnMutation } from "../../../store/services/alphaTruckingApi";
import { TableContext } from "../tableComponents/TableComponents";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function TableColumnDropDown({
  columnDropdownRef,
  columnDef,
  open,
  close,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const { columns, setColumns } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );

  const [addDeleteApi, responseDeleteColumn] = useDeleteTableColumnMutation();

  async function deleteColumn() {
    addDeleteApi({
      baseId: selectedBaseId,
      data: {
        table_id: selectedTableId,
        field_id: columnDef?.field_id,
      },
    });
  }

  useEffect(() => {
    if (responseDeleteColumn.data) {
      console.log("Delete Column:", responseDeleteColumn.data);
      setColumns((prev) =>
        prev.filter((item) => item.field_id !== columnDef?.field_id)
      );
    }
  }, [responseDeleteColumn.isSuccess]);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="border-none outline-none h-full mr-2"
      >
        <div className="text-gray-400 -mr-2 cursor-pointer hover:text-blue-800  flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block my-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      <Transition
        show={isMenuOpen}
        className="bg-white"
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="text-black absolute top-[28px] z-20 w-56 rounded-md left-0 p-2 border-gray-400 border-[.5px] shadow-md flex flex-col bg-white">
          {/* <div className="hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-lg font-light mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Edit Field
          </div> */}
          <div
            className="hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center "
            onClick={() => {
              deleteColumn();
              setIsMenuOpen(!isMenuOpen);
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
            Delete Field
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
