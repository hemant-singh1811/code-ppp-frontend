import React, { useState } from 'react';

export default function CustomImageViewer() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            url: 'https://picsum.photos/id/1018/1000/600/',
            thumbnailUrl: 'https://picsum.photos/id/1018/250/150/',
            alt: 'Image 1',
            description: 'Description of Image 1',
        },
        {
            url: 'https://picsum.photos/id/1015/1000/600/',
            thumbnailUrl: 'https://picsum.photos/id/1015/250/150/',
            alt: 'Image 2',
            description: 'Description of Image 2',
        },
        {
            url: 'https://picsum.photos/id/1019/1000/600/',
            thumbnailUrl: 'https://picsum.photos/id/1019/250/150/',
            alt: 'Image 3',
            description: 'Description of Image 3',
        },
    ];

    const handlePrevious = () => {
        setCurrentIndex(currentIndex => (currentIndex > 0 ? currentIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex(currentIndex => (currentIndex < images.length - 1 ? currentIndex + 1 : 0));
    };

    return (
        <div className='bg-red-400 absolute w-screen h-screen z-50'>
            <div className='flex flex-col'>
                <div>header</div>
                <div className='flex-1'>body</div>
                <div>footer</div>
            </div>

            {/* <div>
                <img src={images[currentIndex].url} alt={images[currentIndex].alt} />
            </div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <p>{images[currentIndex].description}</p> */}
        </div>
    );
}