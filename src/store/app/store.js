import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import messageReducer from '../features/messageSlice';
import loadReducer from '../features/loadSlice';
import globalStateReducer from '../features/globalStateSlice';
import { alphaTruckingApi } from '../services/alphaTruckingApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import viewsReducer from '../features/viewsSlice';
import basesReducer from '../features/BasesStateSlice';

const reducer = {
  [alphaTruckingApi.reducerPath]: alphaTruckingApi.reducer,
  message: messageReducer,
  load: loadReducer,
  globalState: globalStateReducer,
  auth: authReducer,
  views: viewsReducer,
  bases: basesReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools:
    import.meta.env.VITE_SERVER_REDUX_TOOLKIT_VISIBILITY === 'true'
      ? true
      : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alphaTruckingApi.middleware),
});
setupListeners(store.dispatch);
