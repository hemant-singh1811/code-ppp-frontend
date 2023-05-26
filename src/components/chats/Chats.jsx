import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ActiveScreen from "../../screens/chats/ActiveScreen";
import { addMessage } from "../../store/features/messageSlice";
import Aside from "../aside/Aside";
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function Chats() {
  let userToken = useSelector((state) => state.auth.userInfo?.userToken);

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      socket.on("newconnect", (data) => {
        console.log("socket connected", socket.id);
      });

      let roomId = {
        userToken: userToken,
        data: {},
      };

      let room = () => {
        socket.emit("joinroom", roomId, (res) => {
          console.log("join room res : ", res);
        });
      };
      room();

      socket.on("disconnection", () => {
        console.log("disconnect");
        room();
      });

      socket.on("responseMessage", ({ message }) => {
        // console.log(message);
        if (message?.userToken !== userToken) {
          console.table(message);
          dispatch(
            addMessage({
              createdAt: message?.createdAt,
              deletedForEveryone: message?.deletedForEveryone,
              deletedForMe: message?.deletedForMe,
              from: message?.from,
              isSeen: message?.isSeen,
              seenBy: message?.seenBy,
              text: message?.text,
              to: message?.to,
              typeOfMsg: message?.typeOfMsg,
              url: message?.url,
              userToken: message?.userToken,
              fileName: message?.fileName,
            })
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className='flex  h-screen overflow-hidden w-full text-black'>
      <Aside />
      <ActiveScreen userToken={userToken} socket={socket} />
    </div>
  );
}
// {/* h-[calc(100%-68.57px)] */}
