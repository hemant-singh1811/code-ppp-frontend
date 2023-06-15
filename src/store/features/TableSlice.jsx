import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: "",
  rowHeight: [
    {
      name: "small",
      isActive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-current"
          viewBox="0 96 960 960"
        >
          <path d="M161.899 260Q145 260 132.5 247.5T120 218q0-17 12.5-29.5t29.399-12.5h636.202Q815 176 827.5 188.5T840 218q0 17-12.5 29.5T798.101 260H161.899Zm0 716Q145 976 132.5 963.5T120 934q0-17 12.5-29.5t29.399-12.5h636.202Q815 892 827.5 904.5T840 934q0 17-12.5 29.5T798.101 976H161.899Zm0-238Q145 738 132.5 725.5T120 696q0-17 12.5-29.5t29.399-12.5h636.202Q815 654 827.5 666.5T840 696q0 17-12.5 29.5T798.101 738H161.899Zm0-240Q145 498 132.5 485.5T120 456q0-17 12.5-29.5t29.399-12.5h636.202Q815 414 827.5 426.5T840 456q0 17-12.5 29.5T798.101 498H161.899Z" />
        </svg>
      ),
      height: 30,
      numberOfLines: 1,
    },
    {
      name: "medium",
      isActive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-current"
          viewBox="0 96 960 960"
        >
          <path d="M161.899 300Q145 300 132.5 287.5T120 258q0-17 12.5-29.5t29.399-12.5h636.202Q815 216 827.5 228.5T840 258q0 17-12.5 29.5T798.101 300H161.899Zm0 636Q145 936 132.5 923.5T120 894q0-17 12.5-29.5t29.399-12.5h636.202Q815 852 827.5 864.5T840 894q0 17-12.5 29.5T798.101 936H161.899Zm0-318Q145 618 132.5 605.5T120 576q0-17 12.5-29.5t29.399-12.5h636.202Q815 534 827.5 546.5T840 576q0 17-12.5 29.5T798.101 618H161.899Z" />
        </svg>
      ),
      height: 46,
      // height: 56,
      numberOfLines: 2,
    },
    {
      name: "large",
      isActive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-current"
          viewBox="0 96 960 960"
        >
          <path d="M161.899 300Q145 300 132.5 287.5T120 258q0-17 12.5-29.5t29.399-12.5h636.202Q815 216 827.5 228.5T840 258q0 17-12.5 29.5T798.101 300H161.899Zm0 636Q145 936 132.5 923.5T120 894q0-17 12.5-29.5t29.399-12.5h636.202Q815 852 827.5 864.5T840 894q0 17-12.5 29.5T798.101 936H161.899Z" />
        </svg>
      ),
      height: 88,
      numberOfLines: 3,
    },
    {
      name: "Extra large",
      isActive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-current"
          viewBox="0 96 960 960"
        >
          <path d="M294 912v-72h72v72h-72Zm150 0v-72h72v72h-72Zm150 0v-72h72v72h-72Zm150-150v-72h72v72h-72Zm0-150v-72h72v72h-72Zm0-150v-72h72v72h-72ZM216 768q-29.7 0-50.85-21.15Q144 725.7 144 696V312q0-29.7 21.15-50.85Q186.3 240 216 240h384q29.7 0 50.85 21.15Q672 282.3 672 312v384q0 29.7-21.15 50.85Q629.7 768 600 768H216Zm0-72h384V312H216v384Zm0 0V312v384Zm528-384v-72q29.7 0 50.85 21.15Q816 282.3 816 312h-72Zm0 600v-72h72q0 30-21.15 51T744 912Zm-528 0q-29.7 0-50.85-21.15Q144 869.7 144 840h72v72Z" />
        </svg>
      ),
      height: 128,
      numberOfLines: 4,
    },
  ],
  activeRowHeight: 30,
  activeNumberOfLines: 1,
  tableData: [],
};
0;
const TableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      // console.log(action.payload.table);
      try {
        state.table = action.payload.table;
      } catch (err) {
        console.log(err);
      }
      // return action.payload.table;
      // let { table } = action.payload.table;
      // Object.defineProperties(table, {
      //   country: {
      //     value: "Germany",
      //     writable: true, // 👈️ set property to writable
      //   },  6
      // });
      // console.log(action.payload.table);
      // return action.payload.table;
    },
    setRowHeight: (state, { payload }) => {
      let updatedRowHeight = state.rowHeight.map((item) => {
        if (item.name === payload.name) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });

      // let updatedActiveRowHeight = 30;
      // let updatedActiveNumberOfLines = 1;

      // updatedRowHeight.map((ele) => {
      //   if (ele.isActive) {
      //     updatedActiveRowHeight = ele.height;
      //     updatedActiveNumberOfLines = ele.numberOfLines;
      //   }
      // });
      // state.activeRowHeight = updatedActiveRowHeight;
      // state.activeNumberOfLines = updatedActiveNumberOfLines;
    },
    setInitialTableData: (state, { payload }) => {
      state.tableData = payload.tableData;
    },
  },
});

export const { setTable, setRowHeight, setInitialTableData } =
  TableSlice.actions;

export default TableSlice.reducer;
