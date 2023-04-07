import React from "react";

export default function ModifiedAndCreatedCell({ cell, type }) {
  switch (type) {
    case "lastModifiedBy":
      break;
    case "lastModifiedTime":
      break;
    case "createdBy":
      break;
    case "createdTime":
      break;

    default:
      break;
  }

  return <div>{type}</div>;
}
