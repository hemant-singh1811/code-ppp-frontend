import { useState } from 'react';

export default function OpenOptionOnClick() {
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event) => {
        event.preventDefault();
        setIsContextMenuOpen(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const handleCloseContextMenu = () => {
        setIsContextMenuOpen(false);
    };

    return (
        <div onContextMenu={handleContextMenu} className='w-24 bg-yellow-100 '>
            {isContextMenuOpen && (
                <ContextMenu onClose={handleCloseContextMenu} x={contextMenuPosition.x} y={contextMenuPosition.y}>
                    <MenuItem label="Open" onClick={() => console.log('Open clicked')} />
                </ContextMenu>
            )}
        </div>
    );
}

function ContextMenu({ children, onClose, x, y }) {
    const [menuWidth, setMenuWidth] = useState(0);
    const [menuHeight, setMenuHeight] = useState(0);
    const [menuLeft, setMenuLeft] = useState(0);
    const [menuTop, setMenuTop] = useState(0);

    const handleRef = (node) => {
        if (node !== null) {
            setMenuWidth(node.offsetWidth);
            setMenuHeight(node.offsetHeight);
            setMenuLeft(Math.min(x, window.innerWidth - node.offsetWidth));
            setMenuTop(Math.min(y, window.innerHeight - node.offsetHeight));
        }
    };

    return (
        <>
            <div className="fixed inset-0" onClick={onClose} />
            <div ref={handleRef} className="fixed bg-white p-2 rounded shadow" style={{ left: menuLeft, top: menuTop }}>
                {children}
            </div>
        </>
    );
}

function MenuItem({ label, onClick }) {
    return (
        <div className="px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={onClick}>
            {label}
        </div>
    );
}

