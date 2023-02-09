import React from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";
import Switch from "../utilities/Switch";

export default function TableUtilityHideFields(table) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const hiddenFields = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [isHiddenToggle, setIsHiddenToggle] = React.useState(false);

  useDetectOutsideClick(hiddenFields, () => setIsHiddenToggle(false));

  return (
    <div
      ref={hiddenFields}
      className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer relative '>
      <div
        className='flex items-center'
        onClick={() => setIsHiddenToggle(!isHiddenToggle)}>
        <span className='material-symbols-rounded text-lg pr-1'>
          visibility_off
        </span>
        Hide Fields
      </div>
      {isHiddenToggle && hideFields(table)}
    </div>
  );
}

function hideFields(table) {
  return (
    <div className='absolute top-10 left-0 z-50 bg-[#03001C] w-[200px]  p-2 rounded-md'>
      <label className='flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-[#2f2a40] rounded-sm pl-2'>
        <Switch
          isOn={table.getIsAllColumnsVisible()}
          onColor='#1ec933'
          handleToggle={table.getToggleAllColumnsVisibilityHandler()}
          size='small'
        />
        <div>Toggle All</div>
      </label>

      {table.getAllLeafColumns().map((column) => {
        return (
          <label
            key={column.id}
            className='flex items-center text-base gap-4 p-1 hover:bg-[#2f2a40] rounded-sm pl-2 cursor-pointer'>
            <Switch
              isOn={column.getIsVisible()}
              onColor='#1ec933'
              size='small'
              handleToggle={column.getToggleVisibilityHandler()}
            />
            <div className='capitalize truncate'>{column.id}</div>
          </label>
        );
      })}
    </div>
  );
}