import React, { useContext, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { TableContext } from "../../tableComponents/TableComponents";
import { useSelector } from "react-redux";
import { useClickAway } from "react-use";
import moment from "moment/moment";

export default function DateTableCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell && cell?.getValue());
  const { table, activeNumberOfLines, activeRowHeight } =
    useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);

  const options = {
    static: true,
    monthSelectorType: "static",
    dateFormat: "d-m-Y",
  };

  function handleOnClick() {
    setIsEditMode(true);
  }

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsEditMode(false);
  });

  function handelOnChange([date]) {
    setValue(date);

    let newRowPart = date;

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
        date,
        response.metaData
      );

      console.log("res : ", response);
    });
  }

  return (
    <div
      className={`h-full ${
        !isEditMode &&
        "overflow-hidden text-left w-full h-full break-words truncate px-2 p-1"
      }`}
      ref={ref}
      onClick={handleOnClick}
    >
      {isEditMode ? (
        <Flatpickr
          value={value}
          onChange={handelOnChange}
          style={{
            height: activeRowHeight,
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
          className='bg-transparent w-full h-full outline-none border-none min-h-[29px] px-2'
          // placeholder="DD/MM/YYYY"
          options={options}
        />
      ) : (
        <
          // className={`overflow-hidden text-left w-full h-full break-words truncate px-2 p-1`}
          // onClick={handleOnClick}
        >
          {value && moment(value).format("DD-MM-YYYY")}
        </>
      )}
    </div>
  );
}
