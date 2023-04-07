import React from 'react'
import Flatpickr from 'react-flatpickr';

export default function DateTableCell() {
    const options = {
        static: true,
        monthSelectorType: 'static',
        dateFormat: 'd-m-Y',
    }
    return <Flatpickr className=" w-full h-full min-h-[29px] px-2" placeholder='DD/MM/YYYY' options={options} />
}
