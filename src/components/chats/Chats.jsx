import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import ActiveScreen from "../../screens/chats/ActiveScreen";
import { addMessage } from "../../store/features/messageSlice";
import Aside from "../aside/Aside";
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function Chats() {
  let user_token =
    "fghfjkjglksjlfjkljflewjriowejrlkewnlrkjhoi423uoi4u2304u23094uj3oriuiou";
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      socket.on("newconnect", (data) => {
        // console.log("data received: " + JSON.stringify(data));
        console.log("socket connected", socket.id)
      });

      let room = () => {
        socket.emit("joinroom", {
          user_token: user_token,
        });
      };
      room();

      socket.on("disconnection", () => {
        console.log("disconnect");
        room();
      });

      socket.on("room_response", (data) => {
        console.log(data);
      });
      socket.on("msg_response", (data) => {
        console.log(data);
      });

      socket.on("rec_msg", ({ message }) => {
        // console.log(message);
        if (message?.user_token !== user_token) {
          console.table(message);
          dispatch(
            addMessage({
              created_at: message?.created_at,
              deletedForEveryone: message?.deletedForEveryone,
              deletedForMe: message?.deletedForMe,
              from: message?.from,
              isSeen: message?.isSeen,
              seenBy: message?.seenBy,
              text: message?.text,
              to: message?.to,
              typeOfMsg: message?.typeOfMsg,
              url: message?.url,
              user_token: message?.user_token,
              file_name: message?.file_name,
            })
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="flex  h-screen overflow-hidden w-full text-black">
      <Aside />
      <ActiveScreen user_token={user_token} socket={socket} />
    </div>
  );
}
// {/* h-[calc(100%-68.57px)] */}
