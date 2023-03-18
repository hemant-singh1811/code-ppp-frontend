import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleAddToggle, handleToggleMainSideBar } from "../../store/features/globalStateSlice";
import "../../stylesheet/sidebar.scss";

export default function Sidebar({ data }) {
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);

  const dispatch = useDispatch();
  let createMenusByBase = data.map((item) => {
    return {
      title: item?.basemetadata?.name,
      icons: "contacts",
      // to: item?.basemetadata?.name,
      subMenu: item?.tablemetadata?.map((ele, i) => {
        return {
          title: ele?.table_name,
          to: ele?.base_id + "/" + ele?.table_id,
        };
      }),
    };
  });

  createMenusByBase.unshift(
    {
      title: "Dashboard",
      icons: "home",
      to: "/",
    },
    { title: "Chat", icons: "chat", to: "/chats" }
  );

  const [menus, setMenus] = useState(createMenusByBase || []);


  return (
    <div
      className={`sidebar_container scrollbar-hidden select-none relative ${toggle ? "closed" : "opened"
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
          <img src="https://firebasestorage.googleapis.com/v0/b/alphadatabase-6609c.appspot.com/o/logo.webp?alt=media&token=18906e2b-0a8b-466e-9915-bead42dedbaf" alt="logo" />
        </div>
      </div>
      <ul className="">
        {menus.map((item, i) => {
          return (
            <li className="menu_item" key={i}>
              <NavLink
                to={item?.to && item.to}
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
                onClick={() => {
                  if (item.subMenu) toggleMenu(setMenus, item);
                }}
              >
                <div>
                  <span className="material-symbols-rounded">{item.icons}</span>
                  <span className={`title`}>{item.title}</span>
                </div>
                {item.subMenu && (
                  <span
                    className={`material-symbols-rounded arrow ${item.isOpened && "rotate_arrow"
                      }`}
                  >
                    arrow_right
                  </span>
                )}
              </NavLink>
              {item.isOpened && (
                <ul>
                  {item.subMenu.map((menu, index) => {
                    return (
                      <div
                        key={menu.to}
                        className={`${menu?.subMenu && menu.isOpened
                          ? "bg-[#13142b] rounded-lg ml-8"
                          : menu?.subMenu && "ml-8"
                          }`}
                      >
                        <li
                          className="submenu_item max-w-[170px]"
                        >
                          <NavLink
                            to={menu.to}
                            className={({ isActive }) =>
                              isActive ? "navLink active" : "navLink"
                            }
                          >
                            <span className={`title truncate capitalize `}>
                              {menu.title}
                            </span>
                          </NavLink>
                        </li>
                        {
                          item?.subMenu?.length === index + 1 && (
                            <li

                              className="submenu_item max-w-[170px]"
                              onClick={() => dispatch(handleAddToggle())}
                            >
                              <NavLink
                                className={"navLink"}

                              >
                                <span className={`title truncate capitalize flex`}>
                                  <span className="material-symbols-rounded mr-4">
                                    add
                                  </span>
                                  <div>
                                    Create Table
                                  </div>
                                </span>
                              </NavLink>
                            </li>
                          )
                        }

                      </div>
                    );
                  })}
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
                        <span className={`title truncate capitalize`}>
                          {menu.title}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

    </div>
  );
}

function toggleMenu(setMenus, menu, depth) {
  setMenus((prev) => {
    return prev.map((prevMenu) => {
      if (menu.to === prevMenu.to) {
        prevMenu.isOpened = !prevMenu.isOpened;
      }
      if (depth === 1 && prevMenu.subMenu) {
        prevMenu.subMenu.map((item) => {
          if (menu.to === item.to) {
            item.isOpened = !item.isOpened;
          }
        });
      }
      return prevMenu;
    });
  });
}


{/* <div
  className={`sidebar_container scrollbar-hidden select-none ${toggle ? "closed" : "opened"
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
      <img src="https://firebasestorage.googleapis.com/v0/b/alphadatabase-6609c.appspot.com/o/logo.webp?alt=media&token=18906e2b-0a8b-466e-9915-bead42dedbaf" alt="logo" />
    </div>
  </div>
  <ul className="">
    {menus.map((menu, i) => {
      return (
        <li className="menu_item" key={i}>
          <NavLink
            to={menu?.to && menu.to}
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            onClick={() => {
              if (menu.subMenu) toggleMenu(setMenus, menu);
            }}
          >
            <div>
              <span className="material-symbols-rounded">{menu.icons}</span>
              <span className={`title`}>{menu.title}</span>
            </div>
            {menu.subMenu && (
              <span
                className={`material-symbols-rounded arrow ${menu.isOpened && "rotate_arrow"
                  }`}
              >
                arrow_right
              </span>
            )}
          </NavLink>
          {menu.isOpened && (
            <ul>
              {menu.subMenu.map((menu, index) => {
                return (
                  <div
                    key={menu.to}
                    className={`${menu?.subMenu && menu.isOpened
                      ? "bg-[#13142b] rounded-lg ml-8"
                      : menu?.subMenu && "ml-8"
                      }`}
                  >
                    {menu?.subMenu ? (
                      <NavLink
                        to={menu?.to && menu.to}
                        className={({ isActive }) =>
                          isActive ? "navLink mt-3 " : "navLink mt-3"
                        }
                        onClick={() => {
                          if (menu.subMenu) toggleMenu(setMenus, menu, 1);
                        }}
                      >
                        <div>
                          <span className="material-symbols-rounded">
                            {menu.icons}
                          </span>
                          <span className={`title`}>{menu.title}</span>
                        </div>
                        {menu.subMenu && (
                          <span
                            className={`material-symbols-rounded arrow ${menu.isOpened && "rotate_arrow"
                              }`}
                          >
                            arrow_right
                          </span>
                        )}
                      </NavLink>
                    ) : (
                      <li
                        key={index}
                        className="submenu_item max-w-[170px]"
                      >
                        <NavLink
                          to={menu.to}
                          className={({ isActive }) =>
                            isActive ? "navLink active" : "navLink"
                          }
                        >
                          <span className={`title truncate capitalize `}>
                            {menu.title}
                          </span>
                        </NavLink>
                      </li>
                    )}
                    {menu.isOpened &&
                      menu.subMenu.map((subMenu) => {
                        return (
                          <>
                            <li
                              key={subMenu.to}
                              className="submenu_item max-w-[170px]"
                              style={{ marginLeft: 0 }}
                            >
                              <NavLink
                                to={subMenu.to}
                                className={({ isActive }) =>
                                  isActive ? "navLink active" : "navLink"
                                }
                              >
                                <span
                                  className={`title truncate capitalize `}
                                >
                                  {subMenu.title}
                                </span>
                              </NavLink>
                            </li>
                          </>

                        );
                      })}
                  </div>
                );
              })}
            </ul>
          )}

          {/* this is for displaying the menu list on hover in the closed drawer */}
// {
//   menu.subMenu && toggle && (
//     <ul className="toggle_closed">
//       {menu.subMenu.map((menu, index) => (
//         <li key={index} className="submenu_item">
//           <NavLink
//             to={menu.to}
//             className={({ isActive }) =>
//               isActive ? "navLink active" : "navLink"
//             }
//           >
//             <span className={`title truncate capitalize`}>
//               {menu.title}
//             </span>
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   )
// }
//         </li >
//       );
//     })}
//   </ul >
// </div >