import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAddTableColumnMutation } from "../../../store/services/alphaTruckingApi";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";
import { TableContext } from "../tableComponents/TableComponents";

export default function TableColumnAdd({ headers }) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const addColumnRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const location = useLocation();
  const { columns, setColumns } = useContext(TableContext);

  useDetectOutsideClick(addColumnRef, () => setAddColumnToggle(false));

  const [addColumnToggle, setAddColumnToggle] = React.useState(false);
  const [descriptionToggle, setDescriptionToggle] = React.useState(false);
  const [fieldNameInput, setFieldNameInput] = React.useState("");
  const [fieldSearchInput, setFieldSearchInput] = React.useState("");
  const [isExistFieldNameInput, setIsExistFieldNameInput] =
    React.useState(false);
  const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");
  const [selectedFieldType, setSelectedFieldType] = React.useState(undefined);

  const [addColumnApi, responseCreateColumn] = useAddTableColumnMutation();

  const existingColumns = new Map();

  const frontEndFieldsMap = new Map();

  const fieldsMap = new Map();

  // let frontEndFieldsType = [
  //   "Link to another record",
  //   "Single line text",
  //   "Long text",
  //   "Attachment",
  //   // "Checkbox",
  //   "Single Select",
  //   "Multiple select",
  //   // "User",
  //   "Date",
  //   // "Phone number",
  //   "Email",
  //   "URL",
  //   // "Created time",
  //   "Last modified time",
  //   "Created by",
  //   "Last modified by",
  //   // "Autonumber",
  //   // "button",
  // ];

  // let correspondingType = [
  //   "Link to another record",
  //   "string",
  //   "paragraph",
  //   "file",
  //   // "boolean",
  //   "string",
  //   "array",
  //   // "array",
  //   "date",
  //   // "number",
  //   "string",
  //   "string",
  //   // "time",
  //   "time",
  //   "user",
  //   "user",
  //   // "number",
  //   // "string",
  // ];

  let frontEndFieldsType = [
    "Link to another record",
    "Single line text",
    "Long text",
    "Attachment",
    "Single Select",
    "Multiple select",
    "Date",
    "Email",
    "URL",
    "Last modified time",
    "Created by",
    "Last modified by",
  ];

  let FieldsType = [
    "multipleRecordLinks",
    "singleLineText",
    "multilineText",
    "multipleAttachments",
    "singleSelect",
    "multipleSelects",
    "date",
    "email",
    "url",
    "lastModifiedTime",
    "createdBy",
    "lastModifiedBy",
  ];

  let correspondingType = [
    "Link to another record",
    "string",
    "paragraph",
    "file",
    "string",
    "array",
    "date",
    "string",
    "string",
    "time",
    "user",
    "user",
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
  console.log(columns);
  return (
    <div className="relative ref={addColumnRef}">
      <div className={`th bg-[#f5f5f5] border-r-[1px] mr-2`}>
        <div
          onClick={() => setAddColumnToggle(!addColumnToggle)}
          className="capitalize text-left text-lg font-normal select-none px-2 truncate w-[100px] flex justify-center items-center cursor-pointer"
        >
          <span className="material-symbols-rounded">add</span>
        </div>
      </div>
      {addColumnToggle && (
        <div
          className={`text-black absolute top-[30px] bg-white w-96 rounded-md p-4 border-gray-400 border-2 flex flex-col ${
            headers.length < 3 ? "left-0" : "right-0"
          }`}
        >
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
          {isExistFieldNameInput && (
            <div className="text-red-700 text-sm m-1 ">
              Please enter a unique field name
            </div>
          )}
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
              <div className="h-52 overflow-scroll p-1 px-1.5">
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

          {selectedFieldType && (
            <div className="m-1">
              A single line of text. You can optionally prefill each new cell
              with a default value:
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
                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${
                  descriptionToggle && "hidden"
                } `}
                onClick={() => setDescriptionToggle(true)}
              >
                <span className="material-symbols-rounded text-xl">add</span>{" "}
                Add description
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                onClick={() => {
                  setDescriptionToggle(false);
                  setAddColumnToggle(!addColumnToggle);
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
                      tableId: location.pathname.split("/")[2],
                      data: {
                        field_description: fieldDescriptionInput,
                        field_name: fieldNameInput,
                        field_type: fieldsMap.get(selectedFieldType),
                        json_field_type:
                          frontEndFieldsMap.get(selectedFieldType),
                      },
                    });
                    setDescriptionToggle(false);
                    setAddColumnToggle(!addColumnToggle);
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
      )}
    </div>
  );
}
