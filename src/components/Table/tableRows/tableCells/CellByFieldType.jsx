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

export default function CellByFieldType({ field_type, cell }) {
  switch (field_type) {
    case "singleSelect":
      return (
        <SingleSelectWithAddOption
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      );

    case "multipleSelects":
      return (
        <MultiselectWithAddOption
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      );

    case "phoneNumber":
      return <SingleLineTextCell cell={cell} />;
      return <PhoneNumberTableCell cell={cell} />;

    case "email":
      return <SingleLineTextCell cell={cell} />;
      return <EmailTableCell cell={cell} />;

    case "url":
      return <SingleLineTextCell cell={cell} />;
      return <UrlTableCell cell={cell} />;

    case "singleLineText":
      return <SingleLineTextCell cell={cell} />;

    case "multilineText":
      return <MultilineTextCell cell={cell} />;

    case "autoNumber":
      return <AutoNumberCell cell={cell} />;

    // pending components

    case "multipleAttachments":
      return <ImageReader data={cell?.getValue()} />;

    case "checkbox":
      return (
        <CheckBox
          columnData={cell.column.columnDef}
          cell={cell}
          rowData={cell?.getValue()}
        />
      );

    case "date":
      return <DateTableCell cell={cell} />;

    case "lastModifiedTime":
      return <ModifiedAndCreatedCell type={"lastModifiedTime"} cell={cell} />;

    case "lastModifiedBy":
      return <ModifiedAndCreatedCell type={"lastModifiedBy"} cell={cell} />;

    case "createdTime":
      return <ModifiedAndCreatedCell type={"createdTime"} cell={cell} />;

    case "createdBy":
      return <ModifiedAndCreatedCell type={"createdBy"} cell={cell} />;

    case "button":
      return <ButtonCell cell={cell} />;

    default:
      console.log(field_type);
      return flexRender(cell.column.columnDef.cell, cell.getContext());
  }
}
