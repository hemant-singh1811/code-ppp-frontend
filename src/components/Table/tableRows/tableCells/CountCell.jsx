import React from "react";

export default function CountCell({ cell }) {
  const value =
    cell.row.original[
      cell.column.columnDef.countFieldOptions?.selectedFieldId
    ] || "";

  return (
    <div
      className={`overflow-hidden text-right w-full h-full break-words truncate px-2 p-1`}
    >
      {value?.length || 0}
    </div>
  );
}
