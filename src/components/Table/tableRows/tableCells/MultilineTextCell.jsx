import React, { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function MultilineTextCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );

  const multiLineTextRef = useRef(null);

  function handleDoubleClick() {
    setIsEditMode(true);
  }
  // console.log("object")
  function handleBlur(event) {
    setIsEditMode(false);

    multiLineTextRef.current.scrollTop = 0;
    multiLineTextRef.current.innerHTML = event.target.innerText;
    // setValue(event.target.innerText);

    if (cell.getValue() !== event.target.innerText) {
      table.options.meta?.updateData(
        cell.row.index,
        cell.column.id,
        event.target.innerText
      );

      let newRowPart = { [cell?.column.id]: event.target.innerText };

      let rowObj = {
        base_id: selectedBaseId,
        table_id: selectedTableId,
        record_id: cell?.row?.original.id52148213343234567,
        updated_data: newRowPart,
        field_type: cell.column.columnDef.field_type,
        field_name: cell.column.columnDef.field_name,
        field_id: cell.column.columnDef.field_id,
      };
      console.log(rowObj);

      socket.emit("updatedata", rowObj, (response) => {
        console.log("res : ", response);
      });
    }
  }
  useEffect(() => {
    multiLineTextRef.current.innerHTML = cell?.getValue().trim() || "";
  }, []);

  return (
    <div
      autoCorrect={"false"}
      ref={multiLineTextRef}
      autoFocus={true}
      contentEditable="plaintext-only"
      role="textbox"
      aria-multiline="true"
      suppressContentEditableWarning={true}
      onClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
      style={{
        border: isEditMode && "2px solid #166ee1",
        background: isEditMode ? "white" : "transparent",
      }}
      className={`${
        isEditMode
          ? "w-full px-2 p-1 h-[155px] bg-white z-[1000] relative text-left overflow-auto"
          : `text-left w-full  h-full overflow-hidden px-2 p-1  truncate-multiline webkitLineClamp${activeNumberOfLines}`
      } outline-none rounded-sm bg-transparent border-2 border-transparent select-none py-0 pt-0.5`}
    ></div>
  );
}
