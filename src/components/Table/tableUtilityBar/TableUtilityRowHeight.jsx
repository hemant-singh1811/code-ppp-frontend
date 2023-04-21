import React, { useContext } from 'react';
import { useDetectOutsideClick } from '../../../utilities/customHooks/useDetectOutsideClick';
import { TableContext } from '../tableComponents/TableComponents';

export default function TableUtilityRowHeight() {
  const { rowHeight, setRowHeight } = useContext(TableContext);

  // Create a ref that we add to the element for which we want to detect outside clicks
  const rowHeightRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [rowHeightToggle, setRowHeightToggle] = React.useState(false);

  useDetectOutsideClick(rowHeightRef, () => setRowHeightToggle(false));

  const handleRowHeightChange = (ele) => {
    setRowHeight((prev) => {
      return prev.map((item) => {
        if (item.name === ele.name) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });
    });
  };

  return (
    <div
      ref={rowHeightRef}
      className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative '>
      <div
        className='flex items-center font-medium'
        onClick={() => setRowHeightToggle(!rowHeightToggle)}>
        <span className='material-icons-round text-lg pr-1'>table_rows</span>
        Row Height
      </div>
      {rowHeightToggle && (
        <div className='absolute top-10 left-0 z-50 bg-white w-[200px] p-2 rounded-md border-[#c8c8c8] border-2'>
          {rowHeight.map((ele) => {
            return (
              <div
                key={ele.name}
                onClick={() => handleRowHeightChange(ele)}
                className={`flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-black hover:bg-opacity-10 rounded-sm pl-2 ${
                  ele.isActive && 'text-purple-500'
                } `}>
                <span className='material-icons-round text-lg pr-1'>
                  {ele.icon}
                </span>
                <div>{ele.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
