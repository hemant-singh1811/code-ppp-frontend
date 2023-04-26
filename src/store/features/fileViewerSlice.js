import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  isOpen: false,
  index: 99,
  cell: '',
};

const ImageViewerSlice = createSlice({
  name: 'fileViewer',
  initialState,
  reducers: {
    handelAddFiles: (state, { payload }) => {
      state.files = payload.files;
      state.index = payload.index;
      state.isOpen = true;
      state.cell = payload.cell;
    },
    handelToggleFilesModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    handelRemoveFiles: (state, { payload }) => {
      state.files = state.files.filter((file) => {
        return file.id !== payload.id;
      });
    },
    handelUpdateFiles: (state, { payload }) => {
      state.files = [...state.files, ...payload];
    },
  },
});

export const {
  handelAddFiles,
  handelToggleFilesModal,
  handelRemoveFiles,
  handelUpdateFiles,
} = ImageViewerSlice.actions;

export default ImageViewerSlice.reducer;
