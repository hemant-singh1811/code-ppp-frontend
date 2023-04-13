import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

export default function SingleLineTextCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table } = useContext(TableContext);

  function handleDoubleClick() {
    setIsEditMode(true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  // console.log(cell.getValue(), cell.row.original);

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      table.options.meta?.updateData(cell.row.index, cell.column.id, value);

      let newRowPart = { [cell?.column.id]: value };

      let rowObj = {
        base_id: "",
        table_id: location.pathname.split("/")[2],
        record_id: cell?.row?.original.id52148213343234567,
        updated_data: newRowPart,
      };

      socket.emit("updatedata", rowObj, (response) => {
        console.log("res : ", response);
      });
    }
  }

  return isEditMode ? (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      className="w-full h-full truncate px-2 p-1"
    />
  ) : (
    <div
      className="text-left w-full h-full truncate px-2 p-1"
      onClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}
