import React, { useState } from "react";
import { useSelector } from "react-redux"; 


export default function _ProfileImage({profileInfo}) {

    return (
        <div
        style={{
          background: profileInfo?.background && profileInfo?.background,
          color: profileInfo?.color && profileInfo?.color,
        }}
        className='w-8 h-8 rounded-full flex items-center justify-center relative z-10 text-lg'
      >
        {profileInfo?.userName && profileInfo?.userName.slice(0, 1).toUpperCase()}
      </div>
    )

}