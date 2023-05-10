import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedView: {},
  previousSelectedView: {},
  views: [],
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    handleUpdateSelectedViews: (state, { payload }) => {
      state.previousSelectedView.name = state.selectedView.name;
      state.previousSelectedView.id = state.selectedView.id;
      state.previousSelectedView.model = state.selectedView.model;
      state.selectedView.name = payload.name;
      state.selectedView.id = payload.id;
      state.selectedView.model = payload.model;
    },
    handleAddViews: (state, { payload }) => {
      state.views = state.views.map((ele) => {
        if (payload.type === ele.title) {
          ele.data.push({
            title: payload.viewTitle,
            data: payload.model,
            id: payload.id,
          });
        }
        return ele;
      });
    },
    handelRemoveView: (state, { payload }) => {
      state.views = state.views.map((ele) => {
        ele.data = ele.data.filter((view) => {
          // if (state.selectedView.id === view.id) {
          //   state.selectedView = ele.data[0];
          // }
          return view.id !== payload;
        });

        return ele;
      });
    },
    handelToggleView: (state, { payload }) => {
      state.views = state.views.map((view) => {
        console.log(JSON.stringify(view, null, 2));
        if (view.title === payload) {
          view.collapsed = !view.collapsed;
        }
        return view;
      });
    },
    handelUpdateModel: (state, { payload }) => {
      state.views = state.views.map((view) => {
        view.data = view.data.map((ele) => {
          if (ele.id === payload.id) {
            ele.data = payload.model;
          }
          return ele;
        });
        return view;
      });
    },
    handelAddInitialState: (state, { payload }) => {
      // console.log('handelAddInitialState called');
      if (payload?.sharedview)
        payload?.sharedview?.map((ele, i) => {
          if (i === 0) {
            state.selectedView.name = ele?.metadata?.name;
            state.selectedView.id = ele?.metadata?.views_id;
            state.selectedView.model = ele?.model;
          }
        });
      if (payload?.personalview)
        payload?.sharedview?.map((ele, i) => {
          if (i === 0) {
            state.selectedView.name = ele?.metadata?.name;
            state.selectedView.id = ele?.metadata?.views_id;
            state.selectedView.model = ele?.model;
          }
        });
      state.views = [
        {
          title: 'Personal Views',
          collapsed: true,
          data: payload?.personalview?.map((ele, i) => {
            return {
              title: ele?.metadata?.name,
              data: ele?.model,
              id: ele?.metadata?.views_id,
            };
          }),
        },
        {
          title: 'Shared Views',
          collapsed: true,
          data: payload?.sharedview?.map((ele) => {
            return {
              title: ele?.metadata?.name,
              data: ele?.model,
              id: ele?.metadata?.views_id,
            };
          }),
        },
      ];
    },
  },
});

export const {
  handleUpdateSelectedViews,
  handleAddViews,
  handelUpdateModel,
  handelAddInitialState,
  handelRemoveView,
  handelToggleView,
} = viewsSlice.actions;

export default viewsSlice.reducer;
