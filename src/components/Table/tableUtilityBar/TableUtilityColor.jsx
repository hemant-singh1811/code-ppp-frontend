import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableUtilityColor({ table }) {
  return (
    <Popover className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg  cursor-pointer relative '>
      <Popover.Button className='flex items-center font-medium outline-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 pr-1'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
          />
        </svg>
        Color
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
        <Popover.Panel className='absolute top-10 left-0 z-[3] bg-white  max-h-[calc(100vh/_.5)] rounded-md overflow-hidden shadow-custom '>
          <Panel />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const Panel = () => {
  const [selectType, setSelectType] = useState('');

  switch (selectType) {
    case 'fields':
      return (
        <div>
          <div>
            <svg
              onClick={() => setSelectType('')}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>

            <p>Coloring records the same as</p>
          </div>
        </div>
      );

    case 'conditions':
      return (
        <div>
          <div>
            <svg
              onClick={() => setSelectType('')}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>

            <p>Coloring records the same as</p>
          </div>
        </div>
      );

    default:
      return (
        <div className='w-[310px]'>
          <div
            className='p-4 hover:bg-gray-200'
            onClick={() => {
              console.log('object');
              setSelectType('fields');
            }}>
            <div className='text-black flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 96 960 960'
                className='mr-1'
                width='20'>
                <path d='m480 613.232-93.308-93.308q-8.212-8.308-18.695-8.308-10.484 0-18.073 8.308-8.308 7.589-8.116 18.217.193 10.628 8.054 18.49l107.892 107.891q9.785 9.785 22.428 9.785t22.125-9.846l107.532-107.532q7.776-7.775 8.16-18.429.385-10.654-7.923-19.055-7.922-7.829-18.576-7.444-10.654.384-18.455 8.186L480 613.232Zm.343 326.767q-75.112 0-141.48-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.087t-28.433-141.673q0-75.378 28.42-141.246 28.42-65.869 78.21-115.682 49.791-49.814 116.087-78.247t141.673-28.433q75.378 0 141.246 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.853t28.433 141.173q0 75.112-28.42 141.48-28.42 66.369-78.21 116.182-49.791 49.814-115.853 78.247t-141.173 28.433ZM480 888q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z' />
              </svg>
              Select Fields
            </div>
            <p className='opacity-75 text-sm'>
              Color records the same as a single select field
            </p>
          </div>
          <div
            className='p-4 hover:bg-gray-200'
            onClick={() => setSelectType('conditions')}>
            <div className='text-black flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 mr-1'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
                />
              </svg>
              Conditions
            </div>
            <p className='opacity-75 text-sm'>
              Color records based on conditions
            </p>
          </div>
        </div>
      );
  }
};
