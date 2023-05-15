import React, { useContext, useEffect, useState } from "react";
import { Popover, Transition, Listbox, Combobox } from "@headlessui/react";
import { Fragment } from "react";
import { TableContext } from "../tableComponents/TableComponents";
import { colorPallet } from "../../../utilities/colorPallet";

export default function TableUtilityColor() {
  const [selectType, setSelectType] = useState("");
  const { columns, selectedColorCondition, setSelectedColorCondition } =
    useContext(TableContext);
  colorsSupportedField = columns.filter((ele) => {
    if (ele?.field_type === "singleSelect") {
      return true;
    }
    return false;
  });
  const [selectedColorOption, setSelectedColorOption] = useState([]);

  useEffect(() => {
    let option = selectedColorOption?.options?.reduce(
      (obj, item) => item?.bgcolor && { ...obj, [item.name]: item.bgcolor },
      {}
    );
    setSelectedColorCondition({ name: selectedColorOption.field_name, option });
  }, [columns]);

  const Panel = () => {
    switch (selectType) {
      case "fields":
        return (
          <div className="min-w-[400px] p-4 min-h-[300px]">
            <div className="flex items-center ">
              <svg
                onClick={() => {
                  setSelectType("");
                  setSelectedColorCondition("");
                  setSelectedColorOption([]);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2 flex-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="flex-none mr-2">Coloring records the same as</p>
              <SelectOption
                selectedColorOption={selectedColorOption}
                setSelectedColorOption={setSelectedColorOption}
                setSelectedColorCondition={setSelectedColorCondition}
              />
            </div>
            <div className="text-sm mt-2">
              Editing colors will affect all views in this table.
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-1.5 rounded-md"></div>
            <div>
              {selectedColorOption?.options?.map((ele, i) => {
                if (ele?.bgcolor) {
                  return (
                    <div key={i} className="w-full flex h-8 items-center gap-2">
                      <svg
                        onClick={(e) => {
                          console.log(e);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 rounded-full p-1 shadow-md"
                        style={{
                          background: ele.bgcolor,
                          color: ele.color,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                      <div className="truncate max-w-[340px]">{ele.name}</div>
                      {/* <ColorPalletSelect event={ } /> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );

      case "conditions":
        return (
          <div>
            <div>
              <svg
                onClick={() => setSelectType("")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <p>Coloring records the same as</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-[310px]">
            <div
              className="p-4 hover:bg-gray-200"
              onClick={() => {
                setSelectType("fields");
              }}
            >
              <div className="text-black flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 96 960 960"
                  className="mr-1"
                  width="20"
                >
                  <path d="m480 613.232-93.308-93.308q-8.212-8.308-18.695-8.308-10.484 0-18.073 8.308-8.308 7.589-8.116 18.217.193 10.628 8.054 18.49l107.892 107.891q9.785 9.785 22.428 9.785t22.125-9.846l107.532-107.532q7.776-7.775 8.16-18.429.385-10.654-7.923-19.055-7.922-7.829-18.576-7.444-10.654.384-18.455 8.186L480 613.232Zm.343 326.767q-75.112 0-141.48-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.087t-28.433-141.673q0-75.378 28.42-141.246 28.42-65.869 78.21-115.682 49.791-49.814 116.087-78.247t141.673-28.433q75.378 0 141.246 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.853t28.433 141.173q0 75.112-28.42 141.48-28.42 66.369-78.21 116.182-49.791 49.814-115.853 78.247t-141.173 28.433ZM480 888q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                </svg>
                Select Fields
              </div>
              <p className="opacity-75 text-sm">
                Color records the same as a single select field
              </p>
            </div>
            <div
              className="p-4 hover:bg-gray-200"
              onClick={() => setSelectType("conditions")}
            >
              <div className="text-black flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                Conditions
              </div>
              <p className="opacity-75 text-sm">
                Color records based on conditions
              </p>
            </div>
          </div>
        );
    }
  };
  return (
    <Popover className="flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg  cursor-pointer relative ">
      <Popover.Button className="flex items-center font-medium outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 pr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
        Color
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
        <Popover.Panel className="absolute top-10 left-0 z-[3] bg-white   max-h-[calc(100vh/_.5)] rounded-md  shadow-custom ">
          {Panel()}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

let colorsSupportedField;

function SelectOption({
  selectedColorOption,
  setSelectedColorOption,
  setSelectedColorCondition,
}) {
  // const [selected, setSelected] = useState(colorsSupportedField[0]);

  return (
    <Listbox
      value={selectedColorOption}
      onChange={(e) => {
        setSelectedColorOption(e);
        let option = e?.options?.reduce(
          (obj, item) => item?.bgcolor && { ...obj, [item.name]: item.bgcolor },
          {}
        );
        setSelectedColorCondition({ name: e.field_name, option });
      }}
    >
      <div className="relative w-full mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {selectedColorOption?.header
              ? selectedColorOption?.header
              : "Select a option"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {colorsSupportedField.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person.header}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export function ColorPalletSelect(event, pallet, text) {
  console.log(event);
  return (
    <div className="w-full h-full grid grid-cols-10 grid-rows-4 absolute z-50">
      {colorPallet.map(({ background, color }) => {
        return (
          <div
            className="max-w-[100px] truncate"
            style={{
              background: background,
              color: color,
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
