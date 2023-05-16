import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TableUtilitySort({ table }) {
  return (
    <Popover
      className={`flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative  ${
        table?.options?.state?.sorting?.length !== 0 && "bg-[#e1d5f9]"
      }`}
    >
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center font-medium outline-none `}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5 pr-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
              />
            </svg>
            Sort
          </Popover.Button>
          <Transition
            className='bg-white'
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute top-10 left-0 z-50 bg-white w-[300px] p-2 rounded-md  max-h-[calc(100vh/_.5)] overflow-y-auto shadow-custom'>
              <div>
                Sort By:
                <div className='h-[.5px] mb-2 mt-1 w-full bg-[#03001C]' />
                {table.getHeaderGroups().map((headerGroup) => (
                  <div key={headerGroup.id}>
                    {headerGroup.headers.map((header, i) => {
                      // if (i === 0) {
                      //   return;
                      // }
                      return (
                        !header.column.columnDef?.hiddenInConditions && (
                          <div
                            onClick={() => {
                              header.column.toggleSorting();
                            }}
                            key={header.id}
                            colSpan={header.colSpan}
                            className='flex justify-between items-center hover:bg-black hover:bg-opacity-10 pr-2'
                          >
                            {header.isPlaceholder ? null : (
                              <label className='flex items-center text-base gap-4 p-1  rounded-sm pl-2 cursor-pointer'>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none"
                                      : "",
                                  }}
                                >
                                  <div className='capitalize truncate flex-1'>
                                    {header.column.columnDef.field_name}
                                  </div>
                                </div>
                              </label>
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )
                      );
                    })}
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
