import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { handelAddBases } from '../../store/features/BasesStateSlice';
import {
  handelSelectedTableAndBaseId,
  handleAddToggle,
  handleToggleMainSideBar,
} from '../../store/features/globalStateSlice';
import {
  handelAddSideBar,
  handelRemoveSideBarField,
  handelToggleSideBar,
} from '../../store/features/SideBarStateSlice';
import {
  useDeleteTableMutation,
  useGetBasesQuery,
} from '../../store/services/alphaTruckingApi';
import '../../stylesheet/sidebar.scss';
import Error from '../utilities/Error';
import Loading from '../utilities/Loading';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Sidebar() {
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  const { sidebar } = useSelector((state) => state.sidebar);
  const { data, error, isFetching, isSuccess } = useGetBasesQuery();
  const [deleteTableApi, responseDeleteTable] = useDeleteTableMutation();

  let createMenusByBase;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(handelAddBases(data));
      createMenusByBase =
        data?.map((item) => {
          return {
            title: item?.basemetadata?.name || 'Undefined Table',
            icons: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 96 960 960'
                width='24'>
                <path d='M160 896V256h640v640H160Zm40-433.846h560V296H200v166.154Zm199.923 196.923h160.154V502.154H399.923v156.923Zm0 196.923h160.154V699.077H399.923V856ZM200 659.077h159.923V502.154H200v156.923Zm400.077 0H760V502.154H600.077v156.923ZM200 856h159.923V699.077H200V856Zm400.077 0H760V699.077H600.077V856Z' />
              </svg>
            ),
            baseId: item?.baseid || 'baseId',
            subMenu: item?.tablemetadata?.map((ele, i) => {
              return {
                title: ele?.table_name,
                to: ele?.base_id + '/' + ele?.table_id,
                tableId: ele?.table_id,
                baseId: item?.baseid || 'baseId',
              };
            }),
          };
        }) || [];
      createMenusByBase.unshift(
        {
          title: 'Dashboard',
          icons: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 96 960 960'
              fontWeight={200}
              width='24'>
              <path d='M220 876h150V626h220v250h150V486L480 291 220 486v390Zm0 60q-24.75 0-42.375-17.625T160 876V486q0-14.25 6.375-27T184 438l260-195q8.295-6 17.344-9 9.049-3 18.853-3 9.803 0 18.717 3 8.915 3 17.086 9l260 195q11.25 8.25 17.625 21T800 486v390q0 24.75-17.625 42.375T740 936H530V686H430v250H220Zm260-353Z' />
            </svg>
          ),
          to: '/',
        },
        {
          title: 'Chat',
          icons: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 96 960 960'
              width='24'>
              <path d='M280 656h241q17 0 28-11.5t11-28.5q0-17-11.5-28.5T520 576H279q-17 0-28 11.5T240 616q0 17 11.5 28.5T280 656Zm0-120h401q17 0 28-11.5t11-28.5q0-17-11.5-28.5T680 456H279q-17 0-28 11.5T240 496q0 17 11.5 28.5T280 536Zm0-120h401q17 0 28-11.5t11-28.5q0-17-11.5-28.5T680 336H279q-17 0-28 11.5T240 376q0 17 11.5 28.5T280 416ZM80 879V256q0-33 23.5-56.5T160 176h640q33 0 56.5 23.5T880 256v480q0 33-23.5 56.5T800 816H240l-92 92q-19 19-43.5 8.5T80 879Zm80-96 47-47h593V256H160v527Zm0-527v527-527Z' />
            </svg>
          ),
          to: '/chats',
        },
        {
          title: 'Group Chat',
          icons: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 96 960 960'
              width='24'>
              <path d='M80 728V216q0-17 11.5-28.5T120 176h520q17 0 28.5 11.5T680 216v360q0 17-11.5 28.5T640 616H240L114 742q-10 10-22 5t-12-19Zm80-472v280-280Zm120 560q-17 0-28.5-11.5T240 776v-80h520V336h80q17 0 28.5 11.5T880 376v552q0 14-12 19t-22-5L720 816H280Zm320-560H160v280h440V256Z' />
            </svg>
          ),
          to: '/group-chat',
        },
        {
          title: 'Testing',
          icons: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 96 960 960'
              width='24'>
              <path d='M714 894 537 717l84-84 177 177q17 17 17 42t-17 42q-17 17-42 17t-42-17Zm-552 0q-17-17-17-42t17-42l234-234-68-68q-13 13-29 12t-27-12l-23-23v82l-7 7q-9 9-21 9t-21-9l-79-79q-9-9-9-21t9-21l7-7h82l-22-22q-12-12-12-28t12-28l114-114q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 22 22q11 11 12 27t-12 29l68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701 215q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841 355q0 59-40.5 99.5T701 495q-12 0-24-2t-23-7L246 894q-17 17-42 17t-42-17Z' />
            </svg>
          ),
          to: '/testing',
        }
      );
      dispatch(handelAddSideBar(createMenusByBase));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (responseDeleteTable.data) {
    }
  }, [responseDeleteTable.isSuccess]);

  if (isFetching) {
    return (
      <div
        className={`sidebar_container scrollbar-hidden select-none relative ${
          toggle ? 'closed' : 'opened'
        } `}>
        <Loading />;
      </div>
    );
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div
      className={`sidebar_container select-none scrollbar-hidden relative ${
        toggle ? 'closed' : 'opened'
      } `}>
      <div
        className='navLink menu'
        onClick={() => dispatch(handleToggleMainSideBar())}>
        <h2 className='title'>Alpha Lion</h2>
        <span className='material-symbols-rounded'>menu</span>
      </div>
      <div className='image'>
        <div className='border-[.75px] p-2 border-black'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/alphadatabase-6609c.appspot.com/o/logo.webp?alt=media&token=18906e2b-0a8b-466e-9915-bead42dedbaf'
            alt='logo'
          />
        </div>
      </div>
      <ul className=''>
        {Array.isArray(sidebar) &&
          sidebar.map((item, i) => {
            return (
              item?.title && (
                <li className='menu_item' key={i}>
                  <NavLink
                    to={item?.to && item.to}
                    className={({ isActive }) =>
                      isActive
                        ? item?.subMenu
                          ? 'navLink'
                          : 'navLink active bg-blue-500'
                        : 'navLink'
                    }
                    onClick={() => {
                      if (item.subMenu) dispatch(handelToggleSideBar(item));
                    }}>
                    <div
                      className='flex justify-between truncate'
                      // title={item.title}
                    >
                      <span className='material-symbols-rounded'>
                        {item.icons}
                      </span>
                      <span className={`title truncate`}>
                        {item.title || 'table'}
                      </span>
                    </div>
                    {item.subMenu && (
                      <svg
                        className={` arrow ${item.isOpened && 'rotate_arrow'}`}
                        xmlns='http://www.w3.org/2000/svg'
                        height='24'
                        viewBox='0 96 960 960'
                        width='24'>
                        <path d='M468 708q-19 19-43.5 8.5T400 679V473q0-27 24.5-37.5T468 444l104 104q6 6 9 13t3 15q0 8-3 15t-9 13L468 708Z' />
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
                              className={`${
                                menu?.subMenu && menu.isOpened
                                  ? 'bg-[#13142b] rounded-lg ml-8'
                                  : menu?.subMenu && 'ml-8'
                              }`}>
                              <Popover className='relative mr-2'>
                                {({ open, close }) => (
                                  <>
                                    <li className='submenu_item max-w-[170px] relative'>
                                      <NavLink
                                        to={menu.to}
                                        className={({ isActive }) =>
                                          isActive
                                            ? 'navLink active bg-blue-200'
                                            : 'navLink'
                                        }
                                        title={menu.title}
                                        onClick={() =>
                                          dispatch(
                                            handelSelectedTableAndBaseId({
                                              selectedTableId: menu?.tableId,
                                              selectedBaseId: item?.baseId,
                                            })
                                          )
                                        }>
                                        <span className={`title truncate `}>
                                          {menu.title || 'Title'}
                                        </span>

                                        <Popover.Button className='border-none outline-none'>
                                          <div className='text-gray-400 mr-1 cursor-pointer hover:text-blue-800'>
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              height='20'
                                              viewBox='0 96 960 960'
                                              width='20'>
                                              <path d='M480 670.923q-5.692 0-12.038-2.615-6.347-2.616-12.577-8.846l-171.77-171.77q-7.384-7.384-6.769-16.538.615-9.154 7-15.539 8.385-8.384 16.154-7.884t15.154 7.884L480 621.461l165.077-165.076q7.384-7.385 15.038-7.77 7.654-.384 16.039 8 7.385 7.385 7.385 15.654 0 8.27-7.385 15.654L504.615 659.462q-6.23 6.23-12.192 8.846-5.961 2.615-12.423 2.615Z' />
                                            </svg>
                                          </div>
                                        </Popover.Button>
                                        <Menu
                                          deleteTableApi={deleteTableApi}
                                          tableId={menu.tableId}
                                          baseId={menu.baseId}
                                          close={close}
                                          dispatch={dispatch}
                                        />
                                      </NavLink>
                                    </li>
                                  </>
                                )}
                              </Popover>
                            </div>
                          )
                        );
                      })}
                      <li
                        className='submenu_item max-w-[170px]'
                        onClick={() => {
                          dispatch(
                            handleAddToggle({ isOpen: true, type: 'table' })
                          );
                          dispatch(
                            handelSelectedTableAndBaseId({
                              selectedBaseId: item?.baseId,
                            })
                          );
                        }}>
                        <button className='navLink w-full'>
                          <span className={`title truncate  flex`}>
                            <svg
                              className='mr-4'
                              xmlns='http://www.w3.org/2000/svg'
                              height='24'
                              viewBox='0 96 960 960'
                              width='24'>
                              <path d='M480 856q-17 0-28.5-11.5T440 816V616H240q-17 0-28.5-11.5T200 576q0-17 11.5-28.5T240 536h200V336q0-17 11.5-28.5T480 296q17 0 28.5 11.5T520 336v200h200q17 0 28.5 11.5T760 576q0 17-11.5 28.5T720 616H520v200q0 17-11.5 28.5T480 856Z' />
                            </svg>
                            <div>Create Table</div>
                          </span>
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )
            );
          })}
        <li
          className={'navLink  '}
          onClick={() =>
            dispatch(handleAddToggle({ isOpen: true, type: 'base' }))
          }>
          <div className='flex justify-between truncate'>
            <svg
              className=''
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 96 960 960'
              width='24'>
              <path d='M480 856q-17 0-28.5-11.5T440 816V616H240q-17 0-28.5-11.5T200 576q0-17 11.5-28.5T240 536h200V336q0-17 11.5-28.5T480 296q17 0 28.5 11.5T520 336v200h200q17 0 28.5 11.5T760 576q0 17-11.5 28.5T720 616H520v200q0 17-11.5 28.5T480 856Z' />
            </svg>
            <span className={`title truncate text-black`}>Create Base</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

function Menu({ deleteTableApi, baseId, tableId, close, dispatch }) {
  const navigate = useNavigate();
  return (
    <Transition
      className='bg-white'
      as={Fragment}
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'>
      <Popover.Panel
        onClick={(e) => {
          // e.preventDefault();
        }}
        className='text-black absolute top-[35px] z-20 w-full rounded-md left-[0px] p-2 border-gray-400 border-[.5px] shadow-md flex flex-col bg-white'>
        <div className=' hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 w-full '>
          <span className='material-symbols-rounded text-lg font-light mr-4'>
            edit
          </span>
          Rename Table
        </div>
        <div
          className='hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 w-full'
          onClick={(e) => {
            // e.stopPropagation();
            deleteTableApi({ data: { table_id: tableId }, baseId: baseId });
            dispatch(
              handelRemoveSideBarField({ baseId: baseId, tableId: tableId })
            );
            // close()
          }}>
          <span className='material-symbols-rounded text-lg font-light mr-4'>
            delete
          </span>
          Delete Table
        </div>
      </Popover.Panel>
    </Transition>
  );
}
