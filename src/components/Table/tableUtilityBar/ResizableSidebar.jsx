import React, { useRef, useEffect } from 'react';
import { ViewsComponent } from './tableViews/TableUtilityViews';

export const ResizableSidebar = () => {
  const ref = useRef(null);
  const refRight = useRef(null);

  useEffect(() => {
    const reSizeAbleEle = ref.current;
    const styles = window.getComputedStyle(reSizeAbleEle);
    let width = parseInt(styles.width, 10);
    let x = 0;

    reSizeAbleEle.style.top = '0px';
    reSizeAbleEle.style.left = '0px';

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      reSizeAbleEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      reSizeAbleEle.style.left = styles.left;
      reSizeAbleEle.style.right = null;
      document.addEventListener('mousemove', onMouseMoveRightResize);
      document.addEventListener('mouseup', onMouseUpRightResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener('mousedown', onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='relative w-[100px] h-[calc(100vh_-_40px)] min-w-[250px] max-w-[600px] '>
      <ViewsComponent />
      <div
        ref={refRight}
        className='absolute resizer cursor-col-resize h-full hover:bg-[#ababab] bg-[#ababab] '></div>
    </div>
  );
};

export default ResizableSidebar;
