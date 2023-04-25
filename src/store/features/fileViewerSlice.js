import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  isOpen: false,
};

const ImageViewerSlice = createSlice({
  name: 'fileViewer',
  initialState,
  reducers: {
    handelAddFiles: (state, { payload }) => {
      state.files = payload;
      state.isOpen = true;
    },
    handelToggleFilesModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handelAddFiles, handelToggleFilesModal } =
  ImageViewerSlice.actions;

export default ImageViewerSlice.reducer;
