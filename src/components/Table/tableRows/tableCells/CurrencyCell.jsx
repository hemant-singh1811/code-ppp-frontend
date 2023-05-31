import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { set } from "react-hook-form";

export default function CurrencyCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  let options = cell.column.columnDef?.currencyFieldOptions;
  //console.log(options);
  function handleDoubleClick() {
    setIsEditMode(true);
  }

  function handleChange(event) {
    const arr = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
      options?.currencyValue,
    ];
    if (arr.includes(event.target.value[event.target.value.length - 1])) {
      setValue(event.target.value);
    } else if (event.target.value === "") {
      setValue(event.target.value);
      console.log("empty");
    } else {
      setValue(event.target.value);
    }
  }
  //   console.log(options);
  function handleBlur() {
    setIsEditMode(false);
    const val = removeExtraCharacter(value);
    console.log("mycell", cell.getValue());
    if (cell.getValue() !== val) {
      let updatedValue = val;

      //     updatedValue = Number.parseInt(value);
      updatedValue = isNaN(parseFloat(val))
        ? ""
        : parseFloat(val).toFixed(options?.fieldPrecision);
      console.log("updatedValue", updatedValue);
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

  function removeExtraCharacter(value) {
    const inputValue = value.replace(/\D/g, ""); // Remove non-digit characters
    return inputValue;
  }

  function addCommas(value) {
    const inputValue = value.replace(/[^\d.]/g, ""); // Remove non-digit and non-dot characters
    const parts = inputValue.split("."); // Split into integer and decimal parts
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to the integer part

    // Reconstruct the value with commas and decimal point
    const formattedValue = parts.length === 2 ? parts.join(".") : parts[0];
    return formattedValue;
  }

  return isEditMode ? (
    <input
      type="text"
      value={value && options.currencyValue + addCommas(value)}
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
      {value && options.currencyValue + addCommas(value)}
    </div>
  );
}
