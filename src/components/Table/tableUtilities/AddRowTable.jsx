import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";

export default function AddRowTable({ tableModel }) {
  const location = useLocation();

  // Create a ref that we add to the element for which we want to detect outside clicks
  const addRowToggle = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [openAddRowToggle, setOpenAddRowToggle] = React.useState(false);

  useDetectOutsideClick(addRowToggle, () => setOpenAddRowToggle(false));

  // const { sidebarData } = useSelector((state) => state.globalState);

  // let tableNamesWithId = sidebarData.map((ele) => {
  //   return ele.tablemetadata.map(({ table_id, table_name }) => {
  //     return { table_id, table_name };
  //   });
  // });

  const fieldsMapTempTesting = new Map();

  tableModel.map((ele) => {
    fieldsMapTempTesting.set(ele?.data?.field_type, true);
  });

  // for (let [key, value] of fieldsMapTempTesting.entries()) {
  //   console.log(key + " = " + value);
  // }

  return (
    <div
      ref={addRowToggle}
      className="absolute  flex items-center w-full bottom-0 rounded-md text-[#4d4d4d]  text-lg "
    >
      <div
        onClick={() => {
          setOpenAddRowToggle(!openAddRowToggle);
        }}
        className="text-black border-[1px] shadow-md bg-white hover:bg-blue-100 border-black   absolute bottom-3 left-3 rounded-full px-3 pl-1 h-10 flex justify-center items-center cursor-pointer "
      >
        <span className="material-symbols-rounded">add</span> Add Row
      </div>
      {openAddRowToggle && (
        <div className="h-4/5 w-1/2 overflow-scroll max-h-[80vh] min-w-[500px] mr-auto mt-auto bg-orange-100 z-50 p-10 pt-4 flex flex-col rounded-tr-md shadow-md">
          <h1>
            {/* {tableNamesWithId.map((ele) => {
              return ele.map(({ table_id, table_name }) => {
                if (table_id == location.pathname.split("/")[2]) {
                  return (
                    <div className=" text-center font-semibold text-2xl mb-5">
                      {table_name} Add Rows
                    </div>
                  );
                }
              });
            })} */}
          </h1>

          <div className="grid grid-cols-2 gap-y-4 gap-x-5 flex-1">
            {tableModel.map(({ data }, i) => {
              return (
                <div key={i} className="">
                  <div className="text-sm ml-1">{data?.field_name}</div>
                  {data?.field_type === "string" ||
                    (data?.field_type === "widgets" && (
                      <div className="">
                        <input
                          type="text"
                          placeholder={data?.field_name}
                          className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                        />
                      </div>
                    ))}
                  {data?.field_type === "image" && (
                    <div className="">
                      <input
                        type="file"
                        placeholder={data?.field_name}
                        className="text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500"
                      />
                    </div>
                  )}
                  {data?.field_type === "array" && (
                    <div className="">
                      <input
                        type="email"
                        placeholder={data?.field_name}
                        className="text-black w-full p-1.5 px-2 rounded-md shadow-md focus:outline-blue-500"
                      />
                    </div>
                  )}
                  {data?.field_type === "date" && (
                    <div className="">
                      <input
                        type="date"
                        placeholder={data?.field_name}
                        className="text-black w-full p-1.5 px-2 rounded-md shadow-md focus:outline-blue-500"
                      />
                    </div>
                  )}
                  {data?.field_type === "number" && (
                    <div className="">
                      <input
                        type="number"
                        placeholder={data?.field_name}
                        className="text-black w-full p-1.5 px-2 rounded-md shadow-md focus:outline-blue-500"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 justify-between text-white text-xl mt-8">
            <button
              className="px-4 p-1 hover:bg-red-600 bg-red-400   rounded-md shadow-md"
              onClick={() => setOpenAddRowToggle(false)}
            >
              Cancel
            </button>
            <button className="px-4 p-1 hover:bg-green-600 bg-green-400  rounded-md shadow-md">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
