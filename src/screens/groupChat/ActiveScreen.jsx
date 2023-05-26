import React, { useState } from "react";
import Chatting from "./Chatting";
import _MessageHeader from "../../components/groupChat/message/_MessageHeader";
import { useSelector } from "react-redux";
import NonActiveScreen from "./NonActiveScreen";

export default function ActiveScreen({ userToken, socket }) {
  const load = "";
  // useSelector((state) => state.load.load);
  const [activePage, setActivePage] = useState("chat");
  return (
    <div className=' w-full flex flex-col '>
      {load === null ? (
        <NonActiveScreen />
      ) : (
        <>

          <_MessageHeader />

          {activePage === "chat" && (
            <Chatting userToken={userToken} socket={socket} />
          )}

        </>
      )}
    </div>
  );
}
