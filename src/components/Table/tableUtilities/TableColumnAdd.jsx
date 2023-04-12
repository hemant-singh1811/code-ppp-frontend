import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTableColumnMutation } from "../../../store/services/alphaTruckingApi";
import { TableContext } from "../tableComponents/TableComponents";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TableColumnAdd({ headers }) {
  const { columns, setColumns, table } = useContext(TableContext);
  const { selectedTableId } = useSelector((state) => state.globalState);
  const [addColumnApi, responseCreateColumn] = useAddTableColumnMutation();

  const [descriptionToggle, setDescriptionToggle] = React.useState(false);
  const [fieldNameInput, setFieldNameInput] = React.useState("");
  const [fieldSearchInput, setFieldSearchInput] = React.useState("");
  const [selectedFieldTypeLinkedRecord, setSelectedFieldTypeLinkedRecord] =
    React.useState(undefined);
  const [fieldSearchInputLinkedRecord, setFieldSearchInputLinkedRecord] =
    React.useState("");
  const { bases } = useSelector((state) => state.bases);
  const { selectedBaseId } = useSelector((state) => state.globalState);
  const [isExistFieldNameInput, setIsExistFieldNameInput] =
    React.useState(false);
  const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");
  const [selectedFieldType, setSelectedFieldType] = React.useState(undefined);



  const existingColumns = new Map();

  const frontEndFieldsMap = new Map();

  const fieldsMap = new Map();

  const selectedOptionDescription = {
    "Link to another record": "Link to records in the Company table.",
    "Single line text":
      "Enter text, or prefill each new cell with a default value.",
    "Long text": "Enter multiple lines of text.",
    Attachment:
      "Add images, documents, or other files to be viewed or downloaded.",
    Checkbox: "Check or uncheck to indicate status.",
    "Single Select": "Select one predefined option from a list.",
    "Multiple select": "Select one or more predefined options in a list.",
    User: "Add an Software user to a record.",
    Date: "Enter a date (e.g. 11/12/2023) or choose one from a calendar.",
    "Phone number": "Enter a telephone number (e.g. (415) 555-9876).",
    Email: "Enter an email address (e.g. andrew@example.com).",
    URL: "Enter a URL (e.g. demo.com or https://demo.com/universe).",
    "Created time": "See the date and time each record was created.",
    "Last modified time":
      "See the date and time of the most recent edit to some or all fields in a record.",
    "Created by": "See which user created the record.",
    "Last modified by":
      "See which user made the most recent edit to some or all fields in a record.",
    Autonumber:
      "Automatically generate unique incremental numbers for each record.",
    button: "Trigger a customized action.",
  };

  let frontEndFieldsType = [
    "Link to another record",
    "Single line text",
    "Long text",
    "Attachment",
    "Checkbox",
    "Single Select",
    "Multiple select",
    // "User",
    "Date",
    "Phone number",
    "Email",
    "URL",
    "Created time",
    "Last modified time",
    "Created by",
    "Last modified by",
    "Autonumber",
    "button",
  ];

  let correspondingType = [
    "Link to another record",
    "string",
    "paragraph",
    "file",
    "boolean",
    "string",
    "array",
    // "array",
    "date",
    "number",
    "string",
    "string",
    "time",
    "time",
    "user",
    "user",
    "number",
    "string",
  ];

  let FieldsType = [
    "multipleRecordLinks",
    "singleLineText",
    "multilineText",
    "multipleAttachments",
    "checkbox",
    "singleSelect",
    "multipleSelects",
    // "",
    "date",
    "phoneNumber",
    "email",
    "url",
    "createdTime",
    "lastModifiedTime",
    "createdBy",
    "lastModifiedBy",
    "autoNumber",
    "button",
  ];

  for (let i = 0; i < correspondingType?.length; i++) {
    frontEndFieldsMap.set(frontEndFieldsType[i], correspondingType[i]);
    fieldsMap.set(frontEndFieldsType[i], FieldsType[i]);
  }

  for (let i = 0; i < columns?.length; i++) {
    existingColumns.set(columns[i]?.header.toLocaleLowerCase(), true);
  }

  useEffect(() => {
    if (responseCreateColumn.data) {
      setColumns([
        ...columns,
        {
          ...responseCreateColumn.data,
          accessorKey: responseCreateColumn.data.field_name,
          id: responseCreateColumn.data.field_name,
          header: responseCreateColumn.data.field_name,
        },
      ]);
    }
  }, [responseCreateColumn.isSuccess]);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="outline-none w-[120px] th bg-[#f5f5f5]">
            <div className="capitalize text-left text-lg font-normal select-none px-2 truncate w-full flex justify-center items-center cursor-pointer">
              <span className="material-symbols-rounded">add</span>
            </div>
          </Popover.Button>
          <Transition
            className="bg-white"
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`text-black absolute z-[100] top-[30px] bg-white w-96 rounded-md p-4 border-gray-400 border-2 flex flex-col ${headers.length < 3 ? "left-0" : "right-0"
                }`}
            >
              <div className="h-full w-full ">
                <input
                  type="text"
                  placeholder="Field Name (Mandatory)"
                  className="w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf]"
                  value={fieldNameInput}
                  onChange={(e) => {
                    setFieldNameInput(e.target.value);
                    existingColumns.get(e.target.value.toLocaleLowerCase())
                      ? setIsExistFieldNameInput(true)
                      : setIsExistFieldNameInput(false);
                  }}
                />

                {fieldSearchInput === "Link to another record" && (
                  <div className=" mt-2 border-[#eaebed] border-2 rounded-md  overflow-hidden">
                    <div className="flex justify-center items-center">
                      <div
                        onClick={() => {
                          setFieldSearchInput("");
                          setFieldNameInput("")
                          setSelectedFieldTypeLinkedRecord(undefined)
                          setFieldSearchInputLinkedRecord("")
                          setIsExistFieldNameInput(false)
                          setSelectedFieldType(undefined)
                        }}
                        className="flex items-center px-2 rounded-lg overflow-hidden cursor-pointer opacity-80 hover:opacity-100  "
                      >
                        <svg
                          className="font-thin fill-blue-500 "
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 96 960 960"
                          width="20"
                        >
                          <path d="M372 948 21 597q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T428 261L113 576l315 315q12 12 11.5 28.5T428 947q-12 12-28.5 12T372 948Z" />
                        </svg>
                        back
                      </div>
                      <input
                        type="search"
                        name=""
                        id=""
                        className="bg-[#f0f1f3] w-full px-3 p-1.5  outline-none focus:bg-blue-50 focus:border-transparent"
                        placeholder="Find a field type"
                        value={fieldSearchInputLinkedRecord}
                        onChange={(e) => {
                          setFieldSearchInputLinkedRecord(e.target.value);
                        }}
                        onClick={() => {
                          setSelectedFieldTypeLinkedRecord(undefined);
                          setFieldSearchInputLinkedRecord("");
                        }}
                      />
                    </div>

                    {!selectedFieldTypeLinkedRecord && (
                      <div className="h-4/5 overflow-scroll p-1 px-1.5">
                        {bases.map(({ baseid, tablemetadata }) => {
                          if (baseid === selectedBaseId) {
                            return tablemetadata
                              .filter(({ table_name }) => {
                                return table_name
                                  ?.toLowerCase()
                                  ?.includes(
                                    fieldSearchInputLinkedRecord.toLowerCase()
                                  );
                              })
                              .map(({ table_name }, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md"
                                    onClick={() => {
                                      setSelectedFieldTypeLinkedRecord(
                                        table_name
                                      );
                                      setFieldSearchInputLinkedRecord(
                                        table_name
                                      );
                                    }}
                                  >
                                    {table_name}
                                  </div>
                                );
                              });
                          }
                        })}
                      </div>
                    )}
                  </div>
                )}

                {isExistFieldNameInput && (
                  <div className="text-red-700 text-sm m-1 ">
                    Please enter a unique field name
                  </div>
                )}
                {fieldSearchInput !== "Link to another record" && (
                  <div className=" mt-2 border-[#eaebed] border-2 rounded-md  overflow-hidden">
                    <input
                      type="search"
                      name=""
                      id=""
                      className="bg-[#f0f1f3] w-full px-3 p-1.5  outline-none focus:bg-blue-50"
                      placeholder="Find a field type"
                      value={fieldSearchInput}
                      onChange={(e) => {
                        setFieldSearchInput(e.target.value);
                      }}
                      onClick={() => {
                        setSelectedFieldType(undefined);
                        setFieldSearchInput("");
                      }}
                    />
                    {!selectedFieldType && (
                      <div className="h-4/5 overflow-scroll p-1 px-1.5">
                        {frontEndFieldsType
                          .filter((ele) => {
                            return ele
                              .toLowerCase()
                              .includes(fieldSearchInput.toLowerCase());
                          })
                          .map((field, i) => {
                            return (
                              <div
                                key={i}
                                className="px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md"
                                onClick={() => {
                                  setSelectedFieldType(field);
                                  setFieldSearchInput(field);
                                }}
                              >
                                {field}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}

                {selectedFieldType && (
                  <div className="m-1 text-sm">
                    {selectedOptionDescription[selectedFieldType]}
                  </div>
                )}

                {descriptionToggle && (
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
                )}
                <div className="flex  justify-between items-center mt-8">
                  <div>
                    <div
                      className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${descriptionToggle && "hidden"
                        } `}
                      onClick={() => setDescriptionToggle(true)}
                    >
                      <span className="material-symbols-rounded text-xl">
                        add
                      </span>{" "}
                      Add description
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                      onClick={() => {
                        close();
                        setDescriptionToggle(false);
                        setSelectedFieldType(undefined);
                        setFieldSearchInput("");
                        setFieldNameInput("");
                      }}
                    >
                      cancel
                    </div>
                    {selectedFieldType && (
                      <button
                        disabled={!fieldNameInput || isExistFieldNameInput}
                        onClick={async () => {
                          addColumnApi({
                            tableId: selectedTableId,
                            data: {
                              field_description: fieldDescriptionInput,
                              field_name: fieldNameInput,
                              field_type: fieldsMap.get(selectedFieldType),
                              json_field_type:
                                frontEndFieldsMap.get(selectedFieldType),
                            },
                          });
                          //       {
                          //         field_name: 'Entered Field name',
                          //           // field_id: '',
                          //           field_type: 'multipleRecordLinks',
                          // json_field_type: 'array',
                          // field_description: '',
                          // linked_rec: {
                          //   baseid: 'selected base id',
                          // tableid: 'table id',
                          // field_id: 'field id',
                          // field_name: 'default selected field name',
                          //           }
                          //       },
                          close();
                          setDescriptionToggle(false);
                          setSelectedFieldType(undefined);
                          setFieldSearchInput("");
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
            </Popover.Panel>
          </Transition>
        </>
      )
      }
    </Popover >
  );
}
