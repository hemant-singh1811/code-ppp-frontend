// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  position: { x: 0, y: 0 },
  row: {},
  selectedRow: [],
  deleteRow: () => {},
  selectedRow: () => {},
  addColumnIsOpen: false,
  addColumnPosition: { x: 0, y: 0 },
  columns: [],
  setColumns: () => {},
  selectedColumn: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.isOpen = true;
      state.row = action.payload.row;
      state.deleteRow = action.payload.deleteRow;
      state.selectedRow = action.payload.selectedRow;
      state.position = { x: action.payload.x, y: action.payload.y };
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    openAddColumnMenu: (state, { payload }) => {
      state.addColumnIsOpen = true;
      state.columns = payload?.columns;
      state.setColumns = payload?.setColumns;
      state.selectedColumn = payload?.selectedColumn;
      state.addColumnPosition = payload?.addColumnPosition;
    },
    closeAddColumnMenu: (state) => {
      state.addColumnIsOpen = false;
    },
  },
});

export const { openMenu, closeMenu, closeAddColumnMenu, openAddColumnMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
