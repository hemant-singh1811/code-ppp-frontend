import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { handelAddFiles } from '../../../store/features/fileViewerSlice';
import { TableContext } from '../tableComponents/TableComponents';

export default function ImageReader({ data }) {
  const dispatch = useDispatch();

  const { rowHeight } = useContext(TableContext);

  let images;
  let thumbnails;
  if (Array.isArray(data)) {
    thumbnails = data?.map(({ thumbnails }) => thumbnails?.small);
    images = data?.map(({ url }) => url);
  }

  const activeHeight = rowHeight?.filter(({ isActive }) => {
    return isActive;
  })[0]?.height;

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    Array.isArray(images) && (
      <div className='h-full  overflow-x-scroll overflow-y-hidden scrollbar-hidden'>
        <div className='flex h-full gap-1'>
          {thumbnails.map((image, index) => (
            <img
              src={image?.url}
              onClick={() => {
                openImageViewer(index);
                dispatch(handelAddFiles(images));
              }}
              className={`border h-full rounded-sm  cursor-pointer object-fill `}
              key={index}
              style={{ minWidth: activeHeight - 10 + 'px' }}
              alt='i'
            />
          ))}
        </div>

        {/* <div >
                {isViewerOpen && (
                    <CustomImageViewer
                    // src={images}
                    // currentIndex={currentImage}
                    // onClose={closeImageViewer}
                    // disableScroll={false}
                    // backgroundStyle={{
                    //     backgroundColor: "rgba(0,0,0,0.2)"
                    // }}
                    // closeOnClickOutside={true}
                    />
                )}
            </div> */}
      </div>
    )
  );
}
