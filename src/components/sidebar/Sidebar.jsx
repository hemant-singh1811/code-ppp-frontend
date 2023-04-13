import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handelAddBases } from "../../store/features/BasesStateSlice";
import {
  handelSelectedTableId,
  handleAddToggle,
  handleCreateTableBaseId,
  handleToggleMainSideBar,
} from "../../store/features/globalStateSlice";
import {
  handelAddSideBar,
  handelToggleSideBar,
} from "../../store/features/SideBarStateSlice";
import { useGetBasesQuery } from "../../store/services/alphaTruckingApi";
import "../../stylesheet/sidebar.scss";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";

export default function Sidebar() {
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  const { sidebar } = useSelector((state) => state.sidebar);
  const { data, error, isFetching, isSuccess } = useGetBasesQuery();
  // const [menus, setMenus] = useState(bases || [])
  let createMenusByBase;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      // console.log(data)
      dispatch(handelAddBases(data));
      createMenusByBase =
        data?.map((item) => {
          return {
            title: item?.basemetadata?.name || "Undefined Table",
            // icons: "contacts",
            baseId: item?.baseid || "baseId",
            subMenu: item?.tablemetadata?.map((ele, i) => {
              return {
                title: ele?.table_name,
                to: ele?.base_id + "/" + ele?.table_id,
                tableId: ele?.table_id,
              };
            }),
          };
        }) || [];
      createMenusByBase.unshift(
        {
          title: "Dashboard",
          icons: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm0 60q-24.75 0-42.375-17.625T160 876V486q0-14.25 6.375-27T184 438l260-195q8.295-6 17.344-9 9.049-3 18.853-3 9.803 0 18.717 3 8.915 3 17.086 9l260 195q11.25 8.25 17.625 21T800 486v390q0 24.75-17.625 42.375T740 936H530V686H430v250H220Zm260-353Z" />
            </svg>
          ),
          to: "/",
        },
        {
          title: "Chat",
          icons: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M280 656h241q17 0 28-11.5t11-28.5q0-17-11.5-28.5T520 576H279q-17 0-28 11.5T240 616q0 17 11.5 28.5T280 656Zm0-120h401q17 0 28-11.5t11-28.5q0-17-11.5-28.5T680 456H279q-17 0-28 11.5T240 496q0 17 11.5 28.5T280 536Zm0-120h401q17 0 28-11.5t11-28.5q0-17-11.5-28.5T680 336H279q-17 0-28 11.5T240 376q0 17 11.5 28.5T280 416ZM80 879V256q0-33 23.5-56.5T160 176h640q33 0 56.5 23.5T880 256v480q0 33-23.5 56.5T800 816H240l-92 92q-19 19-43.5 8.5T80 879Zm80-96 47-47h593V256H160v527Zm0-527v527-527Z" />
            </svg>
          ),
          to: "/chats",
        },
        {
          title: "Group Chat",
          icons: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M80 728V216q0-17 11.5-28.5T120 176h520q17 0 28.5 11.5T680 216v360q0 17-11.5 28.5T640 616H240L114 742q-10 10-22 5t-12-19Zm80-472v280-280Zm120 560q-17 0-28.5-11.5T240 776v-80h520V336h80q17 0 28.5 11.5T880 376v552q0 14-12 19t-22-5L720 816H280Zm320-560H160v280h440V256Z" />
            </svg>
          ),
          to: "/group-chat",
        },
        {
          title: "Testing",
          icons: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M714 894 537 717l84-84 177 177q17 17 17 42t-17 42q-17 17-42 17t-42-17Zm-552 0q-17-17-17-42t17-42l234-234-68-68q-13 13-29 12t-27-12l-23-23v82l-7 7q-9 9-21 9t-21-9l-79-79q-9-9-9-21t9-21l7-7h82l-22-22q-12-12-12-28t12-28l114-114q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 22 22q11 11 12 27t-12 29l68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701 215q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841 355q0 59-40.5 99.5T701 495q-12 0-24-2t-23-7L246 894q-17 17-42 17t-42-17Z" />
            </svg>
          ),
          to: "/testing",
        }
      );
      dispatch(handelAddSideBar(createMenusByBase));
    }
  }, [isSuccess]);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  if (isFetching) {
    return (
      <div
        className={`sidebar_container scrollbar-hidden select-none relative ${toggle ? "closed" : "opened"
          } `}
      >
        <Loading />;
      </div>
    );
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div
      className={`sidebar_container select-none relative ${toggle ? "closed" : "opened"
        } `}
    >
      <div
        className="navLink menu"
        onClick={() => dispatch(handleToggleMainSideBar())}
      >
        <h2 className="title">Alpha Lion</h2>
        <span className="material-symbols-rounded">menu</span>
      </div>
      <div className="image">
        <div className="border-[.75px] p-2 border-black">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/alphadatabase-6609c.appspot.com/o/logo.webp?alt=media&token=18906e2b-0a8b-466e-9915-bead42dedbaf"
            alt="logo"
          />
        </div>
      </div>
      <ul className="">
        {Array.isArray(sidebar) &&
          sidebar.map((item, i) => {
            return (
              item?.title && (
                <li className="menu_item" key={i}>
                  <NavLink
                    to={item?.to && item.to}
                    className={({ isActive }) =>
                      isActive
                        ? item?.subMenu
                          ? "navLink"
                          : "navLink active"
                        : "navLink"
                    }
                    onClick={() => {
                      if (item.subMenu) dispatch(handelToggleSideBar(item));
                      // toggleMenu(setMenus, item);
                    }}
                  >
                    <div
                      className="flex justify-between truncate"
                      title={item.title}
                    >
                      <span className="material-symbols-rounded">
                        {item.icons}
                      </span>
                      <span className={`title truncate`}>
                        {item.title || "table"}
                      </span>
                    </div>
                    {item.subMenu && (
                      <svg
                        className={` arrow ${item.isOpened && "rotate_arrow"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 96 960 960"
                        width="24"
                      >
                        <path d="M468 708q-19 19-43.5 8.5T400 679V473q0-27 24.5-37.5T468 444l104 104q6 6 9 13t3 15q0 8-3 15t-9 13L468 708Z" />
                      </svg>
                    )}
                  </NavLink>
                  {item.isOpened && (
                    <ul>
                      {item.subMenu.map((menu, index) => {
                        return (
                          menu?.title && (
                            <div
                              key={menu.to}
                              className={`${menu?.subMenu && menu.isOpened
                                  ? "bg-[#13142b] rounded-lg ml-8"
                                  : menu?.subMenu && "ml-8"
                                }`}
                            >
                              <li className="submenu_item max-w-[170px] relative">
                                <NavLink
                                  onContextMenu={handleContextMenu}
                                  to={menu.to}
                                  className={({ isActive }) =>
                                    isActive ? "navLink active" : "navLink"
                                  }
                                  title={menu.title}
                                  onClick={() =>
                                    dispatch(
                                      handelSelectedTableId({
                                        selectedTableId: menu?.tableId,
                                        selectedBaseId: item?.baseId,
                                      })
                                    )
                                  }
                                >
                                  <span className={`title truncate `}>
                                    {menu.title || "Title"}
                                  </span>
                                </NavLink>

                                {/* {isContextMenuOpen && (
                                  <></>
                                  // <div className="absolute bg-red-300 -right-3">
                                  //   Hello
                                  // </div>
                                  // <ContextMenu onClose={handleCloseContextMenu} x={contextMenuPosition.x} y={contextMenuPosition.y}>
                                  //   <MenuItem label="Open" onClick={() => console.log('Open clicked')} />
                                  // </ContextMenu>
                                )} */}
                              </li>
                            </div>
                          )
                        );
                      })}
                      <li
                        className="submenu_item max-w-[170px]"
                        onClick={() => {
                          dispatch(handleAddToggle(true));
                          dispatch(handleCreateTableBaseId(item?.baseId));
                        }}
                      >
                        <button className="navLink w-full">
                          <span className={`title truncate  flex`}>
                            <svg
                              className="mr-4"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 96 960 960"
                              width="24"
                            >
                              <path d="M480 856q-17 0-28.5-11.5T440 816V616H240q-17 0-28.5-11.5T200 576q0-17 11.5-28.5T240 536h200V336q0-17 11.5-28.5T480 296q17 0 28.5 11.5T520 336v200h200q17 0 28.5 11.5T760 576q0 17-11.5 28.5T720 616H520v200q0 17-11.5 28.5T480 856Z" />
                            </svg>
                            <div>Create Table</div>
                          </span>
                        </button>
                      </li>
                    </ul>
                  )}

                  {/* this is for displaying the menu list on hover in the closed drawer */}
                  {item.subMenu && toggle && (
                    <ul className="toggle_closed">
                      {item.subMenu.map((menu, index) => (
                        <li key={index} className="submenu_item">
                          <NavLink
                            to={menu.to}
                            className={({ isActive }) =>
                              isActive ? "navLink active" : "navLink"
                            }
                          >
                            <span className={`title truncate `}>
                              {menu.title}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
}

function ContextMenu({ children, onClose, x, y }) {
  const [menuWidth, setMenuWidth] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuTop, setMenuTop] = useState(0);

  const handleRef = (node) => {
    if (node !== null) {
      setMenuWidth(node.offsetWidth);
      setMenuHeight(node.offsetHeight);
      setMenuLeft(Math.min(x, window.innerWidth - node.offsetWidth));
      setMenuTop(Math.min(y, window.innerHeight - node.offsetHeight));
    }
  };

  return (
    <>
      <div className="fixed inset-0" onClick={onClose} />
      <div
        ref={handleRef}
        className="fixed bg-white p-2 rounded shadow"
        style={{ left: menuLeft, top: menuTop }}
      >
        {children}
      </div>
    </>
  );
}

function MenuItem({ label, onClick }) {
  return (
    <div
      className="px-2 py-1 cursor-pointer hover:bg-gray-200"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
