import React from "react";
import { colorPallet } from "../../../utilities/colorPallet";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export function ColorPalletSelect(event, pallet, text) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-10' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className=' '>
                <div className='w-[600px] truncate bg-white shadow-custom rounded-md p-2 grid grid-cols-10 grid-rows-3 items-center  justify-center absolute  gap-4 z-40 '>
                  {colorPallet.map(({ background, color }, index) => {
                    return (
                      <div
                        key={index}
                        className='truncate p-0.5 px-1 rounded-full text-sm cursor-pointer text-center'
                        style={{
                          background: background,
                          color: color,
                        }}
                      >
                        {text}
                      </div>
                    );
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <div className='w-[600px] truncate bg-white shadow-custom rounded-md p-2 grid grid-cols-10 grid-rows-3 items-center  justify-center absolute  gap-4 z-40 '>
      {colorPallet.map(({ background, color }) => {
        return (
          <div
            className='truncate p-0.5 px-1 rounded-full text-sm cursor-pointer text-center'
            style={{
              background: background,
              color: color,
            }}
          >
            {text}sda
          </div>
        );
      })}
    </div>
  );
}
