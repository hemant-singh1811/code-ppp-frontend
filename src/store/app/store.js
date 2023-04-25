import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { alphaTruckingApi } from '../services/alphaTruckingApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import globalStateReducer from '../features/globalStateSlice';
import messageReducer from '../features/messageSlice';
import loadReducer from '../features/loadSlice';
import authReducer from '../features/auth/authSlice';
import viewsReducer from '../features/viewsSlice';
import basesReducer from '../features/BasesStateSlice';
import sidebarReducer from '../features/SideBarStateSlice';
import fileViewerReducer from '../features/fileViewerSlice';
import socketWebDataReducer from '../features/sockets/SocketWebDataSlice';
import dataSliceReducer from '../services/alphaTruckingApi';

const reducer = {
  [alphaTruckingApi.reducerPath]: alphaTruckingApi.reducer,
  message: messageReducer,
  load: loadReducer,
  globalState: globalStateReducer,
  auth: authReducer,
  views: viewsReducer,
  bases: basesReducer,
  sidebar: sidebarReducer,
  fileViewer: fileViewerReducer,
  socketWebData: socketWebDataReducer,
  dataSlice: dataSliceReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools:
    import.meta.env.VITE_SERVER_REDUX_TOOLKIT_VISIBILITY === 'true'
      ? true
      : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      alphaTruckingApi.middleware
    ),
});
setupListeners(store.dispatch);
