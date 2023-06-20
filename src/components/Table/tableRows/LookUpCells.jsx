import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../tableComponents/TableComponents";
// "linkedRecords", N/A
// "singleLineText", DONE
// "multilineText",
// "attachments",
// "checkbox",
// "singleSelect",
// "multipleSelect",
// // "user",
// "date",
// "phoneNumber",
// "email",
// "url",
// "number",
// "currency",
// "percent",
// "duration",
// "rating",
// "formula",
// // "rollup",
// "count",
// "lookup",
// "createdTime",
// "lastModifiedTime",
// "createdBy",
// "lastModifiedBy",
// "autoNumber",
// "barcode",
// "button",

export default function LookUpCells({ cell }) {
  let rowData =
    cell?.row?.original[
      cell.column.columnDef?.lookupFieldOptions?.selectedLinkedRecordFieldId
    ];
  switch (cell.column.columnDef.lookupFieldOptions.lookUpFieldType) {
    case "singleLineText":
      return <SingleLineTextCell cell={cell} rowData={rowData} />;
  }

  return <div>LookUpCells</div>;
}

function SingleLineTextCell({ cell, rowData }) {
  let cellData = [];

  if (Array.isArray(rowData)) {
    cellData = rowData.map(({ data, recordId }) => {
      if (data[cell?.column?.columnDef?.lookupFieldOptions?.selectedFieldId]) {
        return data[
          cell?.column?.columnDef?.lookupFieldOptions?.selectedFieldId
        ];
      }
    });
  }

  let val = cellData.toString();

  const [value, setValue] = useState(val || "");
  const { activeNumberOfLines } = useContext(TableContext);

  useEffect(() => {
    setValue(val);
  }, [val]);

  return (
    <div
      className={`overflow-hidden outline-none text-left w-full h-full break-words px-2 p-1 bg-transparent  truncate-multiline webkitLineClamp${activeNumberOfLines}`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      {value || ""}
    </div>
  );
}
