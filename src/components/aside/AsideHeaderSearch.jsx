import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChangeSearch } from "../../store/features/globalStateSlice";
import AsideThreeDotsDropDown from "./AsideThreeDotsDropDown";

export default function AsideHeaderSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.globalState.search);
  return (
    <div className='flex justify-center items-center pr-1'>
      <form className='flex-1'>
        <div className='relative my-2 mx-1 '>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 relative z-10 py-2 pl-10 text-sm text-black  rounded-lg shadow-custom outline-none focus:border-blue-500 border-2 border-transparent'
            placeholder='Search Mockups, Logos...'
            required=''
            autoComplete='off'
            value={search}
            onChange={(e) => dispatch(onChangeSearch(e.target.value))}
          />
        </div>
      </form>
      <AsideThreeDotsDropDown />
    </div>
  );
}
