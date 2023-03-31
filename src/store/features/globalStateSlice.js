import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  filter: [
    {
      name: 'Booked',
      isSelected: true,
    },
    {
      name: 'In Transit',
      isSelected: true,
    },
    {
      name: 'Kent Yard',
      isSelected: true,
    },
  ],
  mainSideBar: {
    toggle: false,
    width: 270,
  },
  addTableToggle: false,
  createTableBaseId: undefined,
  selectedTableId: undefined,
  selectedBaseId: undefined,
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    onChangeSearch: (state, { payload }) => {
      state.search = payload;
    },
    handleFilterChange: (state, { payload }) => {
      state.filter = state.filter.map((ele) => {
        if (ele.name === payload.name) {
          ele.isSelected = !ele.isSelected;
        }
        return ele;
      });
    },
    handleToggleMainSideBar: (state) => {
      state.mainSideBar.toggle = !state.mainSideBar.toggle;
      if (state.mainSideBar.toggle) {
        state.mainSideBar.width = 80;
      } else {
        state.mainSideBar.width = 270;
      }
    },
    handleAddToggle: (state, { payload }) => {
      state.addTableToggle = payload;
    },
    handleCreateTableBaseId: (state, { payload }) => {
      state.createTableBaseId = payload;
    },
  },
});

export const {
  onChangeSearch,
  handleFilterChange,
  handleToggleMainSideBar,
  handleAddToggle,
  handleCreateTableBaseId,
} = globalStateSlice.actions;

export default globalStateSlice.reducer;
