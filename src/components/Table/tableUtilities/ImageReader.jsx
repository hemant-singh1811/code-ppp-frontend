import React, { useState, useCallback, useContext } from "react"
import ImageViewer from "react-simple-image-viewer";
import { TableContext } from "../tableComponents/TableComponents";

export default function ImageReader({ data }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const { rowHeight } = useContext(TableContext);

    let images;
    let thumbnails;
    if (Array.isArray(data)) {
        thumbnails = data?.map(({ thumbnails }) => thumbnails?.small)
        images = data?.map(({ url }) => url)
    }

    const activeHeight = rowHeight?.filter(({ isActive }) => {
        return isActive
    })[0]?.height



    // console.log(activeHeight)
    // console.log(thumbnails)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    function checkImage(url) {
        var image = new Image();
        image.onload = function () {
            if (this.width > 0) {
                return true
                console.log("image exists");
            }
        }
        image.onerror = function () {
            return false
            console.log("image doesn't exist");
        }
        image.src = url;
    }

    // overflow-x-scroll overflow-y-hidden scrollbar-hidden
    return Array.isArray(images) && (
        <div className="h-full overflow-x-scroll overflow-y-hidden scrollbar-hidden">
            <div className="flex h-full gap-1">
                {thumbnails.map((image, index) => (
                    <img
                        src={image?.url}
                        onClick={() => { console.log(image); openImageViewer(index) }}
                        className={`border h-full rounded-sm  cursor-pointer object-fill `}
                        key={index}
                        style={{ minWidth: activeHeight - 10 + 'px' }}
                        alt="i"
                    />
                ))}
            </div>

            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
        </div>
    );
}
