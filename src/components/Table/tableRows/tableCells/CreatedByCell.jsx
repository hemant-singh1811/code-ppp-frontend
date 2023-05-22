import React from "react";

export default function CreatedByCell({ rowData, cell }) {
  console.log(cell.row.original.createdBy);
  return (
    <div className=' flex items-start w-full h-full text-left px-2 p-1'>
      <div
        style={{
          background: cell.row.original.createdBy.background,
          color: cell.row.original.createdBy.color,
        }}
        className='w-6 h-6 rounded-full flex items-center justify-center relative z-10'
      >
        {cell.row.original?.createdBy?.userName.slice(0, 1).toUpperCase()}
      </div>
      <div className='capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5'>
        {cell.row.original?.createdBy?.userName}
      </div>
    </div>
  );
}
