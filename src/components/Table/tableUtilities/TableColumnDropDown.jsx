import React, { useContext, useEffect } from 'react';
import { useDeleteTableColumnMutation } from '../../../store/services/alphaTruckingApi';
import { TableContext } from '../tableComponents/TableComponents';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableColumnDropDown({
  columnDropdownRef,
  columnDef,
  open,
  close,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const { columns, setColumns } = useContext(TableContext);

  const [addDeleteApi, responseDeleteColumn] = useDeleteTableColumnMutation();

  async function deleteColumn() {
    addDeleteApi({
      tableId: location.pathname.split('/')[2],
      data: {
        field_id: columnDef?.field_id,
      },
    });
  }

  useEffect(() => {
    if (responseDeleteColumn.data) {
      console.log('Delete Column:', responseDeleteColumn.data);
      setColumns((prev) =>
        prev.filter((item) => item.field_id !== columnDef?.field_id)
      );
    }
  }, [responseDeleteColumn.isSuccess]);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='border-none outline-none h-full mr-2'>
        <div className='text-gray-400 -mr-2 cursor-pointer hover:text-blue-800  flex'>
          <span className='material-symbols-rounded font-light inline-block my-auto'>
            expand_more
          </span>
        </div>
      </button>
      <Transition
        show={isMenuOpen}
        className='bg-white'
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel className='text-black absolute top-[28px] z-20 w-56 rounded-md left-0 p-2 border-gray-400 border-[.5px] shadow-md flex flex-col bg-white'>
          <div className='hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center '>
            <span className='material-symbols-rounded text-lg font-light mr-4'>
              edit
            </span>
            Edit Field
          </div>
          <div
            className='hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center '
            onClick={() => {
              deleteColumn();
              setIsMenuOpen(!isMenuOpen);
            }}>
            <span className='material-symbols-rounded text-lg font-light mr-4'>
              delete
            </span>
            Delete Field
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
