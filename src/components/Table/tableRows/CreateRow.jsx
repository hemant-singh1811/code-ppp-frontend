import React from "react";
import { useAddTableRowMutation } from "../../../store/services/alphaTruckingApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../tableComponents/TableComponents";
import { useContext } from "react";
import LoadingAlt from "../../utilities/LoadingAlt";

const CreateRow = React.memo(function CreateRow() {
  const [addRowApi, responseCreateRow] = useAddTableRowMutation();
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { columns, setData, data } = useContext(TableContext);

  useEffect(() => {
    if (responseCreateRow.data) {
      console.log("Create Row", responseCreateRow.data);
      let newData = {
        ...responseCreateRow.data?.data,
        recordId: responseCreateRow.data?.metaData?.recordId,
      };
      setData([...data, newData]);
    }
  }, [responseCreateRow.isSuccess]);

  function createRow() {
    let updatedData = {};
    columns.forEach(({ fieldType, fieldName }) => {
      // console.log(fieldType);
      switch (fieldType) {
        case "singleSelect":
          updatedData[fieldName] = "";
          break;
        case "multipleSelect":
          updatedData[fieldName] = "";
          break;
        case "attachments":
          updatedData[fieldName] = [];
          break;
        case "checkbox":
          updatedData[fieldName] = false;
          break;

        case undefined:
          break;

        default: //string
          updatedData[fieldName] = "";
          break;
      }
    });
    // setData([...data, updatedData]);
    addRowApi({
      baseId: selectedBaseId,
      data: {
        tableId: selectedTableId,
        data: updatedData,
      },
    });
  }
  return responseCreateRow.isLoading ? (
    <div className="w-5 h-5 ml-4">
      <LoadingAlt />
    </div>
  ) : (
    <div
      className="hover:bg-gray-100 px-1 cursor-pointer h-full flex items-center justify-center"
      onClick={createRow}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 font-thin ml-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
});

export default CreateRow;
