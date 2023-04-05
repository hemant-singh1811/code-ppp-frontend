import React, { useContext, useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { TableContext } from "../tableComponents/TableComponents";
const socket = io(import.meta.env.VITE_SERVER_URL + "webdata");

function SingleSelectWithAddOption({ columnData, rowData }) {
  const { columns, setColumns } =
    useContext(TableContext);
  // const { columns } = useContext(TableContext);
  const { selectedTableId } = useSelector(state => state.globalState)
  // Create a ref that we add to the element for which we want to detect outside clicks
  const singleSelectRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
  useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));
  let newOptions;
  if (Array.isArray(columnData?.options)) {
    newOptions = columnData?.options
  }
  // console.log(newOptions)

  const [options, setOptions] = useState(newOptions);

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
      options: options
    }
  }
  // columnData.options = options

  useEffect(() => {
    // console.log(columnData)
    // socket.emit("updatemetadata", obj, (response) => {
    //   console.log("socket response: " + JSON.stringify(response));
    //   // console.log("res from server : ", response.message);
    // });
    // setColumns(...columns, columnData);
    // console.log("object", obj)
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [textColor, setTextColor] = useState(getContrastColor(bgColor));

  function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + "0".repeat(6 - color.length) + color;
  }

  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
  }

  function handleClick() {
    const newBgColor = getRandomColor();
    setBgColor(newBgColor);
    setTextColor(getContrastColor(newBgColor));
    // options: [{ value: "open", color: "" }, { value: "das", color: "" }, { value: "dasd", color: "" }]
    setColumns((prev) => {
      return prev.map((data) => {
        data.options = options
        return data
      })
    })
  }



  return (
    <div
      className="relative select-none h-full w-full z-0"
      ref={singleSelectRef}

    >
      <div
        onClick={() => { setSingleSelectToggle(!SingleSelectToggle); setSearchTerm("") }}
        className="bg-white w-full rounded-md cursor-pointer flex items-center px-2 justify-between "
      >
        {options.map(({ name, color, isSelected, bgcolor }, i) => {
          if (isSelected)
            return (
              <div
                key={i}
                className={`rounded-3xl px-2 truncate `}
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
          className="absolute -right-1 top-8 w-full max-h-[300px] bg-white rounded-md shadow-lg min-w-[200px] border  overflow-x-hidden overflow-y-auto"
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
              .filter(({ name }) => name?.includes(searchTerm))
              .map(({ color, name, bgcolor }, i) => {
                return (
                  <div
                    onClick={() => {
                      setOptions((prev) => {
                        return prev.map((prevMap) => {
                          if (name === prevMap.name) {
                            prevMap.isSelected = true;
                          } else {
                            prevMap.isSelected = false;
                          }
                          return prevMap;
                        });
                      });
                      setSingleSelectToggle(!SingleSelectToggle);
                    }}
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
                    )
                    }
                  </div>
                );
              })}
            {options.filter(({ name }) => name?.includes(searchTerm)).length ===
              0 && (
                <div
                  onClick={() => {
                    setOptions((prev) => {
                      let newdata = prev.map((prevMap) => {
                        prevMap.isSelected = false;
                        return prevMap;
                      });
                      newdata.push({
                        name: searchTerm,
                        isSelected: true,
                        bgcolor: bgColor,
                        color: textColor
                      });
                      return newdata;
                    });
                    setSearchTerm("");
                    setSingleSelectToggle(!SingleSelectToggle);
                  }}
                  className="p-2 hover:bg-blue-100 flex truncate"
                >
                  <div onClick={handleClick} className="truncate flex">
                    Add New Option:
                    {
                      searchTerm &&
                      <span
                        style={{ background: bgColor, color: textColor }}
                        className={`rounded-xl px-2 ml-1 truncate`}
                      >
                        {searchTerm}
                      </span>
                    }
                  </div>
                </div>
              )}
          </div>
        </div>
      )
      }
    </div >
  );
}

export default SingleSelectWithAddOption;
