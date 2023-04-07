import React, { useState } from 'react'

export default function CheckBox({ columnData, cell, rowData }) {

    const [isSelected, seIsSelected] = useState(rowData)
    // const [, set] = useState()
    // console.log(rowData)

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <input type="checkbox" className='my-auto' name="" id="" checked={isSelected} onChange={() => seIsSelected(!isSelected)} />
        </div>
    )
}
