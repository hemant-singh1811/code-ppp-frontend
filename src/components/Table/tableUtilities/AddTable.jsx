import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import {
  handelAddBases,
  handelAddTableInBases,
  handelRenameBases,
  handelRenameTableInBases,
} from "../../../store/features/BasesStateSlice";
import {
  handelSelectedTableAndBaseId,
  handleAddToggle,
} from "../../../store/features/globalStateSlice";
import {
  handelAddSideBarField,
  handelAddSideBarMenu,
  handelRenameSideBarField,
  handelRenameSideBarMenu,
} from "../../../store/features/SideBarStateSlice";
import {
  useCreateBaseMutation,
  useCreateTableMutation,
  useRenameBaseMutation,
  useRenameTableMutation,
} from "../../../store/services/alphaTruckingApi";
import LoadingAlt from "../../utilities/LoadingAlt";
import { Dialog, Transition } from "@headlessui/react";

export default function AddTable() {
  const [createTableApi, responseCreateTable] = useCreateTableMutation();
  const [createBaseApi, responseCreateBase] = useCreateBaseMutation();
  const [renameTableApi, responseRenameTable] = useRenameTableMutation();
  const [renameBaseApi, responseRenameBase] = useRenameBaseMutation();

  const { selectedBaseId, mainSideBar } = useSelector(
    (state) => state.globalState
  );
  const { bases } = useSelector((state) => state.bases);
  const { isOpen, type, action, name, baseId, tableId } = useSelector(
    (state) => state.globalState.addToggle
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState(name || "");
  const [isExistNameInput, setIsExistNameInput] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    setNameInput(name || "");
    // setDescriptionInput(name || '');
  }, [baseId]);

  useEffect(() => {
    setNameInput(name || "");
    // setDescriptionInput(name || '');
  }, [tableId]);

  // save all the table names and later check if the name is already present or not
  const existingTable = new Set();

  // save all the bases names and later check if the name is already present or not
  const existingBases = new Set();

  bases.map(({ baseId, tableMetaData }) => {
    if (baseId === selectedBaseId) {
      tableMetaData?.forEach(({ tableName }) => {
        existingTable.add(tableName?.toLocaleLowerCase());
      });
    }
  });

  bases.map(({ baseMetaData }) => {
    existingBases.add(baseMetaData?.baseName);
  });

  // existingBases.forEach((key) => {
  //   console.log("Existing table name", key);
  // });

  useEffect(() => {
    if (responseCreateBase?.data) {
      console.log("create base:", responseCreateBase?.data);
      dispatch(handleAddToggle({ isOpen: false, type: "" }));
      setNameInput("");
      setDescriptionInput("");
    }
  }, [responseCreateBase.isSuccess]);

  useEffect(() => {
    if (responseRenameBase?.data) {
      console.log("Rename base:", responseRenameBase?.data);
      dispatch(handleAddToggle({ isOpen: false, type: "" }));
      setNameInput("");
      setDescriptionInput("");
    }
  }, [responseRenameBase.isSuccess]);

  useEffect(() => {
    if (responseCreateTable?.data) {
      console.log("create Table:", responseCreateTable?.data);
      dispatch(
        handelSelectedTableAndBaseId({
          selectedTableId: responseCreateTable?.data?.tableId,
        })
      );
      dispatch(handleAddToggle({ isOpen: false, type: "" }));
      setNameInput("");
      setDescriptionInput("");
      navigate(`/${selectedBaseId}/${responseCreateTable?.data?.tableId}`);
    }
  }, [responseCreateTable.isSuccess]);

  useEffect(() => {
    if (responseRenameTable?.data) {
      console.log("Rename Table:", responseRenameTable?.data);

      dispatch(handleAddToggle({ isOpen: false, type: "" }));
      setNameInput("");
      setDescriptionInput("");
    }
  }, [responseRenameTable.isSuccess]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(handleAddToggle({ isOpen: false, type: "" }))}
      >
        <Transition.Child
          className={`text-black absolute bottom-[10px] z-50  w-96 rounded-md  bg-white p-4 border-gray-400 border-2 flex flex-col ${
            mainSideBar.toggle ? "left-[80px]" : "left-[244px]"
          }`}
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Dialog.Panel className=''>
            <div>
              <input
                type='text'
                placeholder={
                  type === "table"
                    ? "Table Name (Mandatory)"
                    : type === "base"
                    ? "Base Name (Mandatory)"
                    : ""
                }
                className='w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf] mb-3'
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  switch (type) {
                    case "table":
                      existingTable.has(
                        e.target.value.toLocaleLowerCase().trim()
                      )
                        ? setIsExistNameInput(true)
                        : setIsExistNameInput(false);

                      break;

                    case "base":
                      existingBases.has(
                        e.target.value.toLocaleLowerCase().trim()
                      )
                        ? setIsExistNameInput(true)
                        : setIsExistNameInput(false);

                      break;

                    default:
                      break;
                  }
                }}
              />

              {isExistNameInput && (
                <div className='text-red-700 text-sm m-1 -mt-3 -mb-2'>
                  Please enter a unique {type === "table" ? "Table" : "Base"}{" "}
                  name
                </div>
              )}

              <div className='mt-4'>
                <div className='mb-1'>Description</div>
                <input
                  type='text'
                  className='px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-md'
                  placeholder={
                    type === "table"
                      ? "Describe this Table (optional)"
                      : type === "base"
                      ? "Describe this Base (optional)"
                      : ""
                  }
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
              </div>

              <div className='flex justify-between items-center mt-8'>
                <div>
                  <div
                    className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${
                      isOpen && "hidden"
                    } `}
                    onClick={() =>
                      dispatch(handleAddToggle({ isOpen: false, type: "" }))
                    }
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                    Add description
                  </div>
                </div>
                <div className='flex items-center gap-2 select-none'>
                  <div
                    className='hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer'
                    onClick={() => {
                      dispatch(handleAddToggle({ isOpen: false, type: "" }));
                      setNameInput("");
                    }}
                  >
                    Cancel
                  </div>
                  {
                    <button
                      disabled={
                        !nameInput ||
                        isExistNameInput ||
                        responseCreateTable.isLoading
                      }
                      onClick={() => {
                        if (action === "rename") {
                          switch (type) {
                            case "table":
                              renameTableApi({
                                baseId: baseId,
                                data: {
                                  tableId: tableId,
                                  tableName: nameInput.trim(),
                                  tableDescription: descriptionInput.trim(),
                                },
                              });
                              break;
                            case "base":
                              renameBaseApi({
                                data: {
                                  baseId: baseId,
                                  baseName: nameInput.trim(),
                                  baseDescription: descriptionInput.trim(),
                                },
                              });
                              break;
                            default:
                              break;
                          }
                        } else {
                          switch (type) {
                            case "table":
                              createTableApi({
                                baseId: selectedBaseId,
                                data: {
                                  tableName: nameInput.trim(),
                                  tableDescription: descriptionInput.trim(),
                                },
                              });
                              break;
                            case "base":
                              createBaseApi({
                                data: {
                                  baseName: nameInput.trim(),
                                  baseDescription: descriptionInput.trim(),
                                },
                              });
                              break;
                            default:
                              break;
                          }
                        }
                      }}
                      className='bg-blue-600 rounded-md p-1.5 px-4 min-w-[105px] min-h-[31.5px] text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center'
                    >
                      {responseCreateTable.isLoading ||
                      responseCreateBase.isLoading ||
                      responseRenameTable.isLoading ||
                      responseRenameBase.isLoading ? (
                        <div>
                          <LoadingAlt />
                        </div>
                      ) : (
                        <span className='capitalize'>
                          {action} {type === "table" ? "Table" : "Base"}
                        </span>
                      )}
                    </button>
                  }
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

// useEffect(() => {
//   if (responseCreateTable?.error) {
//     dispatch(
//       handelOpenModal({
//         heading: 'Table Creation',
//         error: responseCreateTable?.error?.data?.err,
//       })
//     );
//   }
//   if (responseCreateBase?.error) {
//     dispatch(
//       handelOpenModal({
//         heading: 'Base Creation',
//         error: responseCreateBase?.error?.data?.err,
//       })
//     );
//   }
// }, [responseCreateTable.isError || responseCreateBase?.error]);
