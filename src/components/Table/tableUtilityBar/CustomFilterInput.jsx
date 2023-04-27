import React from "react";

export default function CustomFilterInput({
  table,
  type,
  operator,
  value,
  id,
  removeCondition,
  setFilterConditions,
}) {
  const handleInputChange = (type, value, id) => {
    setFilterConditions((prev) => {
      return prev.map((ele) => {
        if (ele.id === id) {
          if (type === "type") {
            ele.type = value;
          } else if (type === "operator") {
            ele.operator = value;
          } else if (type === "value") {
            ele.value = value;
          }
        }
        return ele;
      });
    });
  };
  return (
    <div className="m-2">
      <div className="flex border my-2 border-cyan-200 rounded-lg">
        <select
          placeholder="Select a type"
          value={type}
          onChange={(e) => handleInputChange("type", e.target.value, id)}
          className="block w-60 p-2  bg-white border border-gray-300 rounded-tl-md rounded-bl-md outline-none appearance-none hover:bg-gray-100 text-base"
        >
          {table
            .getHeaderGroups()
            .map((headerGroup) =>
              headerGroup.headers.map((header, i) => (
                <option key={i}>{header.column.id}</option>
              ))
            )}
        </select>
        <select
          value={operator}
          onChange={(e) => handleInputChange("operator", e.target.value, id)}
          placeholder="Select a condition"
          className="block w-60 p-2  bg-white border border-gray-300 outline-none appearance-none   hover:bg-gray-100 text-base"
        >
          <option>Contains</option>
          {/* <option>Does Not Contains</option> */}
        </select>
        <input
          value={value}
          onChange={(e) => handleInputChange("value", e.target.value, id)}
          className="block w-60 p-2  bg-white border focus:outline-blue-500 border-gray-300 hover:bg-gray-100  text-base"
          type="text"
          placeholder="Enter a Value"
        />
        <div
          onClick={() => removeCondition(id)}
          className="bg-white border border-gray-300 rounded-tr-md rounded-br-md flex items-center hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
