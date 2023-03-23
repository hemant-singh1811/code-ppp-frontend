import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handelUpdateBases } from "../../../store/features/BasesStateSlice";
import { handleAddToggle } from "../../../store/features/globalStateSlice";
import { useCreateTableMutation } from "../../../store/services/alphaTruckingApi";

export default function AddTable() {

  const { sidebarData, createTableBaseId } = useSelector(state => state.globalState)

  const dispatch = useDispatch()

  const { addTableToggle } = useSelector(state => state.globalState)

  const [fieldNameInput, setFieldNameInput] = React.useState("");

  const [isExistFieldNameInput, setIsExistFieldNameInput] =
    React.useState(false);

  const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");

  const [createTableApi, responseCreateTable] =
    useCreateTableMutation();

  const existingTable = new Map();

  sidebarData[0]?.tablemetadata.map(({ table_name }) => {
    existingTable.set(table_name?.toLocaleLowerCase(), true)
  })
  console.log(createTableBaseId)

  useEffect(() => {
    console.log(
      responseCreateTable?.data,
    )

    if (responseCreateTable?.data) {
      dispatch(handelUpdateBases({ baseId: createTableBaseId, data: responseCreateTable?.data }))
    }

  }, [responseCreateTable.isSuccess])



  return (
    <div className="">
      {addTableToggle && (
        <div className="text-black absolute bottom-[0px] z-50 bg-white w-96 rounded-md left-0 p-4 border-gray-400 border-2 flex flex-col">
          <input
            type="text"
            placeholder="Table Name (Mandatory)"
            className="w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf] mb-3"
            value={fieldNameInput}
            onChange={(e) => {
              setFieldNameInput(e.target.value);
              existingTable.get(e.target.value.toLocaleLowerCase())
                ? setIsExistFieldNameInput(true)
                : setIsExistFieldNameInput(false);
            }}
          />

          {isExistFieldNameInput && (
            <div className="text-red-700 text-sm m-1 -mt-3 -mb-2">
              Please enter a unique Table name
            </div>
          )}

          <div className="mt-4">
            <div className="mb-1">Description</div>
            <input
              type="text"
              className="px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-sm"
              placeholder="Describe this field (optional)"
              value={fieldDescriptionInput}
              onChange={(e) => setFieldDescriptionInput(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <div>
              <div
                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${addTableToggle && "hidden"
                  } `}
                onClick={() => dispatch(handleAddToggle(false))}
              >
                <span className="material-symbols-rounded text-xl">add</span>{" "}
                Add description
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                onClick={() => {
                  dispatch(handleAddToggle(false))
                  setFieldNameInput("");
                }}
              >
                cancel
              </div>
              {(
                <button
                  disabled={!fieldNameInput || isExistFieldNameInput}
                  onClick={async () => {
                    await createTableApi({
                      tableId: createTableBaseId,
                      data: {
                        table_name: fieldNameInput,
                      },
                    });
                    dispatch(handleAddToggle())
                    setFieldNameInput("");
                    setFieldDescriptionInput("");
                  }}
                  className="bg-blue-600 rounded-md p-1.5 px-4 text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Create Field
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
