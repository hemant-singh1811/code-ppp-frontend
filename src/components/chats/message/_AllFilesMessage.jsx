import React from "react";

export default function _AllFilesMessage({ messageApi, type }) {
  return type === "send" ? (
    <div className='bg-green-50 self-end p-1  ml-1 rounded-[10px] rounded-br-[0px] relative'>
      <div className='flex items-center'>
        <p className='bg-gray-200 p-1 m-1 rounded-md'>{messageApi.file_name}</p>
        <a
          // download={`${pdfName}.pdf`}
          target='_blank'
          href={messageApi.url}
          className='bg-gray-200 p-1 m-1 ml-0 rounded-md'
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
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
            />
          </svg>
        </a>
      </div>
      <div className='text-[10px] text-gray-400 mt-1'>
        {messageApi.createdAt}
      </div>
    </div>
  ) : (
    <div className='bg-green-200 self-end p-1  ml-1 rounded-[10px] rounded-bl-[0px] relative'>
      <div className='flex items-center'>
        <p className='bg-gray-200 p-1 m-1 rounded-md'>
          {messageApi.file_name ? messageApi.file_name : "File"}
        </p>
        <a
          href={messageApi.url}
          className='bg-gray-200 p-1 m-1 ml-0 rounded-md'
          target='_blank'
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
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
            />
          </svg>
        </a>
      </div>
      <div className='text-[10px] text-gray-400 mt-1'>
        {messageApi.createdAt}
      </div>
    </div>
  );
}
