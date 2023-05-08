import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  handelAddBases,
  handelAddTableInBases,
  handelRenameBases,
  handelRenameTableInBases,
} from '../BasesStateSlice';
import {
  handelAddSideBarField,
  handelAddSideBarMenu,
  handelRenameSideBarField,
  handelRenameSideBarMenu,
} from '../SideBarStateSlice';

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
  const { selectedBaseId, mainSideBar } = state().globalState;

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

    switch (data?.action) {
      case 'CREATE BASE':
        dispatch(handelAddBases([data?.data]));
        dispatch(
          handelAddSideBarMenu({
            subMenu: [],
            baseId: data?.data.baseid,
            title: data?.data.basemetadata.name,
            icons: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 96 960 960'
                width='24'>
                <path d='M160 896V256h640v640H160Zm40-433.846h560V296H200v166.154Zm199.923 196.923h160.154V502.154H399.923v156.923Zm0 196.923h160.154V699.077H399.923V856ZM200 659.077h159.923V502.154H200v156.923Zm400.077 0H760V502.154H600.077v156.923ZM200 856h159.923V699.077H200V856Zm400.077 0H760V699.077H600.077V856Z' />
              </svg>
            ),
          })
        );
        break;
      case 'RENAME BASE':
        dispatch(
          handelRenameBases({
            baseId: data?.data?.baseid,
            updatedName: data?.data?.base_name,
          })
        );
        dispatch(
          handelRenameSideBarMenu({
            baseId: data?.data?.baseid,
            updatedName: data?.data?.base_name,
          })
        );
        break;
      case 'DELETE BASE':
        break;
      case 'CREATE TABLE':
        dispatch(
          handelAddTableInBases({
            baseId: selectedBaseId,
            data: data?.data,
          })
        );
        dispatch(
          handelAddSideBarField({
            baseId: selectedBaseId,
            data: {
              title: data?.data?.table_name,
              tableId: data?.data?.table_id,
              to: `${selectedBaseId}/${data?.data?.table_id}`,
              baseId: selectedBaseId,
            },
          })
        );
        break;
      case 'RENAME TABLE':
        dispatch(
          handelRenameTableInBases({
            baseId: data?.data.baseid,
            tableId: data?.data.table_id,
            updatedName: data?.data.table_name,
          })
        );
        dispatch(
          handelRenameSideBarField({
            baseId: data?.data.baseid,
            tableId: data?.data.table_id,
            updatedName: data?.data.table_name,
          })
        );
        break;
      case 'DELETE TABLE':
        break;

      default:
        break;
    }
  });
};

export const { setSocket } = SocketWebDataSlice.actions;
export default SocketWebDataSlice.reducer;
