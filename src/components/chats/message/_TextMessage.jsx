import React, { useState } from "react";

export default function _TextMessage({ type, messageApi }) {
  function replaceWithBr() {
    return messageApi.text.split("\n").map((item, i) => <p key={i}>{item}</p>);
  }

  // console.log(messageApi.text)
  const [isSeen, setIsSeen] = useState(false);

  return type === "send" ? (
    <>
      <div className='bg-green-50 text-left self-end p-1 px-3 mr-1 rounded-[10px] rounded-br-[0px] flex flex-col items-end'>
        <div className='w-full break-all min-h-[20px]'>{replaceWithBr()}</div>
        <div
          className='text-[10px] text-gray-400 flex items-center justify-center'
          onClick={() => setIsSeen(true)}
        >
          {messageApi.createdAt}
          {messageApi.isSeen && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height={20}
              width={20}
              fill='blue'
            >
              <path d='m6.104 13.562-2.958-2.958.458-.479 2.479 2.479.584-.583.479.479Zm4.25-.02-2.958-2.938.479-.479 2.479 2.479 6-6.021.479.479Zm-.583-3.646-.459-.479 2.834-2.834.458.479Z' />
            </svg>
          )}
          {isSeen && (
            <svg xmlns='http://www.w3.org/2000/svg' height={20} width={20}>
              <path d='m6.104 13.562-2.958-2.958.458-.479 2.479 2.479.584-.583.479.479Zm4.25-.02-2.958-2.938.479-.479 2.479 2.479 6-6.021.479.479Zm-.583-3.646-.459-.479 2.834-2.834.458.479Z' />
            </svg>
          )}
          {!isSeen && (
            <svg xmlns='http://www.w3.org/2000/svg' height={20} width={20}>
              <path d='m8.229 13.479-2.917-2.917.459-.458 2.458 2.438 6-5.98.459.48Z' />
            </svg>
          )}
        </div>
      </div>
      <img src='/demo2.jpg' className='w-10 h-10 rounded-full' alt='' />
    </>
  ) : (
    // Receivers Text Box
    <>
      <img src='/demo1.jpg' className='w-10 h-10 rounded-full' alt='' />
      <div className='bg-green-200 self-end p-1 px-3 ml-1 rounded-[10px] rounded-bl-[0px] relative flex flex-col max-w-full'>
        {messageApi.from !== "" && (
          <div className='text-xs text-slate-500 '>@{messageApi.from}</div>
        )}
        <div className='w-full break-all min-h-[20px]'>{replaceWithBr()}</div>
        <div className='text-[10px] text-gray-400'>{messageApi.createdAt}</div>
      </div>
    </>
  );
}
