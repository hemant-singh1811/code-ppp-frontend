import React, { useState, useCallback, useContext } from "react"
import { TableContext } from '../tableComponents/TableComponents';
import ImageGallery from 'react-image-gallery';


export default function AwesomeImageReader({ data }) {


    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];


    // const [currentImage, setCurrentImage] = useState(0);
    // const [isViewerOpen, setIsViewerOpen] = useState(false);
    // const { rowHeight } = useContext(TableContext);

    // let images;
    // let thumbnails;
    // if (Array.isArray(data)) {
    //     thumbnails = data?.map(({ thumbnails }) => thumbnails?.small)
    //     images = data?.map(({ url }) => url)
    // }

    // const activeHeight = rowHeight?.filter(({ isActive }) => {
    //     return isActive
    // })[0]?.height


    // const openImageViewer = useCallback((index) => {
    //     setCurrentImage(index);
    //     setIsViewerOpen(true);
    // }, []);

    // const closeImageViewer = () => {
    //     setCurrentImage(0);
    //     setIsViewerOpen(false);
    // };



    // new ImageViewer({
    //     images: sampleImages,
    //     buttons: [
    //         {
    //             name: 'Edit',
    //             iconSrc: 'cdn.con/icons/edit.svg',
    //             onSelect: () => alert('Edit selected!')
    //         },
    //         {
    //             name: 'Delete',
    //             iconSrc: 'cdn.con/icons/delete.svg',
    //             iconSize: '18px auto',
    //             onSelect: () => alert('Delete selected!')
    //         }
    //     ]
    // });
    return Array.isArray(images) && (
        <div>
            <ImageGallery items={images} />;
        </div>
    )
}
