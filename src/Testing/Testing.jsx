import React from 'react'
import './index.css'
import { useVirtualizer } from '@tanstack/react-virtual'

const rows = new Array(10000)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 100))

const columns = new Array(10000)
    .fill(true)
    .map(() => 75 + Math.round(Math.random() * 100))

export default function Testing() {
    return (
        <div className='text-black'>
            <p>
                These components are using <strong>variable</strong> sizes. This means
                that each element has a unique, but knowable dimension at render time.
            </p>
            <br />
            <br />

            <h3>Grid</h3>
            <GridVirtualizerVariable rows={rows} columns={columns} />


            {/* <h3>Rows</h3>
      <RowVirtualizerVariable rows={rows} />
      <br />
      <br />
      <h3>Columns</h3>
      <ColumnVirtualizerVariable columns={columns} />
      <br />
      <br /> */}
            {/* <br />
      <br />
      <h3>Masonry (vertical)</h3>
      <MasonryVerticalVirtualizerVariable rows={rows} />
      <br />
      <br />
      <h3>Masonry (horizontal)</h3>
      <MasonryHorizontalVirtualizerVariable rows={rows} />
      <br />
      <br /> */}
            {process.env.NODE_ENV === 'development' ? (
                <p>
                    <strong>Notice:</strong> You are currently running React in
                    development mode. Rendering performance will be slightly degraded
                    until this application is build for production.
                </p>
            ) : null}
        </div>
    )
}

function GridVirtualizerVariable({ rows, columns }) {
    const parentRef = React.useRef()

    console.log(rows)

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (i) => { return (rows[i]) },
        overscan: 5,
    })

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: columns.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (i) => columns[i],
        overscan: 5,
    })

    // console.log(rowVirtualizer.getTotalSize())
    // console.log(columnVirtualizer.getTotalSize())

    return (
        <>
            <div
                ref={parentRef}
                className="List text-black"
                style={{
                    height: `400px`,
                    width: `500px`,
                    overflow: 'auto',
                }}
            >
                <div
                    className='bg-yellow-100'
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: `${columnVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <React.Fragment key={virtualRow.index}>
                            {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                                <div
                                    key={virtualColumn.index}
                                    className={
                                        virtualColumn.index % 2
                                            ? virtualRow.index % 2 === 0
                                                ? 'ListItemOdd'
                                                : 'ListItemEven'
                                            : virtualRow.index % 2
                                                ? 'ListItemOdd'
                                                : 'ListItemEven'
                                    }
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: `${columns[virtualColumn.index]}px`,
                                        height: `${rows[virtualRow.index]}px`,
                                        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    Cell {virtualRow.index}, {virtualColumn.index}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

