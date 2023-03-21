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
  selectedScreen: [
    {
      name: 'Chats',
      isActive: true,
    },
    {
      name: 'Chats',
      isActive: false,
    },
    {
      name: 'Chats',
      isActive: false,
    },
    {
      name: 'Chats',
      isActive: false,
    },
    {
      name: 'Chats',
      isActive: false,
    },
  ],
  screenTabsToggle: false,
  mainSideBar: {
    toggle: false,
    width: 270,
  },
  addTableToggle: false,
  sidebarData: [],
  createTableBaseId: undefined,
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
    handleSelectedScreen: (state, { payload }) => {
      state.selectedScreen = state.selectedScreen.map((ele) => {
        if (ele.name === payload.name) {
          ele.isActive = true;
        } else {
          ele.isActive = false;
        }
        return ele;
      });
    },
    handleScreenTabsToggle: (state) => {
      state.screenTabsToggle = !state.screenTabsToggle;
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
    handleAddSidebarData: (state, { payload }) => {
      state.sidebarData = payload;
    },
    handleCreateTableBaseId: (state, { payload }) => {
      state.createTableBaseId = payload;
    },
  },
});

export const {
  onChangeSearch,
  handleFilterChange,
  handleSelectedScreen,
  handleScreenTabsToggle,
  handleToggleMainSideBar,
  handleAddToggle,
  handleAddSidebarData,
  handleCreateTableBaseId,
} = globalStateSlice.actions;

export default globalStateSlice.reducer;
