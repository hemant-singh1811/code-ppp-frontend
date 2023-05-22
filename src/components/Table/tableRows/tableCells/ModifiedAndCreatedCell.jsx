import React from "react";

export default function ModifiedAndCreatedCell({ cell, type }) {
  switch (type) {
    case "lastModifiedBy":
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div
            style={{
              background: cell.row.original.lastModifiedBy.background,
              color: cell.row.original.lastModifiedBy.color,
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
      );
    case "lastModifiedTime":
      let lastModifiedTime;
      if (cell.row.original?.lastModifiedTime) {
        lastModifiedTime = new Date(cell.row.original?.lastModifiedTime);
      }
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div className='capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
            <span>{lastModifiedTime?.toLocaleDateString()}</span>
            <span>{lastModifiedTime?.toLocaleTimeString()}</span>
          </div>
        </div>
      );
    case "createdBy":
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
    case "createdTime":
      console.log(cell.row.original?.createdTime);
      const createdTime = new Date(cell.row.original?.createdTime);
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div className='capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
            <span>{createdTime.toLocaleDateString()}</span>
            <span>{createdTime.toLocaleTimeString()}</span>
          </div>
        </div>
      );

    default:
      break;
  }

  // return <div>{type}</div>;
}
