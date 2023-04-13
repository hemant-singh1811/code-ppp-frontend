import React, { useContext, useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../../utilities/customHooks/useDetectOutsideClick";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";

function SingleSelectWithAddOption({ columnData, rowData, cell }) {
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

  // console.log(newOptions)

  // console.log(rowData);

  const { selectedTableId } = useSelector((state) => state.globalState);
  const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(rowData);
  const [options, setOptions] = useState(newOptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [textColor, setTextColor] = useState(getContrastColor(bgColor));

  function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#66" + "0".repeat(6 - color.length) + color;
  }

  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
  }
  let rowCopy = cell?.row?.original;

  function addNewOption() {
    let obj = {
      type: columnData?.field_type,
      field_id: columnData?.field_id,
      table_id: selectedTableId,
      obj: {
        field_id: columnData?.field_id,
        field_description: columnData?.field_description,
        json_field_type: columnData?.json_field_type,
        created_at: columnData?.created_at,
        field_type: columnData?.field_type,
        created_by: columnData?.created_by,
        field_name: columnData?.field_name,
        options: [
          ...options,
          { name: searchTerm, bgcolor: bgColor, color: textColor },
        ],
      },
    };

    setColumns((prev) => {
      return prev.map((data) => {
        if (data.field_id === columnData.field_id) {
          data.options = [
            ...options,
            { name: searchTerm, bgcolor: bgColor, color: textColor },
          ];
        }
        return data;
      });
    });

    setOptions([
      ...options,
      { name: searchTerm, bgcolor: bgColor, color: textColor },
    ]);

    // Object.isFrozen(rowData);

    rowData = [searchTerm];
    setSelectedOption([searchTerm]);
    setSearchTerm("");
    setSingleSelectToggle(!SingleSelectToggle);
    rowCopy[cell?.column.id] = rowData;

    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [searchTerm] };

    let rowObj = {
      base_id: "",
      table_id: location.pathname.split("/")[2],
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
    };

    socket.emit("updatemetadata", obj, (response) => {
      console.log("socket response: " + JSON.stringify(response));
    });

    socket.emit("updatedata", rowObj, (response) => {
      console.log("res : ", response);
    });

    const newBgColor = getRandomColor();
    setBgColor(newBgColor);
    setTextColor(getContrastColor(newBgColor));
  }

  function updateOption(name) {
    rowData = [name];
    setSelectedOption([name]);
    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [name] };

    let rowObj = {
      base_id: "",
      table_id: location.pathname.split("/")[2],
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
    };
    rowCopy[cell?.column.id] = rowData;

    // console.log(rowObj)
    socket.emit("updatedata", rowObj, (response) => {
      console.log("res : ", response);
    });
    setSingleSelectToggle(!SingleSelectToggle);
  }

  useEffect(() => {
    setOptions(columnData?.options);
  }, [columns]);

  return (
    <div
      className={`relative select-none h-full w-full z-0 flex items-center  border-transparent border rounded-sm ${SingleSelectToggle && "border-blue-500"
        }`}
      ref={singleSelectRef}
    >
      <div
        onClick={() => {
          setSingleSelectToggle(!SingleSelectToggle);
          setSearchTerm("");
        }}
        className="bg-white w-full rounded-md cursor-pointer flex items-center px-2 justify-between "
      >
        {options?.map(({ name, color, bgcolor }, i) => {
          if (selectedOption?.includes(name) && name !== "")
            return (
              <div
                key={i}
                className={`rounded-3xl px-2 truncate w-fit bg-opacity-20`}
                style={{ background: bgcolor, color: color }}
              >
                {name}
              </div>
            );
        })}

        <span className="material-symbols-rounded text-blue-500 ml-auto">
          keyboard_arrow_down
        </span>
      </div>
      {SingleSelectToggle && (
        <div
          className="absolute -left-1 top-8 w-full max-h-[300px] bg-white rounded-md shadow-lg min-w-[200px] border  overflow-x-hidden overflow-y-auto"
          style={{ zIndex: 100 }}
        >
          <input
            type="text"
            name="search option"
            id=""
            placeholder="find an option"
            className="w-full outline-none p-2"
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
                    className="p-2 hover:bg-blue-100 flex min-h-[30px] w-full"
                  >
                    {name && (
                      <div
                        onClick={() => setSearchTerm("")}
                        style={{ background: bgcolor, color: color }}
                        className={`rounded-xl px-2 border-black border-[0.1px] truncate`}
                      >
                        {name}
                      </div>
                    )}
                  </div>
                );
              })}
            {options?.filter(({ name }) => name?.includes(searchTerm)).length ===
              0 && (
                <div
                  onClick={addNewOption}
                  className="p-2 hover:bg-blue-100 flex truncate"
                >
                  <div className="truncate flex">
                    Add New Option:
                    {searchTerm && (
                      <span
                        style={{ background: bgColor, color: textColor }}
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

export default SingleSelectWithAddOption;
