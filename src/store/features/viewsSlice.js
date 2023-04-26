import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  id: '',
  model: [],
  selectedTableViews: '',
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    handleUpdateViews: (state, { payload }) => {
      state.name = payload.name;
      state.id = payload.id;
      state.model = payload.model;
    },
    handleAddSelectedTableViews: (state, { payload }) => {
      state.selectedTableViews = payload;

      payload?.personalview?.map((ele, i) => {
        if (i === 0) {
          state.name = ele?.metadata?.name;
          state.id = ele?.metadata?.views_id;
          state.model = ele?.model;
        }
      });
    },
  },
});

export const { handleUpdateViews, handleAddSelectedTableViews } =
  viewsSlice.actions;

export default viewsSlice.reducer;
