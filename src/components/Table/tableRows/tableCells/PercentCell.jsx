import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

export default function PercentCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  let options = cell.column.columnDef?.percentFieldOptions;

  function handleClick() {
    setIsEditMode(true);
    console.log(value);
  }

  function handleChange(event) {
    const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "%"];
    if (arr.includes(event.target.value[event.target.value.length - 1])) {
      setValue(event.target.value);
    } else if (event.target.value === "") {
      setValue(event.target.value);
    }
  }

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      let updatedValue = value;

      updatedValue = isNaN(parseFloat(value))
        ? ""
        : parseFloat(value).toFixed(options?.fieldPrecision);
      setValue(updatedValue);

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: cell?.row?.original.id52148213343234567,
          updatedData: updatedValue,
          fieldType: cell.column.columnDef.fieldType,
          fieldId: cell.column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          cell.row.index,
          cell.column.id,
          updatedValue,
          response.metaData
        );
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
      style={{
        paddingBottom:
          activeNumberOfLines === 4
            ? 102
            : activeNumberOfLines === 3
            ? 62
            : activeNumberOfLines === 2
            ? 30
            : activeNumberOfLines === 1 && 4,
      }}
      className="w-full h-full border-none flex px-2 p-1 outline-none rounded-sm  text-right"
    />
  ) : (
    <div
      className={`overflow-hidden  w-full h-full break-words truncate px-2 p-1 text-right`}
      onClick={handleClick}
    >
      {value ? `${value}%` : ""}
    </div>
  );
}
