import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTableColumnMutation } from "../../../store/services/alphaTruckingApi";
import { TableContext } from "../tableComponents/TableComponents";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import getSvg from "./getSvg";
import SelectWithSearch from "./SelectWithSearch";

export default function TableColumnAdd({ headers }) {
  const { columns, setColumns, table } = useContext(TableContext);
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { bases } = useSelector((state) => state.bases);
  const [addColumnApi, responseCreateColumn] = useAddTableColumnMutation();

  const [descriptionToggle, setDescriptionToggle] = React.useState(false);
  const [fieldNameInput, setFieldNameInput] = React.useState("");
  const [fieldSearchInput, setFieldSearchInput] = React.useState("");
  const [isExistFieldNameInput, setIsExistFieldNameInput] =
    React.useState(false);
  const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");
  const [selectedFieldType, setSelectedFieldType] = React.useState(undefined);
  const [selectedFieldTypeLinkedRecord, setSelectedFieldTypeLinkedRecord] =
    React.useState(undefined);

  const tableIdMap = new Map();

  const existingColumns = new Map();

  const fieldsMap = new Map();

  const selectedOptionDescription = {
    "Single line text":
      "Enter text, or prefill each new cell with a default value.",
    "Long text": "Enter multiple lines of text.",
    "Look Up": "See values from a field in a linked record.",
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
    Number: "Enter a number, or prefill each new cell with a default value.",
    Currency:
      "Enter a monetary amount, or prefill each new cell with a default value.",
    Percent:
      "Enter a percentage, or prefill each new cell with a default value.",
    Duration:
      "Enter a duration of time in hours, minutes or seconds (e.g. 1:23).",
    Rating: "Add a rating on a predefined scale.",
    Formula: "Compute values based on fields.",
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

  let columnType = [
    "Link to another record",
    "Single line text",
    "Long text",
    "Attachment",
    "Checkbox",
    "Single Select",
    "Multiple select",
    "User",
    "Date",
    "Phone number",
    "Email",
    "URL",
    "Number",
    "Currency",
    "Percent",
    "Duration",
    "Rating",
    "Formula",
    "Rollup",
    "Count",
    "Lookup",
    "Created time",
    "Last modified time",
    "Created by",
    "Last modified by",
    "Autonumber",
    "barcode",
    "button",
  ];

  let fieldsType = [
    "linkedRecords",
    "singleLineText",
    "multilineText",
    "attachments",
    "checkbox",
    "singleSelect",
    "multipleSelect",
    "user",
    "date",
    "phoneNumber",
    "email",
    "url",
    "number",
    "currency",
    "percent",
    "duration",
    "rating",
    "formula",
    "rollup",
    "count",
    "lookup",
    "createdTime",
    "lastModifiedTime",
    "createdBy",
    "lastModifiedBy",
    "autoNumber",
    "barcode",
    "button",
  ];

  for (let i = 0; i < columnType?.length; i++) {
    fieldsMap.set(columnType[i], fieldsType[i]);
  }

  for (let i = 1; i < columns?.length; i++) {
    existingColumns.set(columns[i]?.header.toLocaleLowerCase(), true);
  }
  // console.log(bases);
  bases.forEach((ele) => {
    if (ele?.baseId === selectedBaseId) {
      ele?.tableMetaData.forEach(({ tableId, tableName }) => {
        tableIdMap.set(tableName, tableId);
      });
    }
  });

  useEffect(() => {
    if (responseCreateColumn.data) {
      console.log("Create column: " + responseCreateColumn.data);
      setColumns([
        ...columns,
        {
          ...responseCreateColumn.data,
          accessorKey: responseCreateColumn.data.fieldName,
          id: responseCreateColumn.data.fieldName,
          header: responseCreateColumn.data.fieldName,
        },
      ]);
      console.log(responseCreateColumn.data);
    }
  }, [responseCreateColumn.isSuccess]);

  return (
    <Popover className='relative'>
      {({ open, close }) => (
        <>
          <Popover.Button
            className='outline-none w-[120px]  th bg-[#f5f5f5] h-8'
            style={{ height: 32 }}
          >
            <div className='capitalize text-left text-lg font-normal select-none px-2 truncate w-full flex justify-center items-center cursor-pointer h-8'>
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
            </div>
          </Popover.Button>
          <Transition
            className='bg-white'
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
              className={`text-black absolute z-[100] top-[30px] bg-white w-96 rounded-md p-4 border-gray-400 border-2 flex flex-col ${
                headers.length < 3 ? "left-0" : "right-0"
              }`}
            >
              <div className='h-full w-full '>
                <input
                  type='text'
                  placeholder='Field Name (Mandatory)'
                  className='w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf]'
                  value={fieldNameInput}
                  onChange={(e) => {
                    setFieldNameInput(e.target.value);
                    existingColumns.get(e.target.value.toLocaleLowerCase())
                      ? setIsExistFieldNameInput(true)
                      : setIsExistFieldNameInput(false);
                  }}
                />

                {fieldSearchInput === "Link to another record" && (
                  <LinkedToAnotherRecordOptions
                    setFieldSearchInput={setFieldSearchInput}
                    setFieldNameInput={setFieldNameInput}
                    setIsExistFieldNameInput={setIsExistFieldNameInput}
                    setSelectedFieldType={setSelectedFieldType}
                    selectedFieldTypeLinkedRecord={
                      selectedFieldTypeLinkedRecord
                    }
                    setSelectedFieldTypeLinkedRecord={
                      setSelectedFieldTypeLinkedRecord
                    }
                  />
                )}

                {isExistFieldNameInput && (
                  <div className='text-red-700 text-sm m-1 '>
                    Please enter a unique field name
                  </div>
                )}

                {fieldSearchInput !== "Link to another record" && (
                  <div className='max-h-[calc(100vh_/_2)] mt-2 border-[#eaebed] border-2 rounded-md  overflow-auto overflow-x-auto p-1'>
                    <input
                      type='search'
                      name=''
                      id=''
                      className='bg-[#f0f1f3] w-full px-3 p-1.5  outline-none focus:bg-blue-50'
                      placeholder='Find a field type'
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
                      <div className='h-4/5 overflow-auto p-1 px-1.5  mb-1'>
                        {columnType
                          .filter((ele) => {
                            return ele
                              .toLowerCase()
                              .includes(fieldSearchInput.toLowerCase());
                          })
                          .map((field, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setSelectedFieldType(field);
                                  setFieldSearchInput(field);
                                }}
                                className='flex items-center px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md'
                              >
                                {getSvg(fieldsType[i])}
                                <div className='ml-2'>{field}</div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}

                {fieldSearchInput === "Lookup" && (
                  <LookUpOptions
                    setFieldSearchInput={setFieldSearchInput}
                    setFieldNameInput={setFieldNameInput}
                    setIsExistFieldNameInput={setIsExistFieldNameInput}
                    setSelectedFieldType={setSelectedFieldType}
                    selectedFieldTypeLinkedRecord={
                      selectedFieldTypeLinkedRecord
                    }
                    setSelectedFieldTypeLinkedRecord={
                      setSelectedFieldTypeLinkedRecord
                    }
                  />
                )}

                {selectedFieldType && (
                  <div className='m-1 text-sm'>
                    {selectedOptionDescription[selectedFieldType]}
                  </div>
                )}

                {descriptionToggle && (
                  <div className='mt-4'>
                    <div className='mb-1'>Description</div>
                    <input
                      type='text'
                      className='px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-sm'
                      placeholder='Describe this field (optional)'
                      value={fieldDescriptionInput}
                      onChange={(e) => setFieldDescriptionInput(e.target.value)}
                    />
                  </div>
                )}

                <div className='flex  justify-between items-center mt-8'>
                  <div>
                    <div
                      className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${
                        descriptionToggle && "hidden"
                      } `}
                      onClick={() => setDescriptionToggle(true)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 mr-1'
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
                  <div className='flex items-center gap-2'>
                    <div
                      className='hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer'
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
                    {/* {console.log(fieldNameInput)} */}
                    {selectedFieldType && (
                      <button
                        disabled={!fieldNameInput || isExistFieldNameInput}
                        onClick={async () => {
                          if (fieldSearchInput === "Link to another record") {
                            addColumnApi({
                              baseId: selectedBaseId,
                              data: {
                                baseId: selectedBaseId,
                                fieldDescription: fieldDescriptionInput,
                                fieldName: fieldNameInput,
                                fieldType: fieldsMap.get(selectedFieldType),
                                tableId: selectedTableId,
                                linkedRecord: {
                                  baseId: selectedBaseId,
                                  tableId: tableIdMap.get(
                                    selectedFieldTypeLinkedRecord
                                  ),
                                  selectedFieldId: "field id",
                                  selectedFieldName: "Name",
                                },
                              },
                            });
                          } else {
                            // console.log("called")
                            addColumnApi({
                              baseId: selectedBaseId,
                              data: {
                                tableId: selectedTableId,
                                fieldDescription: fieldDescriptionInput,
                                fieldName: fieldNameInput,
                                fieldType: fieldsMap.get(selectedFieldType),
                                baseId: selectedBaseId,
                              },
                            });
                          }

                          close();
                          setDescriptionToggle(false);
                          setSelectedFieldType(undefined);
                          setFieldSearchInput("");
                          setFieldNameInput("");
                          setFieldDescriptionInput("");
                        }}
                        className='bg-blue-600 rounded-md p-1.5 px-4 text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400'
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
      )}
    </Popover>
  );
}

function LinkedToAnotherRecordOptions({
  setFieldSearchInput,
  setFieldNameInput,
  setIsExistFieldNameInput,
  setSelectedFieldType,
  setSelectedFieldTypeLinkedRecord,
  selectedFieldTypeLinkedRecord,
}) {
  const [fieldSearchInputLinkedRecord, setFieldSearchInputLinkedRecord] =
    React.useState("");
  const { bases } = useSelector((state) => state.bases);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );

  return (
    <>
      <div className='max-h-[calc(100vh_/_2)] mt-2 border-[#eaebed] border-2 rounded-md  overflow-auto overflow-x-auto'>
        <div className='flex justify-center items-center'>
          <div
            onClick={() => {
              setFieldSearchInput("");
              setFieldNameInput("");
              setSelectedFieldTypeLinkedRecord(undefined);
              setFieldSearchInputLinkedRecord("");
              setIsExistFieldNameInput(false);
              setSelectedFieldType(undefined);
            }}
            className='flex items-center px-2 rounded-lg overflow-hidden cursor-pointer opacity-80 hover:opacity-100  '
          >
            <svg
              className='font-thin fill-blue-500 '
              xmlns='http://www.w3.org/2000/svg'
              height='20'
              viewBox='0 96 960 960'
              width='20'
            >
              <path d='M372 948 21 597q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T428 261L113 576l315 315q12 12 11.5 28.5T428 947q-12 12-28.5 12T372 948Z' />
            </svg>
            back
          </div>
          <input
            type='search'
            name=''
            id=''
            className='bg-[#f0f1f3] w-full px-3 p-1.5  outline-none focus:bg-blue-50 focus:border-transparent'
            placeholder='Find a table to link'
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
          <div className='h-4/5 overflow-auto p-1 px-1.5'>
            {bases.map(({ baseId, tableMetaData }) => {
              if (baseId === selectedBaseId) {
                return tableMetaData
                  .filter(({ tableName, tableId }) => {
                    return (
                      tableName
                        ?.toLowerCase()
                        ?.includes(
                          fieldSearchInputLinkedRecord.toLowerCase()
                        ) && tableId !== selectedTableId
                    );
                  })
                  .map(({ tableName }, i) => {
                    return (
                      <div
                        key={i}
                        className='px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md'
                        onClick={() => {
                          setSelectedFieldTypeLinkedRecord(tableName);
                          setFieldSearchInputLinkedRecord(
                            "Link to " + tableName
                          );
                        }}
                      >
                        {tableName}
                      </div>
                    );
                  });
              }
            })}
          </div>
        )}
      </div>
      {fieldSearchInputLinkedRecord && (
        <div className='mt-3'>
          Link to records in the {fieldSearchInputLinkedRecord} table.
        </div>
      )}
    </>
  );
}
function LookUpOptions() {
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const uniqueTablesMap = new Map();

  tableWithMultipleRecords.map((ele) => {
    uniqueTablesMap.set(ele.linkedRecord.tableName, ele);
  });

  // convert map to array
  const uniqueTablesArray = Array.from(uniqueTablesMap.values());

  const selectTableData = uniqueTablesArray.map((ele) => {
    return {
      name: ele.linkedRecord.tableName,
      icon: ele.fieldType,
      data: ele,
    };
  });

  let selectFieldData = [];

  if (selectedTable !== "") {
    console.log(selectedTable);
    selectFieldData = selectedTable.data?.linkedRecord?.model.map((ele) => {
      return ele;
    });
    selectFieldData = selectFieldData.map((ele) => {
      return {
        name: ele.data.fieldName,
        icon: ele.data.fieldType,
        data: ele.data,
      };
    });
    console.log(selectFieldData);
  }

  return (
    <>
      <div className='mt-2 -mb-2 text-sm'>
        Linked record field to use for lookup
      </div>
      <SelectWithSearch
        data={selectTableData}
        placeholder={"Choose a Table in this Field"}
        selectedItem={selectedTable}
        setSelectedItem={setSelectedTable}
        functionalityType='lookUp'
      />

      {selectedTable && (
        <>
          <div className='mt-2 -mb-2 text-sm'>
            <span className='font-semibold'>{selectedTable.name + " "}</span>
            field you want to look up
          </div>
          <SelectWithSearch
            data={selectFieldData}
            placeholder={"Choose a Field in this Table"}
            selectedItem={selectedField}
            setSelectedItem={setSelectedField}
            functionalityType='lookUp'
          />
        </>
      )}
    </>
  );
}
