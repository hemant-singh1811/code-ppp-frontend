import React, { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { useEffect } from "react";

export default function MultilineTextCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || '');
  const [isEditMode, setIsEditMode] = useState(false);
  const { table } = useContext(TableContext);


  const multiLineTextRef = useRef(null);

  function handleDoubleClick() {
    setIsEditMode(true);
  }

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
        base_id: "",
        table_id: location.pathname.split("/")[2],
        record_id: cell?.row?.original.id52148213343234567,
        updated_data: newRowPart,
      };
      console.log(rowObj);

      socket.emit("updatedata", rowObj, (response) => {
        console.log("res : ", response);
      });
    }
  }
  useEffect(() => {
    multiLineTextRef.current.innerHTML = cell?.getValue() || '';
  }, []);

  return (
    <div
      ref={multiLineTextRef}
      autoFocus={true}
      contentEditable="plaintext-only"
      role="textbox"
      aria-multiline="true"
      suppressContentEditableWarning={true}
      onClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
      className={`${isEditMode
        ? "w-full px-2 p-1 h-[120px] bg-white z-[1000] relative text-left overflow-auto border border-black"
        : "text-left w-full h-full truncate px-2 p-1"
        } select-none`}
    ></div>
  );
}
