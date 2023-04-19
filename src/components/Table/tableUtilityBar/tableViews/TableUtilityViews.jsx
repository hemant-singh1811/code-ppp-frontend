import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useDetectOutsideClick } from '../../../../utilities/customHooks/useDetectOutsideClick';
import { TableContext } from '../../tableComponents/TableComponents';
import { useForm } from 'react-hook-form';
import UniqueCharacterGenerator from '../../../../utilities/UniqueCharacterGenerator';
import {
  useCreateViewMutation,
  useDeleteViewMutation,
} from '../../../../store/services/alphaTruckingApi';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../utilities/Loading';
import Error from '../../../utilities/Error';
import { handleUpdateViews } from '../../../../store/features/viewsSlice';

export default function TableUtilityViews() {
  const { viewsToggle, setViewsToggle } = useContext(TableContext);
  return (
    <div className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative '>
      <div
        className='flex items-center font-medium'
        onClick={() => {
          setViewsToggle(!viewsToggle);
        }}>
        <span className='material-symbols-rounded pr-1 text-lg'>menu</span>
        Views
      </div>
    </div>
  );
}

export const ViewsComponent = ({ data, error, isFetching, isSuccess }) => {
  function reducer(state, { type, targetState, viewTitle, id, updatedState }) {
    switch (type) {
      case 'setInitialState':
        return (state = updatedState);
      case 'toggleView':
        return state.map((prev) => {
          if (targetState === prev.title) {
            prev.collapsed = !prev.collapsed;
          }
          return prev;
        });
      case 'addView':
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
      case 'removeView':
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
  // console.log(data)
  const [createToggle, setCreateToggle] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      viewsDispatch({
        updatedState: [
          {
            title: 'Personal Views',
            collapsed: true,
            data: data?.personalview?.map((ele, i) => {
              return {
                title: ele?.metadata?.name,
                data: ele?.model,
                id: ele?.metadata?.views_id,
              };
            }),
          },
          {
            title: 'Shared View',
            collapsed: true,
            data: data?.sharedview?.map((ele) => {
              return {
                title: ele?.metadata?.name,
                data: ele?.model,
                id: ele?.metadata?.views_id,
              };
            }),
          },
        ],
        type: 'setInitialState',
      });
    }
  }, [isSuccess]);
  const [views, viewsDispatch] = useReducer(reducer, []);
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  // const initialState = [
  // 	{
  // 		title: 'Personal Views', collapsed: true, data: [
  // 			{ title: "other Forms", data: [], id: 3 },
  // 			{ title: "other Forms", data: [], id: 34 },
  // 			{ title: "other Forms", data: [], id: 32134 },
  // 		]
  // 	},
  // 	{
  // 		title: 'Shared View', collapsed: true, data: [
  // 			{ title: "Sleeper", data: [], id: 1 },
  // 			{ title: "Sleeper", data: [], id: 1234 },
  // 			{ title: "Sleeper", data: [], id: 134 },
  // 		]
  // 	},
  // ]

  return (
    <div className='text-black bg-white h-full  border-[#c8c8c8] border-r-[1px] p-2 flex flex-col justify-between select-none transition-all'>
      <div>
        <div className='flex items-center relative mb-4'>
          <span className='material-symbols-rounded absolute text-[20px] ml-4 text-[rgb(68, 68, 68)]  font-extralight '>
            search
          </span>
          <input
            type='text'
            className=' focus:outline-none focus:border-blue-500 border-[#e8e8e8] mx-2 border-b transition-colors w-full p-2 px-4 pl-10 placeholder:text-[rgb(68, 68, 68)]'
            placeholder='Find a view'
          />
        </div>
        <div>
          {views.map(({ title, collapsed, data }, index) => {
            return (
              data.length > 0 && (
                <div key={title}>
                  <div
                    className='flex justify-between items-center p-2 rounded cursor-pointer hover:bg-slate-100'
                    onClick={() => {
                      viewsDispatch({ type: 'toggleView', targetState: title });
                    }}>
                    <div className='font-medium text-lg'>{title}</div>
                    <div className='flex items-center gap-1'>
                      {/* <span className="material-symbols-rounded font-extralight  cursor-pointer rounded hover:bg-slate-300">add</span> */}
                      <span className='material-symbols-rounded font-extralight'>
                        {collapsed ? 'expand_more' : 'expand_less'}
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
                    <div className='h-[1px] w-full bg-[#e8e8e8] px-2 my-2 ' />
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className='border-t-[1px] border-[#e8e8e8] pt-2 mx-2 '>
        <div
          className='flex justify-between p-2 cursor-pointer'
          onClick={() => setCreateToggle(!createToggle)}>
          <div className='text-xl  font-medium'>Create...</div>
          <span className='material-symbols-rounded font-extralight'>
            {createToggle ? 'expand_more' : 'expand_less'}
          </span>
        </div>
        {createToggle && (
          <div className='p-2'>
            {[...new Array(1)].map((item, i) => {
              return (
                <div
                  key={i}
                  className='flex justify-between items-center p-2 rounded-md  cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <span className='material-symbols-rounded font-extralight'>
                      table_view
                    </span>
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
        type: 'removeView',
        targetState: viewName,
        id: id,
        viewTitle: title,
      });
    }
  }, [responseDeleteView.isSuccess]);

  return (
    <div
      onClick={() => {
        dispatch(
          handleUpdateViews({
            name: title,
            id: id,
            model: model,
          })
        );
      }}
      ref={viewsMenu}
      className={`flex items-center justify-between p-2 rounded cursor-pointer my-1 hover:bg-slate-100 relative ${
        selectedView.id === id && 'bg-blue-300 hover:bg-blue-400'
      }`}>
      <div className='font-medium ml-7 text-base truncate'>{title}</div>
      <span
        className='material-symbols-rounded font-extralight text-base mx-1'
        onClick={() => setIsMenuToggle(!isMenuToggle)}>
        expand_circle_down
      </span>
      {isMenuToggle && (
        <div className='absolute w-72 top-0 -right-[250px] bg-white p-2  z-50 shadow-lg border-gray-200 rounded border '>
          {/* <div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100'>
						<span className="material-symbols-rounded font-extralight">edit</span>
						<div className='font-medium text-base truncate ml-2'>Rename</div>
					</div>
					<div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100' onClick={() => { setIsMenuToggle(!isMenuToggle); viewsDispatch({ type: 'copyView', targetState: viewName, id: id, viewTitle: title }) }}>
						<span className="material-symbols-rounded font-extralight">content_copy</span>
						<div className='font-medium text-base truncate ml-2'>Duplicate View</div>
					</div> */}
          <div
            className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100'
            onClick={() => {
              setIsMenuToggle(!isMenuToggle);
              deleteViewApi({ tableId: selectedTableId, viewId: id });
            }}>
            {/* {console.log(id)} */}
            <span className='material-symbols-rounded font-extralight'>
              delete
            </span>
            <div className='font-medium text-base truncate ml-2'>
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
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // addView: `View ${views[0]?.data?.length + 1}`,
    },
  });

  useEffect(() => {
    if (responseCreateView?.data) {
      console.log(responseCreateView?.data);
      viewsDispatch({
        type: 'addView',
        targetState: 'Personal Views',
        viewTitle: getValues('addView').trim(),
        id: responseCreateView?.data?.viewid,
      });
      setValue('addView', '');
      setIsMenuToggle(!isMenuToggle);
    }
  }, [responseCreateView.isSuccess]);

  const submitForm = (data) => {
    // views[0]?.data.map(({ title }) => {
    //   if (title === data.addView) {
    //     setError("addView", {
    //       type: "manual",
    //       message: "unique name required",
    //     });
    //   }
    // });
    if (!errors.addView) {
      createViewApi({
        name: data?.addView.trim(),
        table_id: selectedTableId,
        model: table.options.state,
      });
    }
  };
  return (
    <div ref={viewsMenu} className='relative flex items-center '>
      <span
        className='material-symbols-rounded font-extralight hover:bg-[#f4f4f4]'
        onClick={() => setIsMenuToggle(!isMenuToggle)}>
        add
      </span>
      {isMenuToggle && (
        <div className='absolute w-96 -bottom-4 left-16 bg-white p-4 z-50 shadow-lg border-gray-200 rounded border '>
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              {...register('addView', { required: true })}
              type='text'
              className='w-full mb-1 border border-black rounded p-2 py-1'
              placeholder='Enter View Name'
            />
            <div className='h-5'>
              {errors?.addView?.type === 'required' && (
                <label className='text-sm text-red-500'>
                  Try entering a non-empty view name.
                </label>
              )}
              {/* {errors?.addView?.message === "unique name required" && (
                <label className="text-sm text-red-500">
                  Try entering a different view name.
                </label>
              )} */}
            </div>
            <div className='flex justify-end gap-2 mt-8'>
              <button
                className='rounded hover:bg-gray-200 p-1 px-3 text-lg'
                onClick={() => setIsMenuToggle(!isMenuToggle)}>
                Cancel
              </button>
              <button
                className='rounded bg-blue-600 p-1 px-3 text-white text-lg disabled:bg-blue-300'
                disabled={errors.addView ? true : false}
                type={'submit'}>
                Create New View
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
