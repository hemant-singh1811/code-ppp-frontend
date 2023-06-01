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

  const duration = (type, value) => {
    //return convertTextToDuration(value);
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
      // hours = parseInt(value / 60);
      // min = parseInt(value % 60);
      // seconds = (value - parseInt(value)) * 100;
      value = parseFloat(value);
      hours = Math.floor(value / 3600);
      min = Math.floor((value % 3600) / 60);
      seconds = value % 60;
    }
    if (value === "") return value;
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

  function convertTextToDuration(text) {
    const delimiterRegex = /[:.]/; // Regular expression to match ":" or "."
    const parts = text.split(delimiterRegex);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    // Convert parts to integers or floats
    if (parts.length >= 1) {
      hours = parseInt(parts[parts.length - 4]) || 0;
    }
    if (parts.length >= 2) {
      minutes = parseInt(parts[parts.length - 3]) || 0;
    }
    if (parts.length >= 3) {
      seconds = parseInt(parts[parts.length - 2]) || 0;
    }
    if (parts.length >= 4) {
      milliseconds = parseInt(parts[parts.length - 1]) || 0;
    }

    // Convert units to desired format
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMilliseconds = totalSeconds * 1000 + milliseconds;

    // Format the result as h:mm:ss.sss
    hours = Math.floor(totalMilliseconds / 3600000);
    minutes = Math.floor((totalMilliseconds / 60000) % 60);
    seconds = Math.floor((totalMilliseconds / 1000) % 60);
    milliseconds = totalMilliseconds % 1000;

    const result = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    console.log("result : ", result);
    return result;
  }

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

  function handleChange(event) {
    const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ":", "."];
    if (arr.includes(event.target.value[event.target.value.length - 1])) {
      setValue(event.target.value);
    } else if (event.target.value === "") {
      setValue("");
    } else {
      setValue(event.target.value[event.target.value.length - 1]);
      console.log("else", event.target.value[event.target.value.length - 1]);
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
        boxShadow: "0 0 0px 2px inset #166ee1",
      }}
      className="w-full h-full border-none flex px-2 p-1 outline-none rounded-sm  text-right"
    />
  ) : (
    <div
      className={`overflow-hidden  w-full h-full break-words truncate px-2 p-1 text-right`}
      onClick={handleDoubleClick}>
      {value ? value : ""}
    </div>
  );
}
