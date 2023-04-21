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
    handelRenameTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseid) {
          item.tablemetadata = item.tablemetadata.map((ele) => {
            console.log(
              'fdasf daf dasf daf d================================================================'
            );
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
