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
    handelAddSideBarMenu: (state, { payload }) => {
      state.sidebar = payload;
    },
    handelRemoveSideBarMenu: (state, { payload }) => {
      let updatedSideBar = state.sidebar?.filter((item) => {
        return payload.baseId !== item.baseId;
      });
      state.sidebar = updatedSideBar;
    },
    handelAddSideBarField: (state, { payload }) => {
      let updatedSideBar = state.sidebar?.map((item) => {
        if (payload.baseId === item.baseId) {
          item.subMenu.push(payload.data);
        }
        return item;
      });
      state.sidebar = updatedSideBar;
    },
    handelRemoveSideBarField: (state, { payload }) => {
      let updatedSideBar = state.sidebar?.map((item) => {
        if (payload.baseId === item.baseId) {
          item.subMenu = item.subMenu.filter((ele) => {
            return ele.tableId !== payload.tableId;
          });
          return item;
        } else {
          return item;
        }
      });
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

export const {
  handelAddSideBar,
  handelAddSideBarField,
  handelToggleSideBar,
  handelRemoveSideBarField,
  handelAddSideBarMenu,
  handelRemoveSideBarMenu,
} = SideBarStateSlice.actions;

export default SideBarStateSlice.reducer;
