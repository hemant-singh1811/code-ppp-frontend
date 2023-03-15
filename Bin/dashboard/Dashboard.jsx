import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/features/auth/authActions";
import { handleLogout } from "../../store/features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(userLogout(userToken));
    dispatch(handleLogout(userToken));
  };

  return (
    <div className="text-white w-full">
      <div className="bg-[#2f2a40] p-2 items-center h-16 w-full flex justify-end border-b-[.5px] border-[#ffffff81]">
        <button
          className="bg-[#02001c] p-2 px-6 rounded-md active:bg-opacity-50"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
