import React from "react";
import { useSelector } from "react-redux";
import _ProfileImage from './_ProfileImage'

export default function _MessageHeader() {

  // const load = useSelector((state) => state.load.load);

  const { userInfo } = useSelector((state) => state.auth);
  const { name, background, color } = userInfo;

  console.log("userInfo : ", userInfo);

  return (
    <div className='bg-white w-full'>
      <div className='flex items-center'>
        <div className='flex'>

          <div className=' flex items-start w-full h-full text-left px-2 p-1'>

            <div
              style={{
                background: background,
                color: color,
              }}
              className='w-6 h-6 rounded-full flex items-center justify-center relative z-10'
            >
              {name.slice(0, 1).toUpperCase()}
            </div>

            <div className='capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5'>
              {name}
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}
