import React, { useEffect, useState } from "react";
import CustomFilterInput from "./CustomFilterInput";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TableUtilityFilter({ table }) {
  const [filterConditions, setFilterConditions] = useState([]);
  console.log(filterConditions);
  const addConditions = () => {
    let firstType = table.getHeaderGroups()[0]?.headers[0]?.column?.id;
    if (filterConditions.length < 1) {
      setFilterConditions([
        {
          type: firstType || "",
          operator: "contains",
          value: "",
          columnId: "",
          id: Date.now(),
        },
      ]);
    } else {
      setFilterConditions((prevArray) => {
        let newValue = {
          type: firstType || "",
          operator: "contains",
          value: "",
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
    console.log(ele);
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
      className={`flex items-center  rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative ${
        filterConditions.length !== 0
          ? "bg-[#e1d5f9]"
          : "hover:bg-black hover:bg-opacity-10"
      }`}
    >
      {({ open, close }) => (
        <>
          <Popover.Button className='flex items-center font-medium outline-none'>
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
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
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
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute top-10 left-0 z-[3] bg-white p-2 rounded-md w-[600px] max-h-96 overflow-y-auto shadow-custom '>
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
                onClick={() => addConditions()}
              >
                + Add Condition
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
