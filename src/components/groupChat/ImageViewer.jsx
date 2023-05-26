import React from 'react'
import Viewer from 'react-viewer';

export default function ImageViewer() {
    const [visible, setVisible] = React.useState(false);

    return (
        <div>
            <button onClick={() => { setVisible(true); }}>show</button>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); }}
                activeIndex={2}
                images={[
                    { src: '/demo1.jpg', alt: '' },
                    { src: '/demo.jpg', alt: '' },
                    { src: '/demo2.jpg', alt: '' },
                ]}
            />
        </div>
    )
}
