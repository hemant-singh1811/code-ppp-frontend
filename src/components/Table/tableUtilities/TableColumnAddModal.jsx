import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddTableColumnMutation,
  useEditTableFieldMutation,
} from "../../../store/services/alphaTruckingApi";
import { TableContext } from "../tableComponents/TableComponents";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import getSvg from "./getSvg";
import SelectWithSearch from "./SelectWithSearch";
import { usePopper } from "react-popper";
import CheckboxPallate from "../../../utilities/checkboxPallate";
import { useClickAway, useEffectOnce } from "react-use";
import { closeAddColumnMenu } from "../../../store/features/menuSlice";

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
  Percent: "Enter a percentage, or prefill each new cell with a default value.",
  Duration:
    "Enter a duration of time in hours, minutes or seconds (e.g. 1:23).",
  Rating: "Add a rating on a predefined scale.",
  Formula: "Compute values based on fields.",
  Count: "Count the number of linked records.",
  "Created time": "See the date and time each record was created.",
  "Last modified time":
    "See the date and time of the most recent edit to some or all fields in a record.",
  "Created by": "See which user created the record.",
  "Last modified by":
    "See which user made the most recent edit to some or all fields in a record.",
  Autonumber:
    "Automatically generate unique incremental numbers for each record.",
  barcode: "See barcodes scanned from the TMS app.",
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
  // "User",
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
  // "Rollup",
  "Count",
  "Lookup",
  "Created time",
  "Last modified time",
  "Created by",
  "Last modified by",
  "Autonumber",
  "Barcode",
  "Button",
];

