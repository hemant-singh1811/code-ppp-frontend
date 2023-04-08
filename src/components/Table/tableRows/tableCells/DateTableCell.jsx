import React, { useContext, useState } from 'react'
import Flatpickr from 'react-flatpickr';
import { TableContext } from '../../tableComponents/TableComponents';
import { useSelector } from 'react-redux';

export default function DateTableCell({ cell }) {

    const socket = useSelector((state) => state.socketWebData.socket);
    const [value, setValue] = useState(cell?.getValue());
    const { table } = useContext(TableContext);

    const options = {
        static: true,
        monthSelectorType: 'static',
        dateFormat: 'd-m-Y',
    }



    return <Flatpickr
        value={value}
        onChange={([date]) => {
            setValue(date);

            table.options.meta?.updateData(cell.row.index, cell.column.id, date);

            let newRowPart = { [cell?.column.id]: date };

            let rowObj = {
                base_id: "",
                table_id: location.pathname.split("/")[2],
                record_id: cell?.row?.original.id52148213343234567,
                updated_data: newRowPart,
            };

            socket.emit("updatedata", rowObj, (response) => {
                console.log("res : ", response);
            });

        }}
        className=" w-full h-full min-h-[29px] px-2"
        placeholder='DD/MM/YYYY'
        options={options}
    />
}
