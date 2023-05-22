import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  search: "",
  filter: [
    {
      name: "Booked",
      isSelected: true,
    },
    {
      name: "In Transit",
      isSelected: true,
    },
    {
      name: "Kent Yard",
      isSelected: true,
    },
  ],
  mainSideBar: {
    toggle: false,
    width: 280,
  },
  addToggle: {
    type: "",
    isOpen: false,
    action: "",
    baseId: "",
    tableId: "",
    name: "",
  },
  createTableBaseId: undefined,
  selectedTableId: undefined || window.location.pathname.split("/")[2],
  selectedBaseId: undefined || window.location.pathname.split("/")[1],
  modal: {
    isOpen: false,
    content: {
      heading: "",
      description: "",
      action: "",
      icon: "",
      color: "",
      baseId: "",
      target: "",
      tableId: "",
      name: "",
    },
  },
  formModal: {
    isOpen: false,
    data: {},
    columns: [],
  },
  tableWithMultipleRecords: [],
  isViewsOpen: false,
  rowsUtility: {
    selectedRow: null,
    hoveredRow: null,
    activeRow: null,
  },
  linkedRecordsData: undefined,
};

const globalStateSlice = createSlice({
  name: "globalState",
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
      state.addToggle.isOpen = payload?.isOpen;
      state.addToggle.type = payload?.type;
      state.addToggle.action = payload?.action;
      state.addToggle.baseId = payload?.baseId;
      state.addToggle.tableId = payload?.tableId;
      state.addToggle.name = payload?.name;
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
      state.modal.content.heading = payload?.content?.heading;
      state.modal.content.description = payload?.content?.description;
      state.modal.content.action = payload?.content?.action;
      state.modal.content.icon = payload?.content?.icon;
      state.modal.content.color = payload?.content?.color;
      state.modal.content.target = payload?.content?.target;
      state.modal.content.baseId = payload?.content?.baseId;
      state.modal.content.tableId = payload?.content?.tableId;
      state.modal.content.name = payload?.content?.name;
    },
    handelCloseModal: (state) => {
      state.modal.isOpen = false;
    },
    handelViewsToggle: (state) => {
      state.isViewsOpen = !state.isViewsOpen;
    },
    handelAddTableWithMultipleRecords: (state, { payload }) => {
      state.tableWithMultipleRecords = payload;
    },
    handelHoverRow: (state, { payload }) => {
      state.rowsUtility.hoveredRow = payload;
    },
    handleFormModal: (state, { payload }) => {
      state.formModal.isOpen = payload.isOpen;
      state.formModal.data = payload.data;
      state.formModal.columns = payload.columns;
      state.formModal.index = payload.id;
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
  handelAddTableWithMultipleRecords,
  handelViewsToggle,
  handelHoverRow,
  handleFormModal,
} = globalStateSlice.actions;

export default globalStateSlice.reducer;
