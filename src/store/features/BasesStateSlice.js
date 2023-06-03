import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bases: [],
};

const BasesStateSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    // handel updates in bases state
    handelAddBases: (state, { payload }) => {
      let isBasePresent = state.bases.filter(
        (baseId) => baseId === payload.baseId
      );
      if (isBasePresent.length === 0) {
        state.bases = [...state.bases, ...payload];
      }
    },
    handelRemoveBases: (state, { payload }) => {
      let updatedBases = state.bases.filter(
        ({ baseId }) => baseId !== payload.baseId
      );
      state.bases = updatedBases;
    },
    handelRenameBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (item.baseId === payload.baseId) {
          item.baseMetaData.baseName = payload.updatedName;
        }
        return item;
      });
      state.bases = updatedBases;
    },

    // handel updates in table state
    handelAddTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseId) {
          console.log(payload.data);
          item.tableMetaData.push(payload.data);
        }
        return item;
      });
      state.bases = updatedBases;
    },
    handelRemoveTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseId) {
          item.tableMetaData = item.tableMetaData.filter(
            (item) => item.tableId !== payload.tableId
          );
        }
        return item;
      });
      state.bases = updatedBases;
    },
    handelRenameTableInBases: (state, { payload }) => {
      let updatedBases = state.bases.map((item) => {
        if (payload.baseId === item.baseId) {
          item.tableMetaData = item.tableMetaData.map((ele) => {
            if (ele.tableId === payload.tableId) {
              ele.tableName = payload.updatedName;
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
