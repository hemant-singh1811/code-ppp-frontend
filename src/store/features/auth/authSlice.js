import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

// initialize userToken from local storage
let userInfo = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfo,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, { payload }) => {
      state.userInfo = null;
      localStorage.removeItem("userToken");
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
