import React from "react";
import SingleSelectWithAddOption from "./SingleSelectWithAddOption";
import MultiselectWithAddOption from "./MultiselectWithAddOption";
import CheckBox from "./CheckBox";
import { flexRender } from "@tanstack/react-table";
import DateTableCell from "./DateTableCell";
import SingleLineTextCell from "./SingleLineTextCell";
import MultilineTextCell from "./MultilineTextCell";
import AutoNumberCell from "./AutoNumberCell";
import ModifiedAndCreatedCell from "./ModifiedAndCreatedCell";
import ButtonCell from "./ButtonCell";
import MultipleRecordLinksCell from "./MultipleRecordLinksCell";
import MultipleAttachmentsTableCell from "./MultipleAttachmentsTableCell";
import DefaultSelectCell from "./DefaultSelectCell";
import NumberCell from "./NumberCell";
import CurrencyCell from "./CurrencyCell";
import PercentCell from "./PercentCell";
import DurationCell from "./DurationCell";

export function CellByFieldType({
  hiddenInConditions,
  fieldType,
  cell,
  row,
  isHovered,
}) {
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

  if (
    fieldType === "lastModifiedTime" ||
    fieldType === "createdTime" ||
    fieldType === "createdBy" ||
    fieldType === "lastModifiedBy"
  ) {
    return <ModifiedAndCreatedCell type={fieldType} cell={cell} />;
  } else if (
    fieldType === "phoneNumber" ||
    fieldType === "email" ||
    fieldType === "url" ||
    fieldType === "barcode" ||
    fieldType === "singleLineText"
  ) {
    return <SingleLineTextCell cell={cell} />;
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
        <div className='w-full h-full overflow-hidden'>
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
        <div className='w-full h-full overflow-hidden'>
          {console.warn("not getting array in multi select", cell?.getValue())}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );

    // case "phoneNumber": //string
    //   return <SingleLineTextCell cell={cell} />;
    //   return <PhoneNumberTableCell cell={cell} />;

    // case "email": //string
    //   return <SingleLineTextCell cell={cell} />;
    //   return <EmailTableCell cell={cell} />;

    // case "url": //string
    //   return <SingleLineTextCell cell={cell} />;
    //   return <UrlTableCell cell={cell} />;

    // case "barcode": //string
    //   return <SingleLineTextCell cell={cell} />;
    // // single line text cell and multi line text cell causing problems

    // case "singleLineText": //string
    //   return <SingleLineTextCell cell={cell} />;

    case "number": //string
      return <NumberCell cell={cell} />;

    case "currency": //string
      return <CurrencyCell cell={cell} />;

    case "percent": //string
      return <PercentCell cell={cell} />;

    case "duration": //string
      return <DurationCell cell={cell} />;

    case "multilineText": //string
      return <MultilineTextCell cell={cell} />;

    case "autoNumber": //string
      return <AutoNumberCell cell={cell} />;

    case "attachments": //array
      return (
        <MultipleAttachmentsTableCell cell={cell} rowData={cell?.getValue()} />
      );

    case "checkbox": //boolean
      return (
        <CheckBox
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
          isHovered={isHovered}
        />
      );

    case "date": //string
      return <DateTableCell cell={cell} />;

    case "button": //string
      return <ButtonCell cell={cell} />;

    case "linkedRecords": //string
      return <MultipleRecordLinksCell cell={cell} rowData={cell?.getValue()} />;

    default:
      return (
        <div className='w-full h-full overflow-hidden flex items-center justify-center bg-transparent'>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      );
  }
}

export default CellByFieldType;

// case "singleSelect": //array
// return Array.isArray(cell?.getValue()) ||
//   cell?.getValue() === "" ||
//   cell?.getValue() === undefined ? (
//   <SingleSelectWithAddOption
//     columnData={cell.column.columnDef}
//     cell={cell}
//     rowData={cell?.getValue()}
//   />
// ) : (
//   <div className='w-full h-full overflow-hidden'>
//     {console.log(
//       "not getting array in single select",
//       typeof cell?.getValue()
//     )}
//     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//   </div>
// );

// case "multipleSelect": //array
// return Array.isArray(cell?.getValue()) ||
//   cell?.getValue() === "" ||
//   cell?.getValue() === undefined ? (
//   <MultiselectWithAddOption
//     columnData={cell.column.columnDef}
//     cell={cell}
//     rowData={cell?.getValue()}
//   />
// ) : (
//   <div className='w-full h-full overflow-hidden'>
//     {console.warn("not getting array in multi select", cell?.getValue())}
//     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//   </div>
// );
