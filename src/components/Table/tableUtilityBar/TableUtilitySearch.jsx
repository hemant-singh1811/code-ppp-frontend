import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../tableComponents/TableComponents";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TableUtilitySearching() {
  const [isOpen, setIsOpen] = useState(false);
  const { globalFilter, setGlobalFilter } = useContext(TableContext);

  return (
    <Popover className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5  text-lg  cursor-pointer relative '>
      {({ open, close }) => (
        <>
          <Popover.Button className='relative flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={`w-6 h-6  cursor-pointer text-[#7e7e7e] p-1 rounded ${
                isOpen && "#4d4d4d"
              } ${globalFilter && "bg-[#e1d5f9]"}`}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
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
            <Popover.Panel className='absolute right-[-3px] w-[300px] top-[30px]  flex items-center border-2  border-[#e8e8e8]  bg-white overflow-hidden rounded-br rounded-bl z-[3]'>
              <DebouncedInput
                id='default-search'
                className='block w-full p-2 bg-white text-black text-base placeholder:text-[#757575] outline-none'
                placeholder='Find in view'
                value={globalFilter}
                onChange={(value) => setGlobalFilter(String(value?.trim()))}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 text-black font-light m-1 my-2 cursor-pointer'
                onClick={() => {
                  close();
                  setGlobalFilter("");
                }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
