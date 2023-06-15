// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  position: { x: 0, y: 0 },
  row: {},
  selectedRow: [],
  deleteRow: () => {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.isOpen = true;
      state.row = action.payload.row;
      state.deleteRow = action.payload.deleteRow;
      state.position = { x: action.payload.x, y: action.payload.y };
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    setSelectedRow: (state, action) => {},
  },
});

export const { openMenu, closeMenu, setSelectedRow } = menuSlice.actions;

export default menuSlice.reducer;
