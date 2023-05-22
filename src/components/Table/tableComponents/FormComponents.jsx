import React from "react";
import { useState } from "react";

const FormComponents = ({ row, cell, type }) => {
  const components = {
    singleSelect: <SingleLineText row={row} cell={cell} />,
    linkedRecords: <SingleLineText />,
    singleLineText: <SingleLineText row={row} cell={cell} />,
    multilineText: <SingleLineText row={row} cell={cell} />,
    attachments: <SingleLineText />,
    checkbox: <SingleLineText />,
    multipleSelect: <SingleLineText />,
    user: <SingleLineText />,
    date: <SingleLineText />,
    phoneNumber: <SingleLineText />,
    email: <SingleLineText />,
    url: <SingleLineText />,
    number: <SingleLineText />,
    currency: <SingleLineText />,
    percent: <SingleLineText />,
    duration: <SingleLineText />,
    rating: <SingleLineText />,
    formula: <SingleLineText />,
    rollup: <SingleLineText />,
    count: <SingleLineText />,
    lookup: <SingleLineText />,
    createdTime: <SingleLineText />,
    lastModifiedTime: <SingleLineText />,
    createdBy: <SingleLineText />,
    lastModifiedBy: <SingleLineText />,
    autoNumber: <SingleLineText />,
    barcode: <SingleLineText />,
    button: <SingleLineText />,
  };
  return <>{components[type]}</>;
};

export const SingleLineText = ({ row, cell }) => {
  //const [value, setValue] = useState(row?.getValue() || "");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="outline-blue-700"
        value={row?.getValue(cell.id) || ""}
        onChange={onChange}
      />
    </div>
  );
};

export default FormComponents;
