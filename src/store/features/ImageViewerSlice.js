import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  active: false,
};

const ImageViewerSlice = createSlice({
  name: 'imagesViewer',
  initialState,
  reducers: {
    handelAddImage: (state, { payload }) => {
      state.images = payload;
      state.active = payload;
    },
  },
});

export const { handelAddImage } = ImageViewerSlice.actions;

export default ImageViewerSlice.reducer;
