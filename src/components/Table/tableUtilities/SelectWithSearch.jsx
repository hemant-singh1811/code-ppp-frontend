import React, { useState } from "react";
import { useRef } from "react";
import { useClickAway } from "react-use";
import getSvg from "./getSvg";

export default function SelectWithSearch({
  placeholder,
  data,
  selectedItem,
  setSelectedItem,
}) {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsVisible(false);
  });
  // ${
  //   isVisible &&
  //   "border-blue-500 border-t-blue-500 border-l-blue-500 border-r-blue-500"
  //   }

  return (
    <div
      className={`max-h-[calc(100vh_/_2)] mt-2   rounded-md  cursor-pointer select-none 
      
        `}
      ref={ref}
    >
      <div
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className={`flex items-center border-2 w-full gap-1 text-black bg-white   p-1 rounded-md relative ${
          isVisible && "border-blue-500"
        } `}
      >
        {selectedItem ? (
          <>
            {selectedItem.icon && getSvg(selectedItem.icon)}
            {selectedItem.name}
          </>
        ) : (
          <div className='ml-1'>{placeholder}</div>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'
          className='absolute z-10  right-1 top-1/2 transform -translate-y-1/2 '
        >
          <path d='M480 708 256 484l34-34 190 190 190-190 34 34-224 224Z' />
        </svg>
      </div>

      {isVisible && (
        <div className='border-[#eaebed] border-2 rounded-md'>
          <input
            className='bg-white w-full px-2 p-1.5 outline-none '
            placeholder='Find a Field'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onClick={() => {
              setIsVisible(true);
            }}
          />

          <div className='max-h-[200px] overflow-auto p-1 px-1.5  '>
            {data
              .filter((ele) => {
                return ele?.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((ele, i) => {
                return (
                  <div
                    key={i}
                    className='px-2 p-1.5 my-1 cursor-pointer hover:bg-blue-100 rounded-md flex items-center gap-2'
                    style={{
                      backgroundColor:
                        selectedItem.name === ele.name && "#E5F3FF",
                    }}
                    onClick={() => {
                      setSelectedItem(ele);
                      setIsVisible(false);
                      setSearch("");
                    }}
                  >
                    {selectedItem.icon && getSvg(ele.icon)}
                    {ele.name}
                  </div>
                );
              })}

            {data.filter((ele) => {
              return ele.name.toLowerCase().includes(search.toLowerCase());
            }).length === 0 && (
              <div className='px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md'>
                No Data Found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
