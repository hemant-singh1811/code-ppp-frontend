import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

export default function DurationCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  let options = cell.column.columnDef?.durationFieldOptions;

  function handleDoubleClick() {
    setIsEditMode(true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  const duration = (type, value) => {
    let hours = 0,
      min = 0,
      seconds = 0;
    if (value.includes(":")) {
      value = value.split(":").map(Number);
      hours = parseInt(value[0]);
      seconds = value[2]
        ? (value[2] % 60) +
          (value[3] ? value[3] / Math.pow(10, value.length - 1) : 0.0)
        : 0;
      value[2] = parseInt(
        value[2] ? (value[2] > 60 ? Number(value[2] / 60) : 0) : 0
      );
      min = parseInt(value[1] + value[2]) % 60;
      hours = parseInt(value[0] + (value[1] + value[2]) / 60);
    } else {
      hours = parseInt(value / 60);
      min = parseInt(value % 60);
      seconds = (value - parseInt(value)) * 100;
    }
    switch (type) {
      case "h:mm":
        return `${hours}:${min}`;
      case "h:mm:ss":
        return `${hours}:${min}:${seconds}`;
      case "h:mm:ss.s":
        return `${hours}:${min}:${seconds.toFixed(1)}`;
      case "h:mm:ss.ss":
        return `${hours}:${min}:${seconds.toFixed(2)}`;
      case "h:mm:ss.sss":
        return `${hours}:${min}:${seconds.toFixed(3)}`;
      default:
        return "";
    }
  };

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      let updatedValue = duration(options.durationFormat, value);

      //   if (options?.numberType === "integer") {
      //     updatedValue = Number.parseInt(value);
      //   } else if (options?.numberType === "decimal") {
      //     console.log(value);
      //     updatedValue = parseFloat(value).toFixed(options?.fieldPrecision);
      //   }
      //   console.log("parse float", parseFloat(value));
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
      type='text'
      pattern='[0-9]*'
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
      className='w-full h-full border-none flex px-2 p-1 outline-none rounded-sm  text-right'
    />
  ) : (
    <div
      className={`overflow-hidden  w-full h-full break-words truncate px-2 p-1 text-right`}
      onClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}
