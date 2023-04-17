import React from "react";
import ImageReader from "../../tableUtilities/ImageReader";
import SingleSelectWithAddOption from "./SingleSelectWithAddOption";
import MultiselectWithAddOption from "./MultiselectWithAddOption";
import CheckBox from "./CheckBox";
import { flexRender } from "@tanstack/react-table";
import DateTableCell from "./DateTableCell";
import UrlTableCell from "./UrlTableCell";
import EmailTableCell from "./EmailTableCell";
import PhoneNumberTableCell from "./PhoneNumberTableCell";
import SingleLineTextCell from "./SingleLineTextCell";
import MultilineTextCell from "./MultilineTextCell";
import AutoNumberCell from "./AutoNumberCell";
import ModifiedAndCreatedCell from "./ModifiedAndCreatedCell";
import ButtonCell from "./ButtonCell";
import MultipleRecordLinksCell from "./MultipleRecordLinksCell";
import MultipleAttachmentsTableCell from "./MultipleAttachmentsTableCell";

export default function CellByFieldType({ field_type, cell }) {
  switch (field_type) {
    case "singleSelect": //array
      return (
        Array.isArray(cell?.getValue()) || cell?.getValue() === "" ?
          <SingleSelectWithAddOption
            columnData={cell.column.columnDef}
            cell={cell}
            rowData={cell?.getValue()}
          />
          : (
            <div className="w-full h-full overflow-hidden">
              {console.log("not getting array in single select", typeof (cell?.getValue()))}
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )
      );

    case "multipleSelects": //array
      return (
        Array.isArray(cell?.getValue()) || cell?.getValue() === "" ?
          <MultiselectWithAddOption
            columnData={cell.column.columnDef}
            cell={cell}
            rowData={cell?.getValue()}
          />
          : (
            <div className="w-full h-full overflow-hidden">
              {console.warn("not getting array in single select", cell?.getValue())}
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )
      );

    case "phoneNumber": //string
      return <SingleLineTextCell cell={cell} />;
      return <PhoneNumberTableCell cell={cell} />;

    case "email": //string
      return <SingleLineTextCell cell={cell} />;
      return <EmailTableCell cell={cell} />;

    case "url": //string
      return <SingleLineTextCell cell={cell} />;
      return <UrlTableCell cell={cell} />;

    // single line text cell and multi line text cell causing problems

    case "singleLineText": //string
      return <SingleLineTextCell cell={cell} />;

    case "multilineText": //string
      return <MultilineTextCell cell={cell} />;

    case "autoNumber": //string
      return <AutoNumberCell cell={cell} />;

    // pending components

    case "multipleAttachments": //array
      return <MultipleAttachmentsTableCell cell={cell} rowData={cell?.getValue()} />;
      return <ImageReader data={cell?.getValue()} />;

    case "checkbox": //boolean
      return (
        <CheckBox
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      );

    case "date": //string
      return <DateTableCell cell={cell} />;

    case "lastModifiedTime": //string
      return <ModifiedAndCreatedCell type={"lastModifiedTime"} cell={cell} />;

    case "lastModifiedBy": //string
      return <ModifiedAndCreatedCell type={"lastModifiedBy"} cell={cell} />;

    case "createdTime": //string
      return <ModifiedAndCreatedCell type={"createdTime"} cell={cell} />;

    case "createdBy": //string
      return <ModifiedAndCreatedCell type={"createdBy"} cell={cell} />;

    case "button": //string
      return <ButtonCell cell={cell} />;

    case "multipleRecordLinks": //string
      return <MultipleRecordLinksCell cell={cell} rowData={cell?.getValue()} />;

    default:
      // console.log(field_type);
      return (
        <div className="w-full h-full overflow-hidden">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );
  }
}
