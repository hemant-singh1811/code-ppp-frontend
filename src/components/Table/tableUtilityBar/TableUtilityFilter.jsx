import React, { useEffect, useState } from 'react';
import { useDetectOutsideClick } from '../../../utilities/customHooks/useDetectOutsideClick';
import CustomFilterInput from './CustomFilterInput';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function TableUtilityFilter({ table }) {
  const [filterConditions, setFilterConditions] = useState([]);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const filterRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [filterToggle, setFilterToggle] = React.useState(false);
  useDetectOutsideClick(filterRef, () => setFilterToggle(false));

  const addConditions = () => {
    let firstType = table.getHeaderGroups()[0]?.headers[0]?.column?.id;
    if (filterConditions.length < 1) {
      setFilterConditions([
        {
          type: firstType || '',
          operator: 'contains',
          value: '',
          id: Date.now(),
        },
      ]);
    } else {
      setFilterConditions((prevArray) => {
        let newValue = {
          type: firstType || '',
          operator: 'contains',
          value: '',
          id: Date.now(),
        };
        return [...prevArray, newValue];
      });
    }
  };
  const removeCondition = (id) => {
    setFilterConditions((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  let updatedFilters = filterConditions.map((ele) => {
    return {
      id: ele.type,
      value: ele.value.trim(),
    };
  });

  useEffect(() => {
    table.setColumnFilters(updatedFilters);
  }, [filterConditions]);

  return (
    <Popover
      className={`flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative ${
        filterConditions.length !== 0 && 'bg-[#e1d5f9]'
      }`}>
      {({ open, close }) => (
        <>
          <Popover.Button className='flex items-center font-medium outline-none'>
            <span className='material-symbols-rounded text-lg pr-1'>
              filter_list
            </span>
            Filter
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
            <Popover.Panel className='absolute top-10 left-0 z-[3] bg-white p-2 rounded-md w-[600px] max-h-96 overflow-y-scroll border-[#c8c8c8] border-2'>
              Filter:
              <div className='h-[.5px] mb-2 mt-1 w-full bg-white' />
              <div className='max-h-[700px] overflow-scroll scrollbar-hidden'>
                {filterConditions?.length < 1 ? (
                  <div className='text-gray-400 m-4'>
                    No filter conditions are applied to this view
                  </div>
                ) : (
                  filterConditions.map((ele, i) => (
                    <CustomFilterInput
                      key={i}
                      table={table}
                      type={ele.type}
                      operator={ele.operator}
                      value={ele.value}
                      id={ele.id}
                      removeCondition={removeCondition}
                      setFilterConditions={setFilterConditions}
                    />
                  ))
                )}
              </div>
              <div
                className='text-blue-500 hover:text-blue-700 m-2 mb-0 inline-block'
                onClick={() => addConditions()}>
                + Add Condition
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
