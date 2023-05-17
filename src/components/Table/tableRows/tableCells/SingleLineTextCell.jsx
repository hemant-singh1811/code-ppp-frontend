import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

export default function SingleLineTextCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );

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

      let newRowPart = value;

      let rowObj = {
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: cell?.row?.original.id52148213343234567,
        updatedData: newRowPart,
        fieldType: cell.column.columnDef.fieldType,
        fieldId: cell.column.columnDef.fieldId,
      };

      socket.emit("updateData", rowObj, (response) => {
        console.log("res : ", response);
      });
    }
  }

  return isEditMode ? (
    <input
      type='text'
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      style={{
        paddingBottom:
          activeNumberOfLines === 4
            ? 102
            : activeNumberOfLines === 3
            ? 62
            : activeNumberOfLines === 2
            ? 30
            : activeNumberOfLines === 1 && 4,
        boxShadow: "0 0 0px 2px inset #166ee1",
      }}
      className='w-full h-full border-none flex px-2 p-1 outline-none rounded-sm  '
    />
  ) : (
    <div
      className={`overflow-hidden text-left w-full h-full break-words truncate px-2 p-1`}
      onClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}
