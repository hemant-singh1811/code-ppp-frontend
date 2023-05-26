import React from "react";

export function ModifiedAndCreatedCell({ cell, type }) {
  switch (type) {
    case "lastModifiedBy":
      return (
        cell.row.original?.lastModifiedBy?.userName && (
          <div className=' flex items-start w-full h-full text-left px-2 p-1'>
            <div
              style={{
                background: cell.row.original.lastModifiedBy?.background,
                color: cell.row.original.lastModifiedBy?.color,
              }}
              className='w-6 h-6 rounded-full flex items-center justify-center relative z-10'
            >
              {cell.row.original?.lastModifiedBy?.userName
                .slice(0, 1)
                .toUpperCase()}
            </div>
            <div className='capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5'>
              {cell.row.original?.lastModifiedBy?.userName}
            </div>
          </div>
        )
      );
    case "lastModifiedTime":
      let lastModifiedTime;
      if (cell.row.original?.lastModifiedTime) {
        lastModifiedTime = new Date(cell.row.original?.lastModifiedTime);
      }
      return (
        lastModifiedTime?.toLocaleDateString() && (
          <div className='capitalize text-sm m-1 p-1 px-2 flex justify-between truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
            <span className='truncate'>
              {lastModifiedTime?.toLocaleDateString()}
            </span>
            <span className='truncate'>
              {lastModifiedTime?.toLocaleTimeString()}
            </span>
          </div>
        )
      );
    case "createdBy":
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div
            style={{
              background: cell.row.original.createdBy?.background,
              color: cell.row.original.createdBy?.color,
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
    case "createdTime":
      const createdTime = new Date(cell.row.original?.createdTime);
      return (
        <div className='capitalize text-sm m-1 p-1 px-2 flex justify-between truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
          <span className='truncate'>{createdTime.toLocaleDateString()}</span>
          <span className='truncate'>{createdTime.toLocaleTimeString()}</span>
        </div>
      );

    default:
      break;
  }
}

export default ModifiedAndCreatedCell;
