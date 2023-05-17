import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { useRef } from "react";
import { useEffect } from "react";

export default function CheckBox({ cell, rowData }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { table } = useContext(TableContext);
  const [isSelected, seIsSelected] = useState(rowData || false);

  const checkBoxRef = useRef();

  function handleUpdate() {
    seIsSelected(!isSelected);

    table.options.meta?.updateData(
      cell.row.index,
      cell.column.id,
      checkBoxRef.current.checked
    );

    let newRowPart = checkBoxRef.current.checked;

    let rowObj = {
      baseId: selectedBaseId,
      tableId: selectedTableId,
      recordId: cell?.row?.original.id52148213343234567,
      updatedData: newRowPart,
      fieldType: cell.column.columnDef.fieldType,
      fieldName: cell.column.columnDef.fieldName,
      fieldId: cell.column.columnDef.fieldId,
    };

    socket.emit("updateData", rowObj, (response) => {
      console.log("res : ", response);
    });
  }

  return (
    <div className='w-full h-full flex items-center justify-center cursor-pointer'>
      <input
        ref={checkBoxRef}
        type='checkbox'
        className='m-auto h-auto'
        name=''
        id=''
        checked={isSelected}
        onChange={handleUpdate}
      />
    </div>
  );
  // isEditMode ? (
  //   ) : (
  //     <div
  //       className="text-left w-full h-full truncate px-2 p-1"
  //       onClick={handleDoubleClick}
  //     >
  //       {value}
  //     </div>
  //   );
}
