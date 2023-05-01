import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  id: '',
  model: [],
  selectedTableViews: {
    personalview: [],
    sharedview: [],
  },
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
    handelAddView: (state, { payload }) => {
      state.selectedTableViews.sharedview.push();
    },
    handelUpdateModel: (state, { payload }) => {
      // name: title,
      // id: id,
      // model: model,
      let personalview = state.selectedTableViews.personalview.map(
        (view, i) => {
          if (view.metadata.views_id === payload.id) {
            view.model = payload.model;
          }
          return view;
        }
      );
      let sharedview = state.selectedTableViews.sharedview.map((view, i) => {
        if (view.metadata.views_id === payload.id) {
          view.model = payload.model;
        }
        return view;
      });

      state.selectedTableViews = { personalview, sharedview };
    },
  },
});

export const {
  handleUpdateViews,
  handleAddSelectedTableViews,
  handelUpdateModel,
} = viewsSlice.actions;

export default viewsSlice.reducer;
