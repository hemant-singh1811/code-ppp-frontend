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
    handelToggleSideBar: (state, { payload }) => {
      let updatedSidebar = state.sidebar.map((prevMenu) => {
        if (payload.baseId === prevMenu.baseId) {
          prevMenu.isOpened = !prevMenu.isOpened;
        }
        return prevMenu;
      });
      state.sidebar = updatedSidebar;
    },

    // updates on bases in side bar
    handelAddSideBarMenu: (state, { payload }) => {
      state.sidebar = [...state.sidebar, payload];
    },
    handelRemoveSideBarMenu: (state, { payload }) => {
      let updatedSideBar = state.sidebar?.filter((item) => {
        return payload.baseId !== item.baseId;
      });
      state.sidebar = updatedSideBar;
    },
    handelRenameSideBarMenu: (state, { payload }) => {
      let updatedSidebar = state.sidebar.map((item) => {
        if (item.baseId === payload.baseId) {
          console.log(payload.updatedName);
          item.title = payload.updatedName;
        }
        return item;
      });
      state.sidebar = updatedSidebar;
    },

    // updates on tables in side bar
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
    handelRenameSideBarField: (state, { payload }) => {
      let updatedSidebar = state.sidebar.map((item) => {
        if (payload.baseId === item.baseId) {
          item.subMenu = item.subMenu.map((ele) => {
            if (ele.tableId === payload.tableId) {
              ele.title = payload.updatedName;
            }
            return ele;
          });
        }
        return item;
      });
      state.sidebar = updatedSidebar;
    },
  },
});

export const {
  handelAddSideBar,
  handelAddSideBarField,
  handelAddSideBarMenu,
  handelToggleSideBar,
  handelRemoveSideBarField,
  handelRemoveSideBarMenu,
  handelRenameSideBarMenu,
  handelRenameSideBarField,
} = SideBarStateSlice.actions;

export default SideBarStateSlice.reducer;
