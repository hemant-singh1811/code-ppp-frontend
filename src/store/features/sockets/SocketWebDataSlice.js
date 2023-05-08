import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { handelAddBases } from '../BasesStateSlice';

const SocketWebDataSlice = createSlice({
  name: 'socketWebData',
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

export const initSocket = () => (dispatch, state) => {
  const { user_token, user_id } = state().auth.userInfo;
  const socket = io(import.meta.env.VITE_SERVER_URL + 'webdata');

  socket.on('connect', () => {
    dispatch(setSocket({ socket: socket, isConnected: socket.connected }));
    console.log('connecting to server by socket', socket.id);
  });

  socket.on('disconnect', () => {
    dispatch(setSocket({ socket: socket, isConnected: socket.connected }));
  });

  socket.on('updatedata', (response) => {
    console.log('res : ', response);
  });

  socket.emit('joinBaseRoom', user_token, (res) => {
    console.log('join base room res : ', res);
  });

  socket.on('UpdatedBaseData', (data) => {
    console.log('UpdatedBaseData : ', data);

    if (data.user_id !== user_id) {
      switch (data?.action) {
        case 'CREATE BASE':
          // dispatch(handelAddBases(data?.data));
          break;
        case 'RENAME BASE':
          break;
        case 'DELETE BASE':
          break;
        case 'CREATE TABLE':
          break;
        case 'RENAME TABLE':
          break;
        case 'DELETE TABLE':
          break;

        default:
          break;
      }
    }
  });
};

export const { setSocket } = SocketWebDataSlice.actions;
export default SocketWebDataSlice.reducer;