let fieldsType = [
  "linkedRecords",
  "singleLineText",
  "multilineText",
  "attachments",
  "checkbox",
  "singleSelect",
  "multipleSelect",
  // "user",
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
  // "rollup",
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

const tableIdMap = new Map();
const existingColumns = new Map();
const fieldsMap = new Map();
const getColumnType = new Map();

function TableColumnAddModal({}) {
  const dispatch = useDispatch();

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { bases } = useSelector((state) => state.bases);
  const {
    addColumnIsOpen,
    addColumnPosition,
    selectedColumn,
    columns,
    setColumns,
  } = useSelector((state) => state.menu);

  for (let i = 0; i < columnType?.length; i++) {
    fieldsMap.set(columnType[i], fieldsType[i]);
    getColumnType.set(fieldsType[i], columnType[i]);
  }

  for (let i = 1; i < columns?.length; i++) {
    existingColumns.set(columns[i]?.fieldName.toLocaleLowerCase(), true);
  }

  const [editFieldApi, responseEditField] = useEditTableFieldMutation();

  const [descriptionToggle, setDescriptionToggle] = React.useState(false);

  const [fieldNameInput, setFieldNameInput] = React.useState("");

  const [fieldSearchInput, setFieldSearchInput] = React.useState("");

  const [isExistFieldNameInput, setIsExistFieldNameInput] =
    React.useState(false);

  const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");

  const [selectedFieldType, setSelectedFieldType] = React.useState(undefined);

  const [selectedFieldTypeLinkedRecord, setSelectedFieldTypeLinkedRecord] =
    React.useState(undefined);

  const ref = useRef();

  const [fieldOptions, setFieldOptions] = useState(null);
  useClickAway(ref, () => {
    dispatch(closeAddColumnMenu());
  });
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);

  bases.forEach((ele) => {
    if (ele?.baseId === selectedBaseId) {
      ele?.tableMetaData.forEach(({ tableId, tableName }) => {
        tableIdMap.set(tableName, tableId);
      });
    }
  });

  const onCreateField = () => {
    switch (fieldSearchInput) {
      //   case "Link to another record":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         baseId: selectedBaseId,
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         linkedRecord: {
      //           baseId: selectedBaseId,
      //           tableId: tableIdMap.get(selectedFieldTypeLinkedRecord),
      //         },
      //       },
      //     });
      //     break;

      //   case "Number":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Currency":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         currencyFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Percent":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         percentFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Duration":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         durationFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Rating":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         ratingFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Button":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         buttonFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Count":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         countFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      //   case "Formula":
      //     addColumnApi({
      //       baseId: selectedBaseId,
      //       data: {
      //         tableId: selectedTableId,
      //         fieldDescription: fieldDescriptionInput,
      //         fieldName: fieldNameInput,
      //         fieldType: fieldsMap.get(selectedFieldType),
      //         baseId: selectedBaseId,
      //         formulaFieldOptions: fieldOptions,
      //       },
      //     });
      //     break;

      default:
        editFieldApi({
          baseId: selectedBaseId,
          body: {
            tableId: selectedTableId,
            fieldType: fieldsMap.get(selectedFieldType),
            fieldId: selectedColumn.fieldId,
            fieldData: {
              fieldDescription: fieldDescriptionInput,
              fieldName: fieldNameInput,
            },
          },
        });
        break;
    }

    // close();
    setDescriptionToggle(false);
    setSelectedFieldType(undefined);
    setFieldSearchInput("");
    setFieldNameInput("");
    setFieldDescriptionInput("");
  };

  useEffect(() => {
    console.log(columns);
    console.log("Edit column: " + responseEditField.data);
    if (responseEditField.data) {
      setColumns(() => {
        return responseEditField.data.map(({ data, id }, index) => {
          return {
            ...data,
            accessorKey: id,
            id: id,
            header: id,
            minSize: 100,
          };
        });
      });

      // setColumns([
      //   ...columns,
      //   {
      //     ...responseEditField.data,
      //     accessorKey: responseEditField.data.fieldId,
      //     id: responseEditField.data.fieldId,
      //     header: responseEditField.data.fieldId,
      //     minSize: 100,
      //   },
      // ]);
    }
  }, [responseEditField.isSuccess]);

  useEffect(() => {
    setFieldNameInput(selectedColumn.fieldName);
    setSelectedFieldType(getColumnType.get(selectedColumn?.fieldType));
    setFieldSearchInput(getColumnType.get(selectedColumn?.fieldType));
  }, [selectedColumn]);

  return (
    <Transition
      ref={ref}
      show={addColumnIsOpen}
      className="bg-white"
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div
        ref={setPopperElement}
        style={{
          left: addColumnPosition.x,
          top: addColumnPosition.y,
        }}
        {...attributes.popper}
        className={`text-black absolute z-[100] top-[30px] bg-white w-96 rounded-md p-4  shadow-custom flex flex-col `}
      >
        <div className="h-full w-full ">
          <input
            type="text"
            placeholder="Field Name (Mandatory)"
            className={`w-full  p-1.5  rounded-md  outline-none shadow-input  border-2  ${
              isExistFieldNameInput
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-500 border-transparent"
            }  `}
            value={fieldNameInput}
            autoFocus
            onChange={(e) => {
              setFieldNameInput(e.target.value);
              existingColumns.get(e.target.value.toLocaleLowerCase())
                ? setIsExistFieldNameInput(true)
                : setIsExistFieldNameInput(false);
            }}
          />

          {isExistFieldNameInput && (
            <div className="text-red-700 text-sm m-1 ">
              Please enter a unique field name
            </div>
          )}

          {selectedFieldType && (
            <div className="m-1 text-sm ">
              {selectedOptionDescription[selectedFieldType]}
            </div>
          )}

          <GetFieldByType
            columns={columns}
            type={fieldSearchInput}
            setFieldSearchInput={setFieldSearchInput}
            setFieldNameInput={setFieldNameInput}
            setIsExistFieldNameInput={setIsExistFieldNameInput}
            setSelectedFieldType={setSelectedFieldType}
            selectedFieldTypeLinkedRecord={selectedFieldTypeLinkedRecord}
            setSelectedFieldTypeLinkedRecord={setSelectedFieldTypeLinkedRecord}
            fieldOptions={fieldOptions}
            setFieldOptions={setFieldOptions}
            fieldSearchInput={fieldSearchInput}
            selectedFieldType={selectedFieldType}
            fieldsMap={fieldsMap}
          />

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

          <div className="flex justify-between items-center mt-8">
            <div>
              <div
                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${
                  descriptionToggle && "hidden"
                } `}
                onClick={() => setDescriptionToggle(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add description
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                onClick={() => {
                  // close();
                  dispatch(closeAddColumnMenu());
                  // setDescriptionToggle(false);
                  // setSelectedFieldType(undefined);
                  // setFieldSearchInput("");
                  // setFieldNameInput("");
                }}
              >
                Cancel
              </div>
              {selectedFieldType && (
                <button
                  disabled={!fieldNameInput || isExistFieldNameInput}
                  onClick={() => {
                    // close();
                    onCreateField();
                  }}
                  className="bg-blue-600 rounded-md p-1.5 px-4 text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

function GetFieldByType({
  type,
  setFieldSearchInput,
  setFieldNameInput,
  setIsExistFieldNameInput,
  setSelectedFieldType,
  selectedFieldTypeLinkedRecord,
  setSelectedFieldTypeLinkedRecord,
  fieldOptions,
  setFieldOptions,
  fieldSearchInput,
  selectedFieldType,
  fieldsMap,
  columns,
}) {
  let SelectedFieldOption = (
    <div className="max-h-[calc(100vh_/_2)] mt-2  rounded-md  shadow-input  ">
      <div className="relative " tabIndex={-1}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50 ">
          {fieldsMap.get(fieldSearchInput)
            ? getSvg(fieldsMap.get(fieldSearchInput))
            : getSvg("search")}
        </div>
        <input
          type="search"
          className=" w-full px-2  outline-none py-2 pl-11 bg-transparent relative z-10 focus:bg-sky-50  "
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

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer">
          {fieldsMap.get(fieldSearchInput) && getSvg("arrowDown")}
        </div>
      </div>
      {!selectedFieldType && (
        <div className="h-4/5 overflow-auto p-1 border-t-[1px]  mb-1">
          {columnType
            .filter((ele) => {
              return ele.toLowerCase().includes(fieldSearchInput.toLowerCase());
            })
            .map((field, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedFieldType(field);
                    setFieldSearchInput(field);
                  }}
                  className="flex items-center px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md"
                >
                  {getSvg(fieldsType[i])}
                  <div className="ml-2">{field}</div>
                </div>
              );
            })}

          {columnType.filter((ele) => {
            return ele.toLowerCase().includes(fieldSearchInput.toLowerCase());
          }) <= 0 && (
            <dvi className="ml-1 flex gap-2 mt-2">
              {getSvg()} No Options found
            </dvi>
          )}
        </div>
      )}
    </div>
  );

  // console.log(fieldOptions);

  switch (type) {
    case "Link to another record":
      return (
        <LinkedToAnotherRecordOptions
          setFieldSearchInput={setFieldSearchInput}
          setFieldNameInput={setFieldNameInput}
          setIsExistFieldNameInput={setIsExistFieldNameInput}
          setSelectedFieldType={setSelectedFieldType}
          selectedFieldTypeLinkedRecord={selectedFieldTypeLinkedRecord}
          setSelectedFieldTypeLinkedRecord={setSelectedFieldTypeLinkedRecord}
        />
      );

    case "Lookup":
      return (
        <LookUpOptions
          setFieldSearchInput={setFieldSearchInput}
          setFieldNameInput={setFieldNameInput}
          setIsExistFieldNameInput={setIsExistFieldNameInput}
          setSelectedFieldType={setSelectedFieldType}
          selectedFieldTypeLinkedRecord={selectedFieldTypeLinkedRecord}
          setSelectedFieldTypeLinkedRecord={setSelectedFieldTypeLinkedRecord}
        />
      );

    case "Number":
      return (
        <>
          {SelectedFieldOption}
          <NumberOptions setFieldOptions={setFieldOptions} />
        </>
      );

    case "Currency":
      return (
        <>
          {SelectedFieldOption}
          <CurrencyOptions setFieldOptions={setFieldOptions} />
        </>
      );

    case "Percent":
      return (
        <>
          {SelectedFieldOption}
          <PercentOptions setFieldOptions={setFieldOptions} />
        </>
      );

    case "Duration":
      return (
        <>
          {SelectedFieldOption}
          <DurationOptions setFieldOptions={setFieldOptions} />
        </>
      );

    case "Rating":
      return (
        <>
          {SelectedFieldOption}
          <RatingOptions setFieldOptions={setFieldOptions} />
        </>
      );

    case "Button":
      return (
        <>
          {SelectedFieldOption}
          <ButtonOptions columns={columns} setFieldOptions={setFieldOptions} />
        </>
      );

    case "Count":
      return (
        <>
          {SelectedFieldOption}
          <CountOptions columns={columns} setFieldOptions={setFieldOptions} />
        </>
      );

    case "Single Select":
      return (
        <>
          {SelectedFieldOption}
          <SingleAndMultiSelectOptions
            columns={columns}
            setFieldOptions={setFieldOptions}
          />
        </>
      );

    case "Multiple select":
      return (
        <>
          {SelectedFieldOption}
          <SingleAndMultiSelectOptions
            columns={columns}
            setFieldOptions={setFieldOptions}
          />
        </>
      );

    case "Checkbox":
      return (
        <>
          {SelectedFieldOption}
          <CheckboxOptions
            columns={columns}
            setFieldOptions={setFieldOptions}
          />
        </>
      );

    case "Formula":
      return (
        <>
          {SelectedFieldOption}
          <FormulaOptions columns={columns} setFieldOptions={setFieldOptions} />
        </>
      );

    default:
      return (
        <div className="max-h-[calc(100vh_/_2)] mt-2  rounded-md  shadow-input  ">
          <div className="relative " tabIndex={-1}>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50 ">
              {fieldsMap.get(fieldSearchInput)
                ? getSvg(fieldsMap.get(fieldSearchInput))
                : getSvg("search")}
            </div>
            <input
              type="search"
              className=" w-full px-2  outline-none py-2 pl-11 bg-transparent relative z-10 focus:bg-sky-50  "
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

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer">
              {fieldsMap.get(fieldSearchInput) && getSvg("arrowDown")}
            </div>
          </div>
          {!selectedFieldType && (
            <div className="max-h-[calc(100vh_/_2.8)] overflow-auto p-1 border-t-[1px]  mb-1  overflow-x-auto">
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
                      className="flex items-center px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md"
                    >
                      {getSvg(fieldsType[i])}
                      <div className="ml-2">{field}</div>
                    </div>
                  );
                })}

              {columnType.filter((ele) => {
                return ele
                  .toLowerCase()
                  .includes(fieldSearchInput.toLowerCase());
              }) <= 0 && (
                <dvi className="ml-1 flex gap-2 mt-2">
                  {getSvg()} No Options found
                </dvi>
              )}
            </div>
          )}
        </div>
      );
  }
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
      <div className="max-h-[calc(100vh_/_2)] mt-2 shadow-input rounded-md  overflow-auto overflow-x-auto">
        <div className="flex justify-center items-center border-b-[1px]">
          <div
            onClick={() => {
              setFieldSearchInput("");
              setFieldNameInput("");
              setSelectedFieldTypeLinkedRecord(undefined);
              setFieldSearchInputLinkedRecord("");
              setIsExistFieldNameInput(false);
              setSelectedFieldType(undefined);
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
            placeholder="Find a table to link"
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
          <div className="h-4/5 overflow-auto p-1 px-1.5">
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
                        className="px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md"
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
            {bases.map(({ baseId, tableMetaData }) => {
              if (baseId === selectedBaseId) {
                return (
                  tableMetaData.filter(({ tableName, tableId }) => {
                    return (
                      tableName
                        ?.toLowerCase()
                        ?.includes(
                          fieldSearchInputLinkedRecord.toLowerCase()
                        ) && tableId !== selectedTableId
                    );
                  }).length <= 0 && (
                    <div className="py-2 text-center">
                      No Tables Available in the base to link
                    </div>
                  )
                );
              }
            })}
          </div>
        )}
      </div>
      {fieldSearchInputLinkedRecord && (
        <div className="mt-3">
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

  tableWithMultipleRecords?.map((ele) => {
    uniqueTablesMap.set(ele.linkedRecord.tableName, ele);
  });

  // convert map to array
  const uniqueTablesArray = Array.from(uniqueTablesMap.values()) || [];

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
  }

  console.log(selectTableData);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">
        Linked record field to use for lookup
      </div>
      <SelectWithSearch
        data={selectTableData}
        placeholder={"Choose a Table in this Field"}
        selectedItem={selectedTable}
        setSelectedItem={setSelectedTable}
        functionalityType="lookUp"
      />

      {selectedTable && (
        <>
          <div className="mt-2 -mb-2 text-sm">
            <span className="font-semibold">{selectedTable.name + " "}</span>
            field you want to look up
          </div>
          <SelectWithSearch
            data={selectFieldData}
            placeholder={"Choose a Field in this Table"}
            selectedItem={selectedField}
            setSelectedItem={setSelectedField}
            functionalityType="lookUp"
          />
        </>
      )}
    </>
  );
}

function CurrencyOptions({ setFieldOptions }) {
  const [decimalPrecisionData, setDecimalPrecisionData] = useState([
    {
      name: "$1",
      icon: "",
      data: 0,
    },
    {
      name: "$1.0",
      icon: "",
      data: 1,
    },
    {
      name: "$1.00",
      icon: "",
      data: 2,
    },
    {
      name: "$1.000",
      icon: "",
      data: 3,
    },
    {
      name: "$1.0000",
      icon: "",
      data: 4,
    },
    {
      name: "$1.00000",
      icon: "",
      data: 5,
    },
    {
      name: "$1.000000",
      icon: "",
      data: 6,
    },
    {
      name: "$1.0000000",
      icon: "",
      data: 7,
    },
    {
      name: "$1.00000000",
      icon: "",
      data: 8,
    },
  ]);

  const [selectedPrecisionType, setSelectedPrecisionType] = useState(
    decimalPrecisionData[0]
  );
  const [currencyValue, setCurrencyValue] = useState("$");

  useEffect(() => {
    setFieldOptions({
      currencyValue: currencyValue,
      fieldPrecision: selectedPrecisionType.data,
    });
  }, [selectedPrecisionType, currencyValue]);

  return (
    <>
      <div className="relative mt-2 ">
        <input
          value={currencyValue}
          onChange={(e) => {
            let value = 1;
            setCurrencyValue(e.target.value);

            let tempPrecisionData = decimalPrecisionData.map((_, i) => {
              return {
                name: e.target.value + (i === 0 ? 1 : value.toFixed(i)),
                icon: "",
                data: i,
              };
            });

            if (tempPrecisionData)
              setSelectedPrecisionType(tempPrecisionData[0]);

            setDecimalPrecisionData(tempPrecisionData);
          }}
          className="flex items-center border-2  w-full gap-1 text-black bg-white  outline-none focus:border-blue-500 p-1 rounded-md relative"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 96 960 960"
          width="20"
          className="absolute z-10  right-1 top-1/2 transform -translate-y-1/2 "
        >
          <path d="M480 708 256 484l34-34 190 190 190-190 34 34-224 224Z" />
        </svg>
      </div>

      <div className="mt-2 -mb-2 text-sm">Precision</div>
      <SelectWithSearch
        data={decimalPrecisionData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedPrecisionType}
        setSelectedItem={setSelectedPrecisionType}
      />
    </>
  );
}

function NumberOptions({ setFieldOptions }) {
  const decimalData = [
    {
      name: "Decimal (1.0)",
      icon: "",
      data: "decimal",
    },
    {
      name: "Integer (2)",
      icon: "",
      data: "integer",
    },
  ];
  const decimalPrecisionData = [
    {
      name: "1.0",
      icon: "",
      data: 1,
    },
    {
      name: "1.00",
      icon: "",
      data: 2,
    },
    {
      name: "1.000",
      icon: "",
      data: 3,
    },
    {
      name: "1.0000",
      icon: "",
      data: 4,
    },
    {
      name: "1.00000",
      icon: "",
      data: 5,
    },
    {
      name: "1.000000",
      icon: "",
      data: 6,
    },
    {
      name: "1.0000000",
      icon: "",
      data: 7,
    },
    {
      name: "1.00000000",
      icon: "",
      data: 8,
    },
  ];

  const [selectedNumberType, setSelectedNumberType] = useState({
    name: "Decimal (1.0)",
    icon: "",
    data: "decimal",
  });
  const [selectedPrecisionType, setSelectedPrecisionType] = useState({
    name: "1.0",
    icon: "",
    data: 1,
  });

  useEffect(() => {
    if (selectedNumberType) {
      if (selectedNumberType?.data === "decimal") {
        if (selectedPrecisionType) {
          setFieldOptions({
            numberType: selectedNumberType.data,
            fieldPrecision: selectedPrecisionType.data,
          });
        }
      } else if (selectedNumberType?.data === "integer") {
        setFieldOptions({
          numberType: selectedNumberType.data,
        });
      }
    }
  }, [selectedPrecisionType, selectedNumberType]);

  return (
    <>
      <SelectWithSearch
        data={decimalData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedNumberType}
        setSelectedItem={setSelectedNumberType}
      />

      {selectedNumberType?.data === "decimal" && (
        <>
          <div className="mt-2 -mb-2 text-sm">Precision</div>
          <SelectWithSearch
            data={decimalPrecisionData}
            placeholder={"Choose a type of value in this Field"}
            selectedItem={selectedPrecisionType}
            setSelectedItem={setSelectedPrecisionType}
          />
        </>
      )}
    </>
  );
}

function PercentOptions({ setFieldOptions }) {
  const decimalPrecisionData = [
    {
      name: "1",
      icon: "",
      data: 0,
    },
    {
      name: "1.0",
      icon: "",
      data: 1,
    },
    {
      name: "1.00",
      icon: "",
      data: 2,
    },
    {
      name: "1.000",
      icon: "",
      data: 3,
    },
    {
      name: "1.0000",
      icon: "",
      data: 4,
    },
    {
      name: "1.00000",
      icon: "",
      data: 5,
    },
    {
      name: "1.000000",
      icon: "",
      data: 6,
    },
    {
      name: "1.0000000",
      icon: "",
      data: 7,
    },
    {
      name: "1.00000000",
      icon: "",
      data: 8,
    },
  ];

  const [selectedPrecisionType, setSelectedPrecisionType] = useState(
    decimalPrecisionData[0]
  );

  useEffect(() => {
    setFieldOptions({
      fieldPrecision: selectedPrecisionType.data,
    });
  }, [selectedPrecisionType]);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">Precision</div>
      <SelectWithSearch
        data={decimalPrecisionData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedPrecisionType}
        setSelectedItem={setSelectedPrecisionType}
      />
    </>
  );
}

function SingleAndMultiSelectOptions({ setFieldOptions }) {
  return <div className="mt-2 -mb-2 text-sm">Precision</div>;
}

function DurationOptions({ setFieldOptions }) {
  const [selectedDurationFormat, setSelectedDurationFormat] = useState({
    name: "h:mm (e.g. 1:23)",
    icon: "",
    data: "h:mm",
  });
  const durationFormatData = [
    {
      name: "h:mm (e.g. 1:23)",
      icon: "",
      data: "h:mm",
    },
    {
      name: "h:mm:ss (e.g. 1:23:40)",
      icon: "",
      data: "h:mm:ss",
    },
    {
      name: "h:mm:ss.s (e.g. 1:23:40.0)",
      icon: "",
      data: "h:mm:ss.s",
    },
    {
      name: "h:mm:ss.ss (e.g. 1:23:40.00)",
      icon: "",
      data: "h:mm:ss.ss",
    },
    {
      name: "h:mm:ss.sss (e.g. 1:23:40.000)",
      icon: "",
      data: "h:mm:ss.sss",
    },
  ];

  useEffect(() => {
    setFieldOptions({
      durationFormat: selectedDurationFormat.data,
    });
  }, [selectedDurationFormat]);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">Duration Format</div>
      <SelectWithSearch
        data={durationFormatData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedDurationFormat}
        setSelectedItem={setSelectedDurationFormat}
      />
    </>
  );
}

function RatingOptions({ setFieldOptions }) {
  const [selectedRatingFormat, setSelectedRatingFormat] = useState({
    name: "5",
    icon: "",
    data: 5,
  });
  const ratingData = [
    {
      name: "1",
      icon: "",
      data: 1,
    },
    {
      name: "2",
      icon: "",
      data: 2,
    },
    {
      name: "3",
      icon: "",
      data: 3,
    },
    {
      name: "4",
      icon: "",
      data: 4,
    },
    {
      name: "5",
      icon: "",
      data: 5,
    },
    {
      name: "6",
      icon: "",
      data: 6,
    },
    {
      name: "7",
      icon: "",
      data: 7,
    },
    {
      name: "8",
      icon: "",
      data: 8,
    },
    {
      name: "9",
      icon: "",
      data: 9,
    },
    {
      name: "10",
      icon: "",
      data: 10,
    },
  ];

  useEffect(() => {
    setFieldOptions({
      ratingFormat: selectedRatingFormat.data,
    });
  }, [selectedRatingFormat]);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">Select Rating Stars</div>
      <SelectWithSearch
        data={ratingData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedRatingFormat}
        setSelectedItem={setSelectedRatingFormat}
      />
    </>
  );
}

function ButtonOptions({ setFieldOptions, columns }) {
  let fieldData = columns
    .map(({ fieldName, fieldType, id }) => {
      return {
        name: fieldName,
        icon: fieldType,
        data: id,
      };
    })
    .filter((ele) => ele.name);
  const [selectedLinkedField, setSelectedLinkedField] = useState(fieldData[0]);

  const [label, setLabel] = useState("Open URL");

  useEffect(() => {
    setFieldOptions({
      selectedFieldId: selectedLinkedField?.data,
      label: label,
      background: "#ffffff",
      color: "#000000",
    });
  }, [selectedLinkedField]);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">Label</div>
      <div className="relative mt-2 ">
        <input
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className="flex items-center border-2  w-full gap-1 text-black bg-white  outline-none focus:border-blue-500 p-1 rounded-md relative"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 96 960 960"
          width="20"
          className="absolute z-10  right-1 top-1/2 transform -translate-y-1/2 "
        >
          <path d="M480 708 256 484l34-34 190 190 190-190 34 34-224 224Z" />
        </svg>
      </div>

      <div className="mt-2 -mb-2 text-sm">Duration Format</div>
      <SelectWithSearch
        data={fieldData}
        placeholder={"Choose a type of value in this Field"}
        selectedItem={selectedLinkedField}
        setSelectedItem={setSelectedLinkedField}
      />
    </>
  );
}

function CountOptions({ setFieldOptions, columns }) {
  let linkedTableData = columns
    .map(({ fieldType, id, linkedRecord }) => {
      if (linkedRecord) {
        return {
          name: linkedRecord.tableName,
          icon: fieldType,
          data: id,
        };
      }
    })
    .filter((ele) => ele?.name);
  const [selectedLinkedField, setSelectedLinkedField] = useState(
    linkedTableData[0]
  );

  useEffect(() => {
    setFieldOptions({
      selectedFieldId: selectedLinkedField?.data,
    });
  }, [selectedLinkedField]);

  return (
    <>
      {linkedTableData.length > 0 ? (
        <>
          <div className="mt-2 -mb-2 text-sm">
            Linked record field to use for count
          </div>
          <SelectWithSearch
            data={linkedTableData}
            placeholder={"Choose a type of value in this Field"}
            selectedItem={selectedLinkedField}
            setSelectedItem={setSelectedLinkedField}
          />
        </>
      ) : (
        <div className="mt-2 -mb-2 text-sm">No Linked Table Found</div>
      )}
    </>
  );
}

function CheckboxOptions({ setFieldOptions, columns }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setFieldOptions({
      checked: checked,
    });
  }, [checked]);

  return (
    <>
      <div className="mt-2 -mb-2 text-sm">Default Value</div>
      <CheckboxPallate />
    </>
  );
}

function FormulaOptions({ setFieldOptions }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { columns } = useContext(TableContext);
  console.log(columns);

  useEffect(() => {
    setFieldOptions({
      formula: value,
    });
  }, [value]);

  const validate = (value) => {
    if (columns.some((ele) => ele.fieldName === value)) {
      setError(false);
      return true;
    }
    //setError(true);
    //setErrorMessage("Invalid Column Name");
    return false;
  };

  const onChangeHandler = (e) => {
    if (e.target.value === "") {
      setError(false);
      setValue(e.target.value);
      return;
    }
    validate(e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <div className="mt-2 mb-2">Formula</div>
      <textarea
        className="w-full border rounded p-1 px-2"
        placeholder="formula"
        value={value}
        onChange={onChangeHandler}
      />
      {error ? <div className="text-red-500">{errorMessage}</div> : null}
    </>
  );
}

export default TableColumnAddModal;
