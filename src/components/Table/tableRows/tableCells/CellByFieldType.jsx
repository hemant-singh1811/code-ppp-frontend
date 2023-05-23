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
import DefaultSelectCell from "./DefaultSelectCell";
import CreatedByCell from "./CreatedByCell";

export function CellByFieldType({ hiddenInConditions, fieldType, cell, row }) {
  if (hiddenInConditions) {
    return (
      <DefaultSelectCell
        data={row}
        checked={row?.getIsSelected()}
        indeterminate={row?.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    );
  }
  switch (fieldType) {
    case "singleSelect": //array
      return Array.isArray(cell?.getValue()) ||
        cell?.getValue() === "" ||
        cell?.getValue() === undefined ? (
        <SingleSelectWithAddOption
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      ) : (
        <div className="w-full h-full overflow-hidden">
          {console.log(
            "not getting array in single select",
            typeof cell?.getValue()
          )}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );

    case "multipleSelect": //array
      return Array.isArray(cell?.getValue()) ||
        cell?.getValue() === "" ||
        cell?.getValue() === undefined ? (
        <MultiselectWithAddOption
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      ) : (
        <div className="w-full h-full overflow-hidden">
          {console.warn("not getting array in multi select", cell?.getValue())}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
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

    case "attachments": //array
      return (
        <MultipleAttachmentsTableCell cell={cell} rowData={cell?.getValue()} />
      );
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
      return <CreatedByCell cell={cell} rowData={cell?.getValue()} />;

    case "button": //string
      return <ButtonCell cell={cell} />;

    case "linkedRecords": //string
      return <MultipleRecordLinksCell cell={cell} rowData={cell?.getValue()} />;

    default:
      return (
        <div className="w-full h-full overflow-hidden flex items-center justify-center bg-transparent">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );
  }
}

export default React.memo(CellByFieldType);
