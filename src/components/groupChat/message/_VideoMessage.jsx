import React from "react";
import { useSelector } from "react-redux";
import _ProfileImage from './_ProfileImage'


export default function _VideoMessage({ messageApi, type }) {
  const [isLoaded, setIsLoaded] = React.useState(false);


  const { userInfo } = useSelector((state) => state.auth);
 
  console.log("messageApi : ", messageApi);
  console.log("userInfo : ", userInfo);


  return type === "send" ? (
    <>
      <div className='bg-green-50 self-end p-1  mr-1 rounded-[10px] rounded-br-[0px] relative'>
        <div className='w-full max-w-[300px] flex justify-center overflow-hidden items-center min-w-[3rem] min-h-[3rem] rounded-lg'>
          <div
            className={` h-[300px] w-[300px] rounded-lg overflow-hidden ${
              messageApi.status === "uploading" && "blur-sm"
            }`}
          >
            <video
              controls
              width='100%'
              height='100px'
              className='rounded-lg h-full w-full'
            >
              <source src={messageApi.url} type='video/mp4' />
              Sorry, your browser doesn't support videos.
            </video>
          </div>
          {messageApi.status === "uploading" && (
            <div className='absolute z-10'>
              <div className='flex justify-center items-center'>
                <svg
                  className='h-10 w-10 animate-spin absolute'
                  viewBox='3 3 18 18'
                >
                  <path
                    className='fill-indigo-200'
                    d='M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'
                  />
                  <path
                    className='fill-indigo-800'
                    d='M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z'
                  />
                </svg>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8 bg-white rounded-full p-1  animate-pulse'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {messageApi.text !== "" && <div>{messageApi.text}</div>}
        <div className='text-[10px] text-gray-400 mt-1 text-right mr-2'>
          {messageApi.createdAt}
        </div>
      </div>

      <_ProfileImage profileInfo={userInfo} />

      {/* <img src='/demo2.jpg' className='w-10 h-10 rounded-full' alt='' /> */}

    </>
  ) : (
    <>
        <_ProfileImage profileInfo={messageApi} />

      {/* <img src='/demo1.jpg' className='w-10 h-10 rounded-full' alt='' /> */}

      <div className='bg-green-200 self-end p-1  ml-1 rounded-[10px] rounded-bl-[0px] relative '>
        <div className='w-full max-w-[300px] flex justify-center overflow-hidden items-center min-w-[3rem] min-h-[3rem] rounded-lg'>
          <div
            className={` h-[300px] w-[300px] rounded-lg overflow-hidden ${
              !isLoaded && "blur-sm"
            }`}
          >
            <video
              controls
              width='100%'
              height='100px'
              className='rounded-lg h-full w-full'
              onLoadedData={() => setIsLoaded(true)}
              onLoad={() => setIsLoaded(true)}
            >
              <source src={messageApi.url} type='video/mp4' />
              Sorry, your browser doesn't support videos.
            </video>
          </div>
          {!isLoaded && (
            <div className='absolute z-50'>
              <div className='flex justify-center items-center'>
                <svg
                  className='h-10 w-10 animate-spin absolute'
                  viewBox='3 3 18 18'
                >
                  <path
                    className='fill-indigo-200'
                    d='M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'
                  />
                  <path
                    className='fill-indigo-800'
                    d='M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z'
                  />
                </svg>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8 bg-white rounded-full p-1  animate-pulse'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {messageApi.text !== "" && <div>{messageApi.text}</div>}
        <div className='text-[10px] text-gray-400 mt-1 '>
          {messageApi.createdAt}
        </div>
      </div>
    </>
  );
}
