import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormModal } from "../../../store/features/globalStateSlice";
import { TableContext } from "./TableComponents";
import getSvg from "../tableUtilities/getSvg";
import FormComponents from "./FormComponents";
import { ErrorBoundary } from "react-error-boundary";

const FormModal = () => {
  const isOpen = useSelector((state) => state.globalState.formModal.isOpen);
  const data = useSelector((state) => state.globalState.formModal.data);
  const index = useSelector((state) => state.globalState.formModal.index);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(handleFormModal({ isOpen: false }));
  }

  const tableData = useContext(TableContext);
  let row = tableData.table.getRowModel().rows[index];
  let columns = tableData.table.getAllColumns();
  const [showCreateField, setShowCreateField] = useState(false);
  console.log("tableData ", tableData);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative  z-50 w-5/6 h-[90vh]"
            onClose={closeModal}>
            <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0">
              {/* Container to center the panel */}
              <div className="flex min-h-full items-center justify-center p-4 ">
                {/* The actual dialog panel  */}
                <div> </div>
                <Dialog.Panel
                  className={
                    "flex w-[960px] h-[90vh] flex-col justify-start p-5 px-20 bg-white text-black  overflow-y-auto rounded"
                  }>
                  <hr className="h-px my-6 bg-gray-500 border-0 dark:bg-gray-700" />
                  <div className="flex-col justify-star">
                    {columns.map((column, idx) => {
                      if (idx == 0) {
                        return <div key={idx}></div>;
                      }
                      if (idx == 1) {
                        // {
                        //   console.log("id ==1", column.columnDef.fieldName);
                        // }
                        return (
                          <div key={idx} className="flex flex-col p-5 ">
                            <div className="w-full text-xl flex">
                              <div className="p-2">
                                {getSvg(column.columnDef.fieldType)}
                              </div>
                              <div className="px-1 py-1">{column.columnDef.fieldName}</div>
                            </div>
                            <div
                              className="w-full border rounded"
                              onClick={(e) =>
                                e.currentTarget.classList.add(
                                  "outline-blue-700"
                                )
                              }>
                              <FormComponents
                                row={row}
                                column={column}
                                type={column.columnDef.fieldType}
                              />
                            </div>
                            <hr className="h-px my-6 bg-gray-500 border-0 dark:bg-gray-700" />
                          </div>
                        );
                      }
                      return (
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row w-full p-5">
                          <div className=" flex" style={{ flex: "3" }}>
                            <div>{getSvg(column.columnDef.fieldType)}</div>
                            <div className="px-1" >
                              <label htmlFor={column.id}>
                                {column.columnDef.fieldName}
                              </label>
                            </div>
                          </div>
                          <div className="text-black " style={{ flex: "7" }}>
                            {/* {components[cell.columnDef.fieldType]} */}
                            <FormComponents
                              row={row}
                              column={column}
                              type={column.columnDef.fieldType}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="flex hover:cursor-pointer "
                    onClick={() => setShowCreateField(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                    <div className="px-2">Add new field to this table</div>
                  </div>
                  <Dialog.Overlay>{showCreateField}</Dialog.Overlay>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </ErrorBoundary>
  );
};

export default FormModal;
