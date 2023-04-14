import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import { handelUpdateBases } from "../../../store/features/BasesStateSlice";
import { handelSelectedTableAndBaseId, handleAddToggle } from "../../../store/features/globalStateSlice";
import { handelAddSideBarField } from "../../../store/features/SideBarStateSlice";
import { useCreateTableMutation } from "../../../store/services/alphaTruckingApi";

export default function AddTable() {
  const { selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { bases } = useSelector((state) => state.bases);
  const { addTableToggle } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [tableNameInput, setTableNameInput] = React.useState("");
  const [isExistTableNameInput, setIsExistTableNameInput] =
    React.useState(false);
  const [TableDescriptionInput, setTableDescriptionInput] = React.useState("");

  const [createTableApi, responseCreateTable] = useCreateTableMutation();


  // save all the table names and later check if the name is already present or not
  const existingTable = new Map();
  bases.map(({ baseid, tablemetadata }) => {
    if (baseid === selectedBaseId) {
      tablemetadata?.forEach(({ table_name }) => {
        existingTable.set(table_name?.toLocaleLowerCase(), true);
      })
    }
  });

  useEffect(() => {
    if (responseCreateTable?.data) {
      dispatch(
        handelUpdateBases({
          baseId: selectedBaseId,
          data: responseCreateTable?.data,
        })
      );
      dispatch(
        handelAddSideBarField({
          baseId: selectedBaseId,
          data: { title: responseCreateTable?.data?.table_name, tableId: responseCreateTable?.data?.table_id, to: `${selectedBaseId}/${responseCreateTable?.data?.table_id}`, 'baseId': selectedBaseId },
        })
      );
      dispatch(handelSelectedTableAndBaseId({ selectedTableId: responseCreateTable?.data?.table_id }))
      navigate(`/${selectedBaseId}/${responseCreateTable?.data?.table_id}`)
    }
  }, [responseCreateTable.isSuccess]);
  return (
    <div className="">
      {addTableToggle && (
        <div className="text-black absolute bottom-1 z-50 bg-white w-96 rounded-md left-1 p-4 border-gray-400 border-2 flex flex-col">
          <input
            type="text"
            placeholder="Table Name (Mandatory)"
            className="w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf] mb-3"
            value={tableNameInput}
            onChange={(e) => {
              setTableNameInput(e.target.value);
              existingTable.get(e.target.value.toLocaleLowerCase().trim())
                ? setIsExistTableNameInput(true)
                : setIsExistTableNameInput(false);
            }}
          />

          {isExistTableNameInput && (
            <div className="text-red-700 text-sm m-1 -mt-3 -mb-2">
              Please enter a unique Table name
            </div>
          )}

          <div className="mt-4">
            <div className="mb-1">Description</div>
            <input
              type="text"
              className="px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-sm"
              placeholder="Describe this Table (optional)"
              value={TableDescriptionInput}
              onChange={(e) => setTableDescriptionInput(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <div>
              <div
                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${addTableToggle && "hidden"
                  } `}
                onClick={() => dispatch(handleAddToggle(false))}
              >
                <span className="material-symbols-rounded text-xl">add</span>
                Add description
              </div>
            </div>
            <div className="flex items-center gap-2 select-none">
              <div
                className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                onClick={() => {
                  dispatch(handleAddToggle(false));
                  setTableNameInput("");
                }}
              >
                cancel
              </div>
              {
                <button
                  disabled={!tableNameInput || isExistTableNameInput}
                  onClick={async () => {
                    await createTableApi({
                      tableId: selectedBaseId,
                      data: {
                        table_name: tableNameInput,
                      },
                    });
                    dispatch(handleAddToggle());
                    setTableNameInput("");
                    setTableDescriptionInput("");
                  }}
                  className="bg-blue-600 rounded-md p-1.5 px-4 text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Create Table
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
