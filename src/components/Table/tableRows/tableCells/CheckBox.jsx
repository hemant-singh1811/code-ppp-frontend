import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { useRef } from "react";

export default function CheckBox({ cell, rowData, isHovered }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const { table } = useContext(TableContext);
  const [isSelected, seIsSelected] = useState(rowData || false);

  const checkBoxRef = useRef();

  function handleUpdate() {
    seIsSelected(!isSelected);

    let rowObj = {
      userToken: userToken,
      data: {
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: cell?.row?.original.id52148213343234567,
        updatedData: checkBoxRef.current.checked,
        fieldType: cell.column.columnDef.fieldType,
        fieldId: cell.column.columnDef.fieldId,
      },
    };

    socket.emit("updateData", rowObj, (response) => {
      table.options.meta?.updateData(
        cell.row.index,
        cell.column.id,
        checkBoxRef.current.checked,
        response.metaData
      );
    });
  }

  return (
    (isHovered || isSelected) && (
      <label
        className="w-full h-full flex items-center justify-center cursor-pointer "
        htmlFor={cell?.row?.id + cell?.id}
      >
        <input
          ref={checkBoxRef}
          type="checkbox"
          className="m-auto h-auto cursor-pointer outline-none "
          name=""
          id={cell?.row?.id + cell?.id}
          checked={isSelected}
          onChange={handleUpdate}
        />
      </label>
    )
  );
}
