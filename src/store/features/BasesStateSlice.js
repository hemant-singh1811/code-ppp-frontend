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
      console.log(payload);
      state.bases = state.bases.map((item) => {
        if (payload.baseId === item.baseId) {
          item.tablemetadata.push(payload.data);
          console.log(item.tablemetadata);
        }
        return item;
      });
    },
  },
});

export const { handelAddBases, handelUpdateBases } = BasesStateSlice.actions;

export default BasesStateSlice.reducer;
