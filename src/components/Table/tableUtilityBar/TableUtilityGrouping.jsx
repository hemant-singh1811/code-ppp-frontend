import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableUtilityGrouping({ table }) {
  return (
    <Popover
      className={`flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative  max-h-96 ${
        table?.options?.state?.grouping?.length !== 0 && 'bg-[#e1d5f9]'
      }`}>
      {({ open, close }) => (
        <>
          <Popover.Button className='flex items-center font-medium outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5  pr-1'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z'
              />
            </svg>
            Group
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
            <Popover.Panel className='absolute top-10 left-0 z-[3] bg-white w-[300px] p-2 rounded-md  max-h-96 overflow-y-scroll border-[#c8c8c8] border-2'>
              Group By:
              <div className='h-[.5px] mb-2 mt-1 w-full bg-[#03001C]' />
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <div key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      // if (i === 0) {
                      //   return;
                      // }
                      return (
                        <div
                          {...{
                            onClick: header.column.getToggleGroupingHandler(),
                            style: {
                              cursor: 'pointer',
                            },
                          }}
                          key={header.id}
                          colSpan={header.colSpan}
                          className='flex items-center text-base gap-4 p-1 hover:bg-black hover:bg-opacity-10 rounded-sm pl-2 cursor-pointer '>
                          {header.isPlaceholder ? null : (
                            <div>
                              {header.column.getCanGroup() ? (
                                // If the header can be grouped, let's add a toggle
                                <button>
                                  {header.column.getIsGrouped()
                                    ? `🛑(${header.column.getGroupedIndex()}) `
                                    : `👊 `}
                                </button>
                              ) : null}{' '}
                              {header.column.id}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
