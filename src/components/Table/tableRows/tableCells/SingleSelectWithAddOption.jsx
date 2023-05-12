import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDetectOutsideClick } from "../../../../utilities/customHooks/useDetectOutsideClick";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { colorPallet } from "../../../../utilities/colorPallet";
import { Popover, Transition } from "@headlessui/react";
import { useClickAway } from "react-use";

function SingleSelectWithAddOption({ columnData, rowData, cell }) {
  const { columns, setColumns, table, activeNumberOfLines, activeRowHeight } =
    useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const singleSelectRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));

  let newOptions = [{ name: "" }];
  if (Array.isArray(columnData?.options)) {
    newOptions = columnData?.options;
  }

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );

  const [isEditMode, setIsEditMode] = useState(false);

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
          {
            name: searchTerm,
            bgcolor: bgColorAndTextColor.background,
            color: bgColorAndTextColor.color,
          },
        ],
      },
    };

    table.options.meta?.updateData(cell.row.index, cell.column.id, [
      searchTerm,
    ]);

    setColumns((prev) => {
      return prev.map((data) => {
        if (data.field_id === columnData.field_id) {
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

    // Object.isFrozen(rowData);

    rowData = [searchTerm];
    setSelectedOption([searchTerm]);
    setSearchTerm("");
    setSingleSelectToggle(!SingleSelectToggle);
    rowCopy[cell?.column.id] = rowData;

    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [searchTerm] };

    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
    };

    socket.emit("updatemetadata", obj, (response) => {
      console.log("socket response: " + JSON.stringify(response));
    });

    socket.emit("updatedata", rowObj, (response) => {
      console.log("res : ", response);
    });

    setBgColorAndTextColor(getRandomColor());
  }

  function updateOption(name) {
    rowData = [name];
    setSelectedOption([name]);
    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [name] };

    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
    };
    rowCopy[cell?.column.id] = rowData;
    table.options.meta?.updateData(cell.row.index, cell.column.id, [name]);
    // console.log(rowObj)
    socket.emit("updatedata", rowObj, (response) => {
      console.log("res : ", response);
    });
    setSingleSelectToggle(!SingleSelectToggle);
  }

  useEffect(() => {
    setOptions(columnData?.options);
  }, [columns]);

  function handleDoubleClick() {
    setIsEditMode(true);
  }

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsEditMode(false);
  });

  return (
    <div>
      <Popover
        style={{
          height: activeRowHeight,
        }}
        className="flex h-full items-center rounded-md text-[#4d4d4d]  text-lg  cursor-pointer relative "
      >
        {({ open, close }) => (
          <>
            <Popover.Button
              onClick={() => {
                setSingleSelectToggle(!SingleSelectToggle);
                setSearchTerm("");
                handleDoubleClick();
              }}
              className={`relative select-none h-full w-full bg-transparent z-0 flex items-center  border-transparent border rounded-sm  outline-none border-none`}
              style={{
                boxShadow: open && "0 0 0px 2px inset #166ee1",
                background: open ? "white" : "transparent",
              }}
            >
              <div
                className={`flex h-full  p-0.5 pt-[3px] pl-1  items-start ${
                  isEditMode ? "w-[calc(100%_-_16px)]" : "w-full"
                }`}
              >
                <div className=" w-full rounded-md cursor-pointer flex items-center pr-1 justify-between ">
                  {options?.map(({ name, color, bgcolor }, i) => {
                    if (selectedOption?.includes(name) && name !== "")
                      return (
                        <div
                          key={i}
                          className={`rounded-3xl px-2 text-[13px] truncate w-fit bg-opacity-20`}
                          style={{ background: bgcolor, color: color }}
                        >
                          {name}
                        </div>
                      );
                  })}
                </div>
              </div>
              {open && (
                <div className="min-w-4 h-4 flex ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="min-w-4 h-4 text-blue-500 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              )}
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
              <Popover.Panel className="absolute  left-0 z-[3] bg-yellow-400   h-full rounded-md  shadow-custom ">
                <div
                  className="absolute -left-1 top-8 w-full  bg-white rounded-md shadow-lg min-w-[200px] border  overflow-x-hidden"
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
                  <div className="max-h-[300px]  overflow-y-auto">
                    {options
                      ?.filter(({ name }) => name?.includes(searchTerm))
                      .map(({ color, name, bgcolor }, i) => {
                        return (
                          <div
                            onClick={() => {
                              updateOption(name);
                              close();
                            }}
                            key={i}
                            className="p-2 hover:bg-blue-100 flex min-h-[30px] w-full"
                          >
                            {name && (
                              <div
                                onClick={() => {
                                  setSearchTerm("");
                                }}
                                style={{ background: bgcolor, color: color }}
                                className={`rounded-xl px-2 truncate`}
                              >
                                {name}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    {options?.filter(({ name }) => name === searchTerm)
                      .length === 0 && (
                      <div
                        onClick={(e) => {
                          addNewOption(e);
                          close();
                        }}
                        className="p-2 hover:bg-blue-100 flex truncate"
                      >
                        <div className="truncate flex">
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
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default SingleSelectWithAddOption;
