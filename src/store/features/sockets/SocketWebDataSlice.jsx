import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  handelAddBases,
  handelAddTableInBases,
  handelRemoveBases,
  handelRemoveTableInBases,
  handelRenameBases,
  handelRenameTableInBases,
} from '../BasesStateSlice';
import {
  handelAddSideBarField,
  handelAddSideBarMenu,
  handelRemoveSideBarField,
  handelRemoveSideBarMenu,
  handelRenameSideBarField,
  handelRenameSideBarMenu,
} from '../SideBarStateSlice';
import { handelCloseModal } from '../globalStateSlice';

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
  const userInfo = state().auth?.userInfo;
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

  if (socket) {
    socket?.emit('joinBaseRoom', userInfo?.user_token, (res) => {
      console.log('join base room res : ', res);
    });
  }

  socket.on('UpdatedBaseData', ({ action, data }) => {
    console.log('UpdatedBaseData : ', action, data);
    const { selectedBaseId, selectedTableId } = state().globalState;
    switch (action) {
      case 'CREATE BASE':
        dispatch(handelAddBases([data]));
        dispatch(
          handelAddSideBarMenu({
            subMenu: [],
            baseId: data.baseid,
            title: data.basemetadata.name,
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
            baseId: data?.baseid,
            updatedName: data?.base_name,
          })
        );
        dispatch(
          handelRenameSideBarMenu({
            baseId: data?.baseid,
            updatedName: data?.base_name,
          })
        );
        break;
      case 'DELETE BASE':
        if (selectedBaseId === data?.baseid) {
          window.location.replace('/');
        }
        dispatch(
          handelRemoveSideBarMenu({
            baseId: data.baseid,
          })
        );
        dispatch(
          handelRemoveBases({
            baseId: data.baseid,
          })
        );
        dispatch(handelCloseModal(''));
        break;
      case 'CREATE TABLE':
        dispatch(
          handelAddTableInBases({
            baseId: data.baseid,
            data: data,
          })
        );
        dispatch(
          handelAddSideBarField({
            baseId: data.baseid,
            data: {
              title: data?.table_name,
              tableId: data?.table_id,
              to: `${data.baseid}/${data?.table_id}`,
              baseId: data.baseid,
            },
          })
        );
        break;
      case 'RENAME TABLE':
        dispatch(
          handelRenameTableInBases({
            baseId: data?.baseid,
            tableId: data?.table_id,
            updatedName: data?.table_name,
          })
        );
        dispatch(
          handelRenameSideBarField({
            baseId: data?.baseid,
            tableId: data?.table_id,
            updatedName: data?.table_name,
          })
        );
        break;
      case 'DELETE TABLE':
        if (selectedTableId === data.table_id) {
          window.location.replace('/');
        }
        dispatch(
          handelRemoveSideBarField({
            baseId: data.baseid,
            tableId: data.table_id,
          })
        );
        dispatch(
          handelRemoveTableInBases({
            baseId: data.baseid,
            tableId: data.table_id,
          })
        );
        break;

      default:
        break;
    }
  });
};

export const { setSocket } = SocketWebDataSlice.actions;
export default SocketWebDataSlice.reducer;
