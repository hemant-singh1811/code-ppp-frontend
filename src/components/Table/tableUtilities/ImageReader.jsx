import React, { useState, useCallback } from "react"
import ImageViewer from "react-simple-image-viewer";

export default function ImageReader({ data }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    let images;
    let thumbnails;
    if (data) {
        thumbnails = data?.map(({ thumbnails }) => thumbnails?.large?.url)
        images = data?.map(({ url }) => url)
    }

    console.log(data)
    // console.log(thumbnails)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return Array.isArray(images) && (
        <div className=" h-full -mt-1 overflow-x-scroll overflow-y-hidden scrollbar-hidden">
            <div className="flex gap-2  h-full m-1 p-1">
                {thumbnails.map((src, index) => (
                    <img
                        src={src}
                        onClick={() => openImageViewer(index)}
                        className=" min-w-[50px] w-[50px] h-full object-cover cursor-pointer"
                        key={index}
                        alt="img"
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
