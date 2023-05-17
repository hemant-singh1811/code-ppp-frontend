import React, { useContext, useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../../utilities/customHooks/useDetectOutsideClick";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { colorPallet } from "../../../../utilities/colorPallet";

function MultiselectWithAddOption({ columnData, rowData, cell }) {
  const { columns, setColumns } = useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const singleSelectRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));

  let newOptions = [{ name: "" }];
  if (Array.isArray(columnData?.options)) {
    newOptions = columnData?.options;
  }

  // console.log(rowData);

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(rowData || []);
  const [options, setOptions] = useState(newOptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [bgColorAndTextColor, setBgColorAndTextColor] = useState(
    getRandomColor()
  );

  function getRandomColor() {
    return colorPallet[Math.floor(Math.random() * colorPallet.length)];
  }

  let rowCopy = cell?.row?.original;

  function addNewOption() {
    let obj = {
      type: columnData?.fieldType,
      fieldId: columnData?.fieldId,
      tableId: selectedTableId,
      obj: {
        fieldId: columnData?.fieldId,
        fieldDescription: columnData?.fieldDescription,
        json_field_type: columnData?.json_field_type,
        createdAt: columnData?.createdAt,
        fieldType: columnData?.fieldType,
        createdBy: columnData?.createdBy,
        fieldName: columnData?.fieldName,
        options: [
          ...options,
          {
            name: searchTerm,
            bgcolor: bgColorAndTextColor.background,
            color: bgColorAndTextColor.color,
          },
        ],
      },
    };

    setColumns((prev) => {
      return prev.map((data) => {
        if (data.fieldId === columnData.fieldId) {
          data.options = [
            ...options,
            {
              name: searchTerm,
              bgcolor: bgColorAndTextColor.background,
              color: bgColorAndTextColor.color,
            },
          ];
        }
        return data;
      });
    });

    setOptions([
      ...options,
      {
        name: searchTerm,
        bgcolor: bgColorAndTextColor.background,
        color: bgColorAndTextColor.color,
      },
    ]);

    rowData = [searchTerm];

    setSelectedOption([...selectedOption, searchTerm]);

    setSearchTerm("");
    setSingleSelectToggle(!SingleSelectToggle);
    rowCopy[cell?.column.columnDef.fieldId] = rowData;

    let rowObj = {
      baseId: selectedBaseId,
      tableId: selectedTableId,
      recordId: rowCopy.id52148213343234567,
      updatedData: [...selectedOption, searchTerm],
      fieldType: cell.column.columnDef.fieldType,
      fieldName: cell.column.columnDef.fieldName,
      fieldId: cell.column.columnDef.fieldId,
    };

    socket.emit("updatemetadata", obj, (response) => {
      console.log("socket response: " + JSON.stringify(response));
    });

    socket.emit("updateData", rowObj, (response) => {
      console.log("res : ", response);
    });

    setBgColorAndTextColor(getRandomColor());
  }

  function updateOption(name) {
    rowData = [name];
    setSelectedOption([...selectedOption, name]);

    let rowObj = {
      baseId: selectedBaseId,
      tableId: selectedTableId,
      recordId: rowCopy.id52148213343234567,
      updatedData: [...selectedOption, name],
      fieldType: cell.column.columnDef.fieldType,
      fieldName: cell.column.columnDef.fieldName,
      fieldId: cell.column.columnDef.fieldId,
    };
    rowCopy[cell?.column.columnDef.fieldId] = rowData;

    socket.emit("updateData", rowObj, (response) => {
      console.log("res : ", response);
    });
    setSingleSelectToggle(!SingleSelectToggle);
  }

  function deleteOption(name) {
    rowData = [name];
    let updatedSelectedData = selectedOption.filter((ele) => {
      return ele !== name;
    });

    setSelectedOption((prev) => {
      updatedSelectedData = prev.filter((ele) => {
        return ele !== name;
      });
      return updatedSelectedData;
    });

    let updatedRowKey = cell?.column.columnDef.fieldId;

    let rowObj = {
      baseId: selectedBaseId,
      tableId: selectedTableId,
      recordId: rowCopy.id52148213343234567,
      updatedData: updatedSelectedData,
      fieldType: cell.column.columnDef.fieldType,
      fieldName: cell.column.columnDef.fieldName,
      fieldId: cell.column.columnDef.fieldId,
    };
    rowCopy[cell?.column.columnDef.fieldId] = rowData;

    socket.emit("updateData", rowObj, (response) => {
      console.log("res : ", response);
    });
  }

  useEffect(() => {
    setOptions(columnData?.options);
  }, [columns]);

  return (
    <div
      className={`relative select-none h-full w-full z-0 flex items-center  border-transparent border rounded-sm ${
        SingleSelectToggle && "border-blue-500"
      }`}
      // className="relative select-none h-full w-full z-0"
      ref={singleSelectRef}
    >
      <div className=' w-full rounded-md cursor-pointer flex items-center px-2 justify-between '>
        <div className='overflow-hidden flex w-full'>
          {options?.map(({ name, color, bgcolor }, i) => {
            if (selectedOption?.includes(name) && name !== "")
              return (
                <div
                  key={i}
                  className='flex items-center rounded-3xl px-2  mr-1'
                  style={{ background: bgcolor, color: color }}
                >
                  <div className={`truncate`}>{name}</div>
                  <svg
                    onClick={() => deleteOption(name)}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 ml-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </div>
              );
          })}
        </div>
        <svg
          onClick={() => {
            setSingleSelectToggle(!SingleSelectToggle);
            setSearchTerm("");
          }}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='min-w-4  h-4 text-blue-500 ml-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </div>
      {SingleSelectToggle && (
        <div
          className='absolute -left-1 top-8 w-full max-h-[300px] bg-white rounded-md shadow-lg min-w-[200px] border  overflow-x-hidden overflow-y-auto'
          style={{ zIndex: 100 }}
        >
          <input
            type='text'
            name='search option'
            id=''
            placeholder='find an option'
            className='w-full outline-none p-2'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoComplete={"off"}
            autoFocus
          />
          <div>
            {options
              ?.filter(({ name }) => name?.includes(searchTerm))
              .map(({ color, name, bgcolor }, i) => {
                return (
                  <div
                    onClick={() => updateOption(name)}
                    key={i}
                    className='p-2 hover:bg-blue-100 flex min-h-[30px] w-full'
                  >
                    {name && (
                      <div
                        onClick={() => setSearchTerm("")}
                        style={{ background: bgcolor, color: color }}
                        className={`rounded-xl px-2  truncate`}
                      >
                        {name}
                      </div>
                    )}
                  </div>
                );
              })}
            {options?.filter(({ name }) => name?.includes(searchTerm))
              .length === 0 && (
              <div
                onClick={addNewOption}
                className='p-2 hover:bg-blue-100 flex truncate'
              >
                <div className='truncate flex'>
                  Add New Option:
                  {searchTerm && (
                    <span
                      style={{
                        background: bgColorAndTextColor.background,
                        color: bgColorAndTextColor.color,
                      }}
                      className={`rounded-xl px-2 ml-1 truncate`}
                    >
                      {searchTerm}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiselectWithAddOption;
