import { createSlice } from '@reduxjs/toolkit';
// import { useLocation } from 'react-router-dom';

// const location = useLocation();
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
    width: 280,
  },
  addToggle: {
    type: '',
    isOpen: false,
  },
  createTableBaseId: undefined,
  selectedTableId: undefined || window.location.pathname.split('/')[2],
  selectedBaseId: undefined || window.location.pathname.split('/')[1],
  modal: {
    isOpen: false,
    content: {
      heading: '',
      description: '',
      action: '',
      icon: '',
      color: '',
      baseId: '',
      target: '',
      tableId: '',
      name: '',
    },
  },
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
      //{ isOpen: true, type: 'table' }
      state.addToggle.isOpen = payload.isOpen;
      state.addToggle.type = payload.type;
    },
    handleCreateTableBaseId: (state, { payload }) => {
      state.createTableBaseId = payload;
    },
    handelSelectedTableAndBaseId: (state, { payload }) => {
      if (payload?.selectedTableId)
        state.selectedTableId = payload?.selectedTableId;

      if (payload?.selectedBaseId)
        state.selectedBaseId = payload?.selectedBaseId;
    },
    handelOpenModal: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.content.heading = payload.content.heading;
      state.modal.content.description = payload.content.description;
      state.modal.content.action = payload.content.action;
      state.modal.content.icon = payload.content.icon;
      state.modal.content.color = payload.content.color;
      state.modal.content.baseId = payload.content.baseId;
      state.modal.content.target = payload.content.target;
      state.modal.content.tableId = payload.content.tableId;
      state.modal.content.name = payload.content.name;
    },
    handelCloseModal: (state) => {
      state.modal.isOpen = false;
    },
  },
});

export const {
  onChangeSearch,
  handleFilterChange,
  handleToggleMainSideBar,
  handleAddToggle,
  handleCreateTableBaseId,
  handelSelectedTableAndBaseId,
  handelOpenModal,
  handelCloseModal,
} = globalStateSlice.actions;

export default globalStateSlice.reducer;
