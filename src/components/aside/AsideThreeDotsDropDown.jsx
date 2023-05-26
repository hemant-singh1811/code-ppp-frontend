import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFilterChange } from "../../store/features/globalStateSlice";
import { useDetectOutsideClick } from "../../utilities/customHooks/useDetectOutsideClick";

export default function AsideThreeDotsDropDown() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // Call hook passing in the ref and a function to call on outside click

  const filter = useSelector((state) => state.globalState.filter);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  useDetectOutsideClick(ref, () => setToggle(false));
  return (
    <div ref={ref} className='filter_container'>
      <div className='relative inline-block text-left'>
        <div>
          <button
            onClick={() => setToggle(!toggle)}
            className={` flex w-full items-center justify-center rounded-full p-2 bg-black  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
              toggle ? "bg-opacity-100" : ""
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
          </button>
        </div>
      </div>
      {toggle && (
        <div className='px-1 py-1 absolute z-50 bg-white block w-[150px] shadow-custom left-[243px] rounded-lg'>
          {filter.map((element) => {
            return (
              <div
                key={element.name}
                className='w-full flex items-center rounded-md px-2 py-2 text-sm justify-between'
              >
                <div className=''>{element.name}</div>
                <label className='inline-flex relative items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    defaultValue=''
                    className='sr-only peer'
                    onChange={(e) => dispatch(handleFilterChange(element))}
                    checked={element.isSelected}
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
