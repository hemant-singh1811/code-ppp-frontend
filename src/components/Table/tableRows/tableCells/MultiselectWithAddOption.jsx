import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { colorPallet } from "../../../../utilities/colorPallet";
import { Popover, Transition } from "@headlessui/react";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { Fragment } from "react";

function MultiselectWithAddOption({ columnData, rowData, cell }) {
  const { columns, setColumns, table, activeRowHeight } =
    useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);

  let newOptions = [{ name: "" }];
  if (Array.isArray(columnData?.options)) {
    newOptions = columnData?.options;
  }

  // console.log(rowData);

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
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);

  function getRandomColor() {
    return colorPallet[Math.floor(Math.random() * colorPallet.length)];
  }

  let rowCopy = cell?.row?.original;

  function addNewOption() {
    let obj = {
      userToken: userToken,
      data: {
        fieldType: columnData?.fieldType,
        fieldId: columnData?.fieldId,
        tableId: selectedTableId,
        obj: {
          options: [
            ...options,
            {
              name: searchTerm,
              bgcolor: bgColorAndTextColor.background,
              color: bgColorAndTextColor.color,
            },
          ],
        },
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
      userToken: userToken,
      data: {
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: rowCopy.id52148213343234567,
        updatedData: [...selectedOption, searchTerm],
        fieldType: cell.column.columnDef.fieldType,
        fieldId: cell.column.columnDef.fieldId,
      },
    };

    socket.emit("updateMetaData", obj, (response) => {
      console.log("socket response: " + JSON.stringify(response));
    });

    socket.emit("updateData", rowObj, (response) => {
      table.options.meta?.updateData(
        cell.row.index,
        cell.column.id,
        [...selectedOption, searchTerm],
        response.metaData
      );
      console.log("res : ", response);
    });

    setBgColorAndTextColor(getRandomColor());
  }

  function updateOption(name) {
    rowData = [name];
    setSelectedOption([...selectedOption, name]);

    let rowObj = {
      userToken: userToken,
      data: {
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: rowCopy.id52148213343234567,
        updatedData: [...selectedOption, name],
        fieldType: cell.column.columnDef.fieldType,
        fieldId: cell.column.columnDef.fieldId,
      },
    };
    rowCopy[cell?.column.columnDef.fieldId] = rowData;

    socket.emit("updateData", rowObj, (response) => {
      table.options.meta?.updateData(
        cell.row.index,
        cell.column.id,
        [...selectedOption, name],
        response.metaData
      );
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

    let rowObj = {
      userToken: userToken,
      data: {
        baseId: selectedBaseId,
        tableId: selectedTableId,
        recordId: rowCopy.id52148213343234567,
        updatedData: updatedSelectedData,
        fieldType: cell.column.columnDef.fieldType,
        fieldId: cell.column.columnDef.fieldId,
      },
    };
    rowCopy[cell?.column.columnDef.fieldId] = rowData;

    socket.emit("updateData", rowObj, (response) => {
      table.options.meta?.updateData(
        cell.row.index,
        cell.column.id,
        updatedSelectedData,
        response.metaData
      );
      console.log("res : ", response);
    });
  }

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsEditMode(false);
  });

  useEffect(() => {
    setOptions(columnData?.options);
  }, [columns]);

  return (
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
              setIsEditMode(true);
            }}
            className={`relative select-none h-full w-full bg-transparent z-0 flex items-center  border-transparent border rounded-sm  outline-none border-none`}
            style={{
              // boxShadow: open && "0 0 0px 2px inset #166ee1",
              background: open ? "white" : "transparent",
            }}
          >
            <div
              className={`flex h-full  p-0.5 pt-[2px] pl-1  overflow-hidden items-start ${
                isEditMode ? "w-[calc(100%_-_16px)]" : "w-full"
              }`}
            >
              <div className=" w-full rounded-md cursor-pointer flex items-center pr-1 gap-2 flex-wrap">
                {options?.map(({ name, color, bgcolor }, i) => {
                  if (selectedOption?.includes(name) && name !== "")
                    return (
                      <div
                        key={i}
                        className={`flex items-center rounded-3xl px-2  mr-1 `}
                        style={{ background: bgcolor, color: color }}
                      >
                        <span className={`w-full truncate`}>{name}</span>
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOption(name);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      let alreadyPresentValues = options?.filter(
                        ({ name }) => name === searchTerm
                      );
                      if (alreadyPresentValues.length === 0) {
                        addNewOption(searchTerm);
                        close();
                      } else {
                        updateOption(searchTerm);
                        close();
                      }
                    }
                  }}
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
                  {options?.filter(({ name }) => name === searchTerm).length ===
                    0 && (
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
  );
}

export default MultiselectWithAddOption;
