import { TableContext } from '../tableComponents/TableComponents';
import React, { useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableUtilityRowHeight() {
  const { rowHeight, setRowHeight } = useContext(TableContext);

  const handleRowHeightChange = (ele) => {
    setRowHeight((prev) => {
      return prev.map((item) => {
        if (item.name === ele.name) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });
    });
  };

  return (
    <Popover className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg  cursor-pointer relative '>
      <Popover.Button className='flex items-center font-medium outline-none'>
        <div className='flex items-center font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 96 960 960'
            className='w-5 h-5 fill-current pr-1'>
            <path d='M756 852V728H204v124h552Zm0-208V508H204v136h552Zm0-220V300H204v124h552ZM204 936q-34.65 0-59.325-24.675Q120 886.65 120 852V300q0-34.65 24.675-59.325Q169.35 216 204 216h552q34.65 0 59.325 24.675Q840 265.35 840 300v552q0 34.65-24.675 59.325Q790.65 936 756 936H204Z' />
          </svg>
          Row Height
        </div>
      </Popover.Button>
      <Transition
        className='bg-white'
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel className='absolute top-10 left-0 z-50 bg-white w-[200px] p-2 rounded-md shadow-custom'>
          {rowHeight.map((ele) => {
            return (
              <div
                key={ele.name}
                onClick={() => handleRowHeightChange(ele)}
                className={`flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-black hover:bg-opacity-10 rounded-sm pl-2 ${
                  ele.isActive && 'text-purple-500'
                } `}>
                {ele.icon}
                <div className='capitalize'>{ele.name}</div>
              </div>
            );
          })}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
