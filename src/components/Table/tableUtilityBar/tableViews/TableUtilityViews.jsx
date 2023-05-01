import React, { useContext, useEffect, useReducer, useState } from "react";
import { useDetectOutsideClick } from "../../../../utilities/customHooks/useDetectOutsideClick";
import { TableContext } from "../../tableComponents/TableComponents";
import { useForm } from "react-hook-form";
import {
  useCreateViewMutation,
  useDeleteViewMutation,
} from "../../../../store/services/alphaTruckingApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../utilities/Error";
import {
  handelUpdateModel,
  handleUpdateViews,
} from "../../../../store/features/viewsSlice";
import { handelViewsToggle } from "../../../../store/features/globalStateSlice";
import LoadingAlt from "../../../utilities/LoadingAlt";
import { useClickAway } from "react-use";

export default function TableUtilityViews() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative ">
      <div
        className="flex items-center font-medium"
        onClick={() => {
          dispatch(handelViewsToggle());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 pr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        Views
      </div>
    </div>
  );
}

export const ViewsComponent = () => {
  const { selectedTableViews } = useSelector((state) => state.views);

  function reducer(state, { type, targetState, viewTitle, id }) {
    switch (type) {
      case "toggleView":
        return state.map((prev) => {
          if (targetState === prev.title) {
            prev.collapsed = !prev.collapsed;
          }
          return prev;
        });
      case "addView":
        return state.map((prev) => {
          if (targetState === prev.title) {
            prev.data.push({
              title: viewTitle,
              data: [],
              id: id,
            });
          }
          return prev;
        });
      case "removeView":
        return state.map((prev) => {
          if (targetState === prev.title) {
            prev.data = prev.data?.filter((item) => {
              return item.id !== id;
            });
          }
          return prev;
        });
      // case 'copyView':
      // 	return state
      default:
        throw new Error();
    }
  }

  const [createToggle, setCreateToggle] = useState(true);
  const dispatch = useDispatch();

  const [views, viewsDispatch] = useReducer(reducer, [
    {
      title: "Personal Views",
      collapsed: true,
      data: selectedTableViews?.personalview?.map((ele, i) => {
        return {
          title: ele?.metadata?.name,
          data: ele?.model,
          id: ele?.metadata?.views_id,
        };
      }),
    },
    {
      title: "Shared View",
      collapsed: true,
      data: selectedTableViews?.sharedview?.map((ele) => {
        return {
          title: ele?.metadata?.name,
          data: ele?.model,
          id: ele?.metadata?.views_id,
        };
      }),
    },
  ]);

  return (
    <div className="text-black bg-white h-full  border-[#c8c8c8] border-r-[1px] p-2 flex flex-col justify-between select-none transition-all">
      <div>
        {/* <div className="flex items-center relative mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4  absolute  ml-4 fill-[rgb(68, 68, 68)]  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            className=" focus:outline-none focus:border-blue-500 border-[#e8e8e8] mx-2  transition-colors w-full p-2 px-4 pl-10 placeholder:text-[rgb(68, 68, 68)]"
            placeholder="Find a view"
          />
        </div> */}
        <div>
          {views.map(({ title, collapsed, data }, index) => {
            return (
              data.length > 0 && (
                <div key={title}>
                  <div
                    className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      viewsDispatch({ type: "toggleView", targetState: title });
                    }}
                  >
                    <div className="font-medium text-lg">{title}</div>
                    <div className="flex items-center gap-1">
                      <span>
                        {collapsed ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                  {collapsed &&
                    data.map((ele, i) => {
                      return (
                        <div key={i}>
                          <TableViewsPopUpMenuToolkit
                            viewsDispatch={viewsDispatch}
                            title={ele.title}
                            viewName={title}
                            id={ele.id}
                            model={ele.data}
                          />
                        </div>
                      );
                    })}
                  {views[1].data.length > 0 && index === 0 && (
                    <div className="h-[1px] w-full bg-[#e8e8e8] px-2 my-2 " />
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="border-t-[1px] border-[#e8e8e8] pt-2 mx-2 ">
        <div
          className="flex justify-between p-2 cursor-pointer"
          onClick={() => setCreateToggle(!createToggle)}
        >
          <div className="text-xl  font-medium">Create...</div>
          <span>
            {createToggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </span>
        </div>
        {createToggle && (
          <div className="p-2">
            {[...new Array(1)].map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 rounded-md  cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                      />
                    </svg>

                    <div>Grid</div>
                  </div>
                  <TableViewsAddToolkit
                    viewsDispatch={viewsDispatch}
                    views={views}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

function TableViewsPopUpMenuToolkit({
  viewsDispatch,
  title,
  viewName,
  id,
  model,
}) {
  const selectedView = useSelector((state) => state.views);
  // console.log(title, viewName, id)
  // Create a ref that we add to the element for which we want to detect outside clicks
  const viewsMenu = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [isMenuToggle, setIsMenuToggle] = React.useState(false);

  const dispatch = useDispatch();

  useDetectOutsideClick(viewsMenu, () => setIsMenuToggle(false));

  const [deleteViewApi, responseDeleteView] = useDeleteViewMutation();

  const { selectedTableId } = useSelector((state) => state.globalState);

  useEffect(() => {
    if (responseDeleteView?.data) {
      viewsDispatch({
        type: "removeView",
        targetState: viewName,
        id: id,
        viewTitle: title,
      });
    }
  }, [responseDeleteView.isSuccess]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [isMenuVisible, setMenuVisible] = useState({
  //   isOpen: false,
  // });
  // const buttonRef = useRef(null);

  function handleContextMenu(event) {
    event.preventDefault();
    // setMenuVisible({
    //   isOpen: true,
    // });
    setPosition({
      // x: event.pageX,
      // y: event.pageY,
      x: event.target.clientWidth + 8,
      y: 0,
      // x: event.nativeEvent.offsetX,
      // y: event.nativeEvent.offsetY,
      // x: event.nativeEvent.screenX,
      // y: event.nativeEvent.screenY,
    });
    setIsMenuToggle(!isMenuToggle);
  }

  // useClickAway(buttonRef, () => {
  //   setMenuVisible({ isOpen: false, type: "" });
  // });

  return (
    <div
      onContextMenu={(e) => {
        handleContextMenu(e);
      }}
      onClick={() => {
        dispatch(
          handleUpdateViews({
            name: title,
            id: id,
            model: model,
          })
        );
        dispatch(
          handelUpdateModel({
            name: title,
            id: id,
            model: model,
          })
        );
      }}
      ref={viewsMenu}
      className={`flex items-center justify-between p-2 rounded cursor-pointer my-1 hover:bg-slate-100 relative ${
        selectedView.id === id && "bg-blue-300 hover:bg-blue-400"
      }`}
    >
      <div className="font-medium ml-7 text-base truncate">{title}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-5 h-5  mx-1"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuToggle(!isMenuToggle);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {isMenuToggle && (
        <div
          style={{ left: 242, top: position.y }}
          className="absolute w-72 top-0 -right-[250px] bg-white p-2  z-50 shadow-lg border-gray-600 border-[1px] rounded  "
        >
          <div
            className="flex items-center p-2 rounded cursor-pointer hover:bg-slate-100"
            onClick={(e) => {
              setIsMenuToggle(!isMenuToggle);
              deleteViewApi({ tableId: selectedTableId, viewId: id });
              e.stopPropagation();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <div className="font-medium text-base truncate ml-2">
              Delete View
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TableViewsAddToolkit({ viewsDispatch, views }) {
  const { table } = useContext(TableContext);
  const [createViewApi, responseCreateView] = useCreateViewMutation();
  const { selectedTableId } = useSelector((state) => state.globalState);

  // Create a ref that we add to the element for which we want to detect outside clicks
  const viewsMenu = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [isMenuToggle, setIsMenuToggle] = React.useState(false);
  useDetectOutsideClick(viewsMenu, () => setIsMenuToggle(false));

  const [createViewInput, setCreateViewInput] = useState("");
  const [handelErrorOnInput, setHandelErrorOnInput] = useState(false);

  const alreadyCreatedViewsSet = new Set();

  views.forEach(({ data }) => {
    data.forEach(({ title }) => {
      alreadyCreatedViewsSet.add(title);
    });
  });

  useEffect(() => {
    if (responseCreateView?.data) {
      console.log("Created view Res:", responseCreateView?.data);
      viewsDispatch({
        type: "addView",
        targetState: "Personal Views",
        viewTitle: createViewInput.trim(),
        id: responseCreateView?.data?.viewid,
      });
      setCreateViewInput("");
      setIsMenuToggle(!isMenuToggle);
    }
  }, [responseCreateView.isSuccess]);

  const createView = () => {
    createViewApi({
      name: createViewInput.trim(),
      table_id: selectedTableId,
      model: table.options.state,
    });
  };

  const onChangeInput = (e) => {
    setCreateViewInput(e.target.value);
    if (alreadyCreatedViewsSet.has(e.target.value.trim())) {
      setHandelErrorOnInput(true);
    } else {
      setHandelErrorOnInput(false);
    }
  };

  return (
    <div ref={viewsMenu} className="relative flex items-center ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 hover:bg-[#f4f4f4]"
        onClick={() => setIsMenuToggle(!isMenuToggle)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      {isMenuToggle && (
        <div className="absolute w-96 -bottom-4 left-16 bg-white p-4 z-50 shadow-lg border-gray-200 rounded border ">
          <input
            onChange={(e) => onChangeInput(e)}
            value={createViewInput}
            type="text"
            className="w-full mb-1 border border-black rounded p-2 py-1"
            placeholder="Enter View Name"
          />
          <div className="h-5">
            {handelErrorOnInput && (
              <label className="text-sm text-red-500">
                View Already Exist Try entering a different view name.
              </label>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-8">
            <button
              className="rounded hover:bg-gray-200 p-1 px-3 text-lg"
              onClick={() => setIsMenuToggle(!isMenuToggle)}
            >
              Cancel
            </button>
            <button
              onClick={() => createView()}
              className={`rounded bg-blue-600 p-1 px-3 text-white text-lg disabled:bg-gray-400 min-w-[140px] flex justify-center items-center ${
                responseCreateView.isLoading && "bg-gray-400"
              } `}
              disabled={createViewInput == "" ? true : handelErrorOnInput}
            >
              {responseCreateView.isLoading ? (
                <LoadingAlt />
              ) : (
                "Create New View"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
