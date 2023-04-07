import React from 'react'
import ImageReader from '../../tableUtilities/ImageReader'
import SingleSelectWithAddOption from './SingleSelectWithAddOption'
import MultiselectWithAddOption from './MultiselectWithAddOption'
import CheckBox from './CheckBox'
import { flexRender } from '@tanstack/react-table'
import DateTableCell from './DateTableCell'
import UrlTableCell from './UrlTableCell'
import EmailTableCell from './EmailTableCell'
import PhoneNumberTableCell from './PhoneNumberTableCell'
import SingleLineTextCell from './SingleLineTextCell'
import CreateTimeCell from './CreateTimeCell'
import MultilineTextCell from './MultilineTextCell'

export default function CellByFieldType({ field_type, cell }) {

    switch (field_type) {
        case "multipleAttachments":
            return <ImageReader data={cell?.getValue()} />

        case "singleSelect":
            return <SingleSelectWithAddOption columnData={cell.column.columnDef} cell={cell} rowData={cell?.getValue()} />

        case "multipleSelects":
            return <MultiselectWithAddOption columnData={cell.column.columnDef} cell={cell} rowData={cell?.getValue()} />

        case "checkbox":
            return <CheckBox columnData={cell.column.columnDef} cell={cell} rowData={cell?.getValue()} />

        case "date":
            return <DateTableCell cell={cell} />

        case "phoneNumber":
            return <PhoneNumberTableCell cell={cell} />

        case "email":
            return <EmailTableCell cell={cell} />

        case "url":
            return <UrlTableCell cell={cell} />

        case "singleLineText":
            return <SingleLineTextCell cell={cell} />

        case "multilineText":
            return <MultilineTextCell cell={cell} />

        case "createdTime":
            return <CreateTimeCell cell={cell} />

        // case "createdTime":
        //     return <CreateTimeCell cell={cell} />

        default:
            // console.log(field_type)
            return flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
            )
    }

}
