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
            <span className='material-symbols-rounded text-lg pr-1'>
              visibility_off
            </span>
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
                <span className='material-symbols-rounded absolute text-[20px] ml-4 text-[rgb(68, 68, 68)]  font-extralight '>
                  search
                </span>
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
