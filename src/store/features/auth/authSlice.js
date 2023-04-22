import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

// initialize userToken from local storage
let userInfo = localStorage.getItem('userToken')
  ? JSON.parse(localStorage.getItem('userToken'))
  : null;

const userToken =
  JSON.parse(localStorage.getItem('userToken'))?.user_token || null;

const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: (state, { payload }) => {
      state.userToken = null;
      state.userInfo = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload?.user_token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user reducer...
  },
});

export default authSlice.reducer;

export const { handleLogout } = authSlice.actions;
