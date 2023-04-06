import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const SocketWebDataSlice = createSlice({
  name: 'socketWebData',
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const initSocket = () => (dispatch) => {
  const socket = io(import.meta.env.VITE_SERVER_URL + 'webdata');

  socket.on('connect', () => {
    dispatch(setSocket(socket));
    console.log('connecting to server by socket', socket.id);
  });

  socket.on('disconnect', () => {
    dispatch(setSocket(null));
  });
};

export const { setSocket } = SocketWebDataSlice.actions;
export default SocketWebDataSlice.reducer;
