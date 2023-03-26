import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: [],
};

const SideBarStateSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    handelAddSideBar: (state, { payload }) => {
      state.sidebar = payload;
    },
    handelAddSideBarField: (state, { payload }) => {
      console.log(payload);
      let updatedSideBar = state.sidebar?.map((item) => {
        if (payload.baseId === item.baseId) {
          item.subMenu.push(payload.data);
        }
        return item;
      });
      console.log(updatedSideBar);
      state.sidebar = updatedSideBar;
    },
    handelToggleSideBar: (state, { payload }) => {
      let updatedSidebar = state.sidebar.map((prevMenu) => {
        if (payload.baseId === prevMenu.baseId) {
          prevMenu.isOpened = !prevMenu.isOpened;
        }
        return prevMenu;
      });
      state.sidebar = updatedSidebar;
    },
  },
});

export const { handelAddSideBar, handelAddSideBarField, handelToggleSideBar } =
  SideBarStateSlice.actions;

export default SideBarStateSlice.reducer;
