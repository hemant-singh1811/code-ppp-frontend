import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleToggleMainSideBar } from "../../store/features/globalStateSlice";
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
    // { title: "Scheduler ", icons: "edit_calendar", to: "/schedule" },
    // { title: "Master", icons: "contacts", to: "/master" },
  );

  const [menus, setMenus] = useState(createMenusByBase || []);

  return (
    <div
      className={`sidebar_container scrollbar-hidden select-none ${
        toggle ? "closed" : "opened"
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
        <div>
          <img src="logo.webp" alt="logo" />
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
                    className={`material-symbols-rounded arrow ${
                      menu.isOpened && "rotate_arrow"
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
                        className={`${
                          menu?.subMenu && menu.isOpened
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
                                className={`material-symbols-rounded arrow ${
                                  menu.isOpened && "rotate_arrow"
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
                            );
                          })}
                      </div>
                    );
                  })}
                </ul>
              )}

              {/* this is for displaying the menu list on hover in the closed drawer */}
              {menu.subMenu && toggle && (
                <ul className="toggle_closed">
                  {menu.subMenu.map((menu, index) => (
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

// const [menus, setMenus] = useState([
// {
//   title: "Dashboard",
//   icons: "home",
//   to: "/",
// },
// { title: "Chat", icons: "chat", to: "/chats" },
// { title: "Scheduler ", icons: "edit_calendar", to: "/schedule" },
// { title: "Master", icons: "contacts", to: "/master" },
// {
//   title: "Dispatch",
//   icons: "contacts",
//   to: "/dispatch",
//   subMenu: [
//     { title: "Drivers", to: "/dispatch/drivers" },
//     { title: "Trucks", to: "/dispatch/trucks" },
//     { title: "Trailers", to: "/dispatch/trailers" },
//     { title: "Master", to: "/dispatch/master" },
//   ],
// },
// {
//   title: "USPS",
//   icons: "contacts",
//   to: "/usps",
//   subMenu: [
//     { title: "schedule", to: "/usps/schedule" },
//     { title: "dispatch", to: "/usps/dispatch" },
//   ],
// },
// {
//   title: "sales",
//   icons: "contacts",
//   to: "/sales",
//   subMenu: [
//     { title: "brokers", to: "/sales/brokers" },
//     { title: "current shippers", to: "/sales/current-shippers" },
//     { title: "customers", to: "/sales/customers" },
//     { title: "sales template", to: "/sales/sales-template" },
//   ],
// },
// {
//   title: "Operation",
//   icons: "contacts",
//   to: "/operation",
//   subMenu: [
//     {
//       title: "Claims",
//       to: "/operation/claims",
//       subMenu: [
//         {
//           title: "insurance adjuster",
//           to: "/operation/insurance-adjuster",
//         },
//         { title: "insurance company", to: "/operation/insurance-company" },
//         { title: "insurance claims", to: "/operation/insurance-claims" },
//       ],
//     },
//     { title: "Examination/Tickets", to: "/operation/examination-tickets" },
//     { title: "Recruitment - DH Team", to: "/operation/driver-recruitment" },
//     {
//       title: "SMS Violation Summary - Shivani",
//       to: "/operation/sms-violation-summary",
//     },
//     {
//       title: "SMS Inspections - Shivani",
//       to: "/operation/sms-inspections",
//     },
//     { title: "Court Claims", to: "/operation/court-claims" },
//     { title: "Driver Hiring Form", to: "/operation/driver-hiring-form" },
//     { title: "Carriers", to: "/operation/carriers" },
//     { title: "Loss Runs", to: "/operation/loss-runs" },
//     { title: "assets", to: "/operation/assets" },
//     {
//       title: "recordable accidents",
//       to: "/operation/recordable-accidents",
//     },
//     {
//       title: "driver hiring instruction",
//       to: "/operation/driver-hiring-instruction",
//     },
//     { title: "social media", to: "/operation/social-media" },
//   ],
// },
// //here we are adding repairs.
// {
//   title: "Repairs",
//   icons: "tools_wrench",
//   to: "/repairs",
//   subMenu: [
//     {
//       title: "Preventative Maintenance",
//       to: "/repairs/preventative-maintenance",
//     },
//     {
//       title: "Work Queue - Kent Yard",
//       to: "/repairs/work-queue-kent-yard",
//     },
//     { title: "Inventory", to: "/repairs/inventory" },
//   ],
// },
// {
//   title: "Payroll",
//   icons: "tools_wrench",
//   to: "/payrolls",
//   subMenu: [
//     { title: "Drivers", to: "/payrolls/drivers-payroll" },
//     { title: "Employee", to: "/payrolls/company-payroll" },
//   ],
// },
// {
//   title: "audit",
//   icons: "tools_wrench",
//   to: "/audit",
//   subMenu: [
//     { title: "california", to: "/audit/california" },
//     { title: "FMSCA", to: "/audit/fmsca" },
//     { title: "oregon", to: "/audit/oregon" },
//     { title: "washington", to: "/audit/washington" },
//   ],
// },
// { title: "Trailers", icons: "calendar_month", to: "/trailers" },
// { title: "Trucks", icons: "local_shipping", to: "/trucks" },
// { title: "Drivers", icons: "airline_seat_recline_extra", to: "/drivers" },
// {
//   title: "Customers",
//   icons: "support_agent",
//   to: "/customers",
// },
// {
//   title: "Company",
//   icons: "pie_chart",
//   to: "/company",
// },
// {
//   title: "Brokers",
//   icons: "diversity_3",
//   to: "/brokers",
// },
// {
//   title: "IFTA",
//   icons: "diversity_3",
//   to: "/ifta",
// },
// {
//   title: "About",
//   icons: "info",
//   to: "/about",
// },
// ]);

// createMenusByBase.push(
//   {
//     title: "Dispatch",
//     icons: "contacts",
//     to: "/dispatch",
//     subMenu: [
//       { title: "Drivers", to: "/dispatch/drivers" },
//       { title: "Trucks", to: "/dispatch/trucks" },
//       { title: "Trailers", to: "/dispatch/trailers" },
//       { title: "Master", to: "/dispatch/master" },
//     ],
//   },
//   {
//     title: "USPS",
//     icons: "contacts",
//     to: "/usps",
//     subMenu: [
//       { title: "schedule", to: "/usps/schedule" },
//       { title: "dispatch", to: "/usps/dispatch" },
//     ],
//   },
//   {
//     title: "sales",
//     icons: "contacts",
//     to: "/sales",
//     subMenu: [
//       { title: "brokers", to: "/sales/brokers" },
//       { title: "current shippers", to: "/sales/current-shippers" },
//       { title: "customers", to: "/sales/customers" },
//       { title: "sales template", to: "/sales/sales-template" },
//     ],
//   },
//   {
//     title: "Operation",
//     icons: "contacts",
//     to: "/operation",
//     subMenu: [
//       {
//         title: "Claims",
//         to: "/operation/claims",
//         subMenu: [
//           {
//             title: "insurance adjuster",
//             to: "/operation/insurance-adjuster",
//           },
//           { title: "insurance company", to: "/operation/insurance-company" },
//           { title: "insurance claims", to: "/operation/insurance-claims" },
//         ],
//       },
//       { title: "Examination/Tickets", to: "/operation/examination-tickets" },
//       { title: "Recruitment - DH Team", to: "/operation/driver-recruitment" },
//       {
//         title: "SMS Violation Summary - Shivani",
//         to: "/operation/sms-violation-summary",
//       },
//       {
//         title: "SMS Inspections - Shivani",
//         to: "/operation/sms-inspections",
//       },
//       { title: "Court Claims", to: "/operation/court-claims" },
//       { title: "Driver Hiring Form", to: "/operation/driver-hiring-form" },
//       { title: "Carriers", to: "/operation/carriers" },
//       { title: "Loss Runs", to: "/operation/loss-runs" },
//       { title: "assets", to: "/operation/assets" },
//       {
//         title: "recordable accidents",
//         to: "/operation/recordable-accidents",
//       },
//       {
//         title: "driver hiring instruction",
//         to: "/operation/driver-hiring-instruction",
//       },
//       { title: "social media", to: "/operation/social-media" },
//     ],
//   },
//   //here we are adding repairs.
//   {
//     title: "Repairs",
//     icons: "tools_wrench",
//     to: "/repairs",
//     subMenu: [
//       {
//         title: "Preventative Maintenance",
//         to: "/repairs/preventative-maintenance",
//       },
//       {
//         title: "Work Queue - Kent Yard",
//         to: "/repairs/work-queue-kent-yard",
//       },
//       { title: "Inventory", to: "/repairs/inventory" },
//     ],
//   },
//   {
//     title: "Payroll",
//     icons: "tools_wrench",
//     to: "/payrolls",
//     subMenu: [
//       { title: "Drivers", to: "/payrolls/drivers-payroll" },
//       { title: "Employee", to: "/payrolls/company-payroll" },
//     ],
//   },
//   {
//     title: "audit",
//     icons: "tools_wrench",
//     to: "/audit",
//     subMenu: [
//       { title: "california", to: "/audit/california" },
//       { title: "FMSCA", to: "/audit/fmsca" },
//       { title: "oregon", to: "/audit/oregon" },
//       { title: "washington", to: "/audit/washington" },
//     ],
//   },
//   { title: "Trailers", icons: "calendar_month", to: "/trailers" },
//   { title: "Trucks", icons: "local_shipping", to: "/trucks" },
//   { title: "Drivers", icons: "airline_seat_recline_extra", to: "/drivers" },
//   {
//     title: "Customers",
//     icons: "support_agent",
//     to: "/customers",
//   },
//   {
//     title: "Company",
//     icons: "pie_chart",
//     to: "/company",
//   },
//   {
//     title: "Brokers",
//     icons: "diversity_3",
//     to: "/brokers",
//   },
//   {
//     title: "IFTA",
//     icons: "diversity_3",
//     to: "/ifta",
//   },
//   {
//     title: "About",
//     icons: "info",
//     to: "/about",
//   })
