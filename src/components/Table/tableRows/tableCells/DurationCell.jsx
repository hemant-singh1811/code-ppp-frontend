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

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    let secNum = parseFloat(secs.toString(), 10);
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor(secNum / 60) % 60;
    let seconds = secNum % 60;
    if (value === "") return value;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    switch (options.durationFormat) {
      case "h:mm":
        return `${hours}:${minutes}`;
      case "h:mm:ss":
        return `${hours}:${minutes}:${seconds}`;
      case "h:mm:ss.s":
        return `${hours}:${minutes}:${seconds.toFixed(1)}`;
      case "h:mm:ss.ss":
        return `${hours}:${minutes}:${seconds.toFixed(2)}`;
      case "h:mm:ss.sss":
        return `${hours}:${minutes}:${seconds.toFixed(3)}`;
      default:
        return "";
    }
  };

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      const seconds = Math.max(0, getSecondsFromHHMMSS(value));
      const time = toHHMMSS(seconds);
      setValue(time);
      console.log("time", time);

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: cell?.row?.original.recordId,
          updatedData: time,
          fieldType: cell.column.columnDef.fieldType,
          fieldId: cell.column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          cell.row.index,
          cell.column.id,
          time,
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
    }
  }

  return isEditMode ? (
    <input
      type="text"
      value={value}
      placeholder={options?.durationFormat}
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
      onClick={handleDoubleClick}
    >
      {value ? value : ""}
    </div>
  );
}
