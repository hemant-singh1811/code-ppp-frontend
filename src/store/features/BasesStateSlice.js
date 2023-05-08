import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bases: [],
};

const BasesStateSlice = createSlice({
  name: 'bases',
  initialState,
  reducers: {
    // handel updates in bases state
    handelAddBases: (state, { payload }) => {
      state.bases = payload;
    },
    handelRemoveBases: (state, { payload }) => {
      let updatedBases = state.bases.filter(
        ({ baseid }) => baseid !== payload.baseId
      );
      state.bases = updatedBases;
    },
    handelRenameBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (item.baseid === payload.baseId) {
          item.basemetadata.name = payload.updatedName;
        }
        return item;
      });
      state.bases = updatedBases;
    },

    // handel updates in table state
    handelAddTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseid) {
          item.tablemetadata.push(payload.data);
        }
        return item;
      });
      state.bases = updatedBases;
    },
    handelRemoveTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseid) {
          item.tablemetadata.filter((item) => {});
        }
        return item;
      });
      state.bases = updatedBases;
    },
    handelRenameTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseid) {
          item.tablemetadata = item.tablemetadata.map((ele) => {
            if (ele.table_id === payload.tableId) {
              ele.table_name = payload.updatedName;
            }
            return ele;
          });
        }
        return item;
      });
      state.bases = updatedBases;
    },
  },
});

export const {
  handelRenameTableInBases,
  handelRenameBases,
  handelAddBases,
  handelAddTableInBases,
  handelRemoveBases,
  handelRemoveTableInBases,
} = BasesStateSlice.actions;

export default BasesStateSlice.reducer;
