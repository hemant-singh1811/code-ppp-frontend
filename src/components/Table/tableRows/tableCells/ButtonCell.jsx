import React from "react";

export default function ButtonCell({ cell }) {
  const value =
    cell.row?.getValue(
      cell.column.columnDef.buttonFieldOptions.selectedFieldId
    ) || "";

  function isValidURL(url) {
    // Regular expression pattern for URL validation
    var regex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Test if the string matches the URL pattern
    return regex.test(url);
  }

  return value !== "" ? (
    <span
      onClick={() => {
        if (window.location.href == value) {
          alert("You are already on this page");
        } else if (isValidURL(value)) {
          window.open(value, "_blank");
        } else {
          window.open(`http://${value}`, "_blank");
        }
      }}
      aria-disabled={value === "" ? true : false}
      className={`w-full h-full break-words truncate px-2 p-1 rounded-md  text-center relative top-[calc(50%_-_10.5px)]  hover:bg-blue-50  ${
        value === ""
          ? "hover:text-blue-100 text-blue-100 "
          : "hover:text-blue-700 text-blue-400 cursor-pointer"
      }`}
      href={`${value}`}
    >
      {cell.column.columnDef.buttonFieldOptions?.label || "Button"}
    </span>
  ) : (
    <span
      className={`w-full h-full break-words truncate px-2 p-1 rounded-md  text-center relative top-[calc(50%_-_10.5px)] text-blue-100 `}
    >
      {cell.column.columnDef.buttonFieldOptions?.label || "Button"}
    </span>
  );
}
