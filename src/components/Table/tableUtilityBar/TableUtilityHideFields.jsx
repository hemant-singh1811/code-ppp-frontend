import React, { useState } from 'react';
import Switch from '../../utilities/Switch';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableUtilityHideFields({ table }) {
  const [searchInput, setSearchInput] = useState('');
  return (
    <Popover className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg  cursor-pointer relative '>
      {({ open, close }) => (
        <>
          <Popover.Button className='flex items-center font-medium outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5 pr-1 '>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
            Hide Fields
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
            <Popover.Panel className='absolute top-10 left-0 z-[3] bg-white w-[300px]  p-2 rounded-md max-h-96 overflow-y-scroll border-[#c8c8c8] border-2'>
              <div className='flex items-center relative mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 absolute text-[20px] ml-4 text-[rgb(68, 68, 68)]  font-extralight'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>

                <input
                  type='text'
                  className=' focus:outline-none focus:border-blue-500 border-transparent border-1 border-[#e3d7d7] mx-2  transition-colors w-full p-2 px-4 pl-10 placeholder:text-[rgb(68, 68, 68)]'
                  placeholder='Find a Columns'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <label className='flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-black hover:bg-opacity-10 rounded-sm pl-2'>
                <Switch
                  isOn={table.getIsAllColumnsVisible()}
                  onColor='#1ec933'
                  handleToggle={table.getToggleAllColumnsVisibilityHandler()}
                  size='small'
                />
                <div>Toggle All</div>
              </label>

              {table
                .getAllLeafColumns()
                .filter((column) =>
                  column.id
                    .toLowerCase()
                    .includes(searchInput.toLowerCase().trim())
                )
                .map((column, i) => {
                  // if (i == 0 || i == 1) {
                  //   return;
                  // }
                  return (
                    <label
                      key={i}
                      className='flex items-center text-base gap-4 p-1 hover:bg-black hover:bg-opacity-10 rounded-sm pl-2 cursor-pointer w-full'>
                      <Switch
                        isOn={column.getIsVisible()}
                        onColor='#1ec933'
                        size='small'
                        handleToggle={column.getToggleVisibilityHandler()}
                      />
                      <div className='capitalize truncate'>{column.id}</div>
                    </label>
                  );
                })}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
