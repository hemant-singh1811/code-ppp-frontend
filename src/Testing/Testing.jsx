import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Testing() {
  return (
    <Popover className="relative  bg-yellow-300">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Solutions</span>
          </Popover.Button>
          <Transition
            className="bg-blue-700"
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 w-56 h-40 bg-red-400 ring-black ring-opacity-5"></div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

// import React, { useEffect, useState } from 'react'
// import './index.css'
// import { useVirtualizer } from '@tanstack/react-virtual'

// const rows = new Array(10000)
//     .fill(true)
//     .map(() => 25 + Math.round(Math.random() * 100))

// const columns = new Array(10000)
//     .fill(true)
//     .map(() => 75 + Math.round(Math.random() * 100))

// export default function Testing() {
//     return (
//         <div className='text-black'>
//             <p>
//                 These components are using <strong>variable</strong> sizes. This means
//                 that each element has a unique, but knowable dimension at render time.
//             </p>
//             <br />
//             <br />

//             <h3>Grid</h3>
//             <GridVirtualizerVariable rows={rows} columns={columns} />
//             {process.env.NODE_ENV === 'development' ? (
//                 <p>
//                     <strong>Notice:</strong> You are currently running React in
//                     development mode. Rendering performance will be slightly degraded
//                     until this application is build for production.
//                 </p>
//             ) : null}
//         </div>
//     )
// }

// function GridVirtualizerVariable({ rows, columns }) {
//     const parentRef = React.useRef()

//     console.log(rows)

//     const rowVirtualizer = useVirtualizer({
//         count: rows.length,
//         getScrollElement: () => parentRef.current,
//         estimateSize: (i) => { return (rows[i]) },
//         overscan: 5,
//     })

//     const columnVirtualizer = useVirtualizer({
//         horizontal: true,
//         count: columns.length,
//         getScrollElement: () => parentRef.current,
//         estimateSize: (i) => columns[i],
//         overscan: 5,
//     })

//     return (
//         <>
//             <div
//                 ref={parentRef}
//                 className="List text-black"
//                 style={{
//                     height: `400px`,
//                     width: `500px`,
//                     overflow: 'auto',
//                 }}
//             >
//                 <div
//                     className='bg-yellow-100'
//                     style={{
//                         height: `${rowVirtualizer.getTotalSize()}px`,
//                         width: `${columnVirtualizer.getTotalSize()}px`,
//                         position: 'relative',
//                     }}
//                 >
//                     {rowVirtualizer.getVirtualItems().map((virtualRow) => (
//                         <React.Fragment key={virtualRow.index}>
//                             {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
//                                 <div
//                                     key={virtualColumn.index}
//                                     className={
//                                         virtualColumn.index % 2
//                                             ? virtualRow.index % 2 === 0
//                                                 ? 'ListItemOdd'
//                                                 : 'ListItemEven'
//                                             : virtualRow.index % 2
//                                                 ? 'ListItemOdd'
//                                                 : 'ListItemEven'
//                                     }
//                                     style={{
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         width: `${columns[virtualColumn.index]}px`,
//                                         height: `${rows[virtualRow.index]}px`,
//                                         transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
//                                     }}
//                                 >
//                                     Cell {virtualRow.index}, {virtualColumn.index}
//                                 </div>
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }
