import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

export default function SingleLineTextCell({ cell }) {
  let val = cell?.getValue();
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(val || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  function handleDoubleClick() {
    setIsEditMode(true);
  }

  useEffect(() => {
    setValue(val);
  }, [val]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: cell?.row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: cell.column.columnDef.fieldType,
          fieldId: cell.column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          cell.row.index,
          cell.column.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }

  return isEditMode ? (
    <input
      tabIndex={-1}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      spellCheck="false"
      style={{
        paddingBottom:
          activeNumberOfLines === 4
            ? 102
            : activeNumberOfLines === 3
            ? 62
            : activeNumberOfLines === 2
            ? 30
            : activeNumberOfLines === 1 && 4,
        paddingTop:
          activeNumberOfLines === 4
            ? 2
            : activeNumberOfLines === 3
            ? 2
            : activeNumberOfLines === 2
            ? 12
            : activeNumberOfLines === 1 && 2,
        boxShadow: "0 0 0px 3px #166ee1",
        zIndex: 1000,
      }}
      className="w-full h-full border-none flex px-2  p-1 outline-none rounded-sm  "
    />
  ) : (
    <div
      tabIndex={-1}
      className={`overflow-hidden text-left w-full h-full break-words px-2 p-1 bg-transparent  truncate-multiline webkitLineClamp${activeNumberOfLines}`}
      onDoubleClick={handleDoubleClick}
      style={{
        backgroundColor: "transparent",
        // boxShadow: "0 0 0px 4px  #166ee1",
      }}
    >
      {value || ""}
    </div>
  );
}
