import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormModal } from "../../../store/features/globalStateSlice";
import { TableContext } from "./TableComponents";
import { components } from "./FormComponents";

const FormModal = () => {
  const isOpen = useSelector((state) => state.globalState.formModal.isOpen);
  const data = useSelector((state) => state.globalState.formModal.data);
  const columns = useSelector((state) => state.globalState.formModal.columns);
  const index = useSelector((state) => state.globalState.formModal.index);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(handleFormModal({ isOpen: false }));
  }

  const tableData = useContext(TableContext);
  const row = tableData.table.getRowModel().rows[index];
  const cells = tableData.table.getAllColumns();
  console.log("tableData", row, cells, cells[1].columnDef.field_type);

  return (
    <div>
      <h1>Form</h1>
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
              <Dialog.Panel
                className={
                  "flex w-5/6 h-[90vh] flex-col justify-start p-4 text-white  bg-neutral-500 overflow-y-auto"
                }>
                {cells.map((cell, idx) => {
                  if (idx == 0) {
                    return <div key={idx}></div>;
                  }
                  if (idx == 1) {
                    <div key={idx} className="flex-row w-full p-5">
                      <div className="w-full">{cell.columnDef.field_name}</div>
                      <div className="w-full bg-green-500 text-black">
                        {components[cell.columnDef.field_type]}
                      </div>
                      <div className="w-full h-1"></div>
                    </div>;
                  }
                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row w-full p-5">
                      <div className="sm:w-full" style={{ flex: "3" }}>
                        {cell.columnDef.field_name}
                      </div>
                      <div
                        className="sm:w-full bg-green-500 text-black"
                        style={{ flex: "7" }}>
                        {components[cell.columnDef.field_type]}
                      </div>
                    </div>
                  );
                })}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FormModal;
