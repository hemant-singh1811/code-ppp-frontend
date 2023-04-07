import React from "react";

export default function AutoNumberCell({ cell }) {
  return (
    <div className="w-full h-full text-right px-2 p-1">
      {cell?.row?.index + 1}
    </div>
  );
}
