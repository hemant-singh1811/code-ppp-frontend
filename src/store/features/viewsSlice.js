import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  id: "",
  model: [],
};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    handleUpdateViews: (state, { payload }) => {
      state.name = payload.name;
      state.id = payload.id;
      state.model = payload.model;
    },
  },
});

export const { handleUpdateViews } = viewsSlice.actions;

export default viewsSlice.reducer;
