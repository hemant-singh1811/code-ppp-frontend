import React from "react";
import { useAddTableRowMutation } from "../../../store/services/alphaTruckingApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../tableComponents/TableComponents";
import { useContext } from "react";

export default function CreateRow() {
  const [addRowApi, responseCreateRow] = useAddTableRowMutation();
  const { selectedTableId } = useSelector((state) => state.globalState);
  const { columns, setData, data } = useContext(TableContext);

  useEffect(() => {
    if (responseCreateRow.data) {
      let newData = {
        ...responseCreateRow.data?.data,
        id52148213343234567: responseCreateRow.data?.metadata?.record_id,
      };
      console.log(newData);
      setData([...data, newData]);
      console.log("response from server", responseCreateRow.data);
    }
  }, [responseCreateRow.isSuccess]);

  function createRow() {
    console.log(data);

    let updatedData = {};
    columns.forEach(({ field_type, field_name }) => {
      switch (field_type) {
        case "singleSelect":
          updatedData[field_name] = "";
          break;
        case "multipleSelects":
          updatedData[field_name] = "";
          break;
        case "multipleAttachments":
          updatedData[field_name] = [];
          break;
        case "checkbox":
          updatedData[field_name] = false;
          break;

        default: //string
          updatedData[field_name] = "";
          break;
      }
    });
    console.log(updatedData);
    addRowApi({
      tableId: selectedTableId,
      data: updatedData,
    });
  }

  return (
    <div
      className="hover:bg-gray-100 px-1 cursor-pointer h-full item-center flex"
      onClick={createRow}
    >
      <span className="material-symbols-rounded font-thin ">add</span>
    </div>
  );
}
