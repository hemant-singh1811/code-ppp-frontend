import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bases: [],
};

const BasesStateSlice = createSlice({
  name: 'bases',
  initialState,
  reducers: {
    handelAddBases: (state, { payload }) => {
      state.bases = payload;
    },
    handelUpdateBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseid) {
          item.tablemetadata.push(payload.data);
        }
        return item;
      });
      state.bases = updatedBases;
    },
    // handelUpdateBases: (state, { payload }) => {
    //   let updatedBases = state.bases.map((item) => {
    //     if (payload.baseId === item.baseid) {
    //       item.tablemetadata.push(payload.data);
    //     }
    //     return item;
    //   });
    //   state.bases = updatedBases;
    // },
  },
});

export const { handelAddBases, handelUpdateBases } = BasesStateSlice.actions;

export default BasesStateSlice.reducer;
