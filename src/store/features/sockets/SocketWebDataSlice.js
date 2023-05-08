import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const SocketWebDataSlice = createSlice({
  name: "socketWebData",
  initialState: {
    socket: true,
    isConnected: true,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload.socket;
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const initSocket = () => (dispatch) => {
  const socket = io(import.meta.env.VITE_SERVER_URL + "webdata");

  socket.on("connect", () => {
    dispatch(setSocket({ socket: socket, isConnected: socket.connected }));
    console.log("connecting to server by socket", socket.id);
  });

  socket.on("disconnect", () => {
    dispatch(setSocket({ socket: socket, isConnected: socket.connected }));
  });

  socket.on("updatedata", (response) => {
    console.log("res : ", response);
  });
};

export const { setSocket } = SocketWebDataSlice.actions;
export default SocketWebDataSlice.reducer;
