import React, { useContext, useReducer, useState } from 'react'
import { useDetectOutsideClick } from '../../../../utilities/customHooks/useDetectOutsideClick';
import { TableContext } from '../../tableComponents/TableComponents';
import { useForm } from 'react-hook-form';
import UniqueCharacterGenerator from '../../../../utilities/UniqueCharacterGenerator';
import { useCreateNewViewMutation } from '../../../../store/services/alphaTruckingApi';

export default function TableUtilityViews() {
	const { viewsToggle, setViewsToggle } = useContext(TableContext);

	return (
		<div
			className='flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative '
		>
			<div
				className='flex items-center font-medium'
				onClick={() => {
					setViewsToggle(!viewsToggle);
				}}
			>
				<span className='material-symbols-rounded pr-1 text-lg'>menu</span>
				Views
			</div>
		</div>
	);
}

export const ViewsComponent = () => {
	const initialState = {
		myView: {
			title: 'My Views', collapsed: false, data: [
				{
					title: "My Favorites", collapsed: false, data: [
						{ title: "Forms", data: [] },
						{ title: "Forms another", data: [] },
					]
				},
				{
					title: 'My Personal Views', collapsed: false, data: [
						{ title: "other Forms", data: [] },
						{ title: "Driver dsaD Sds Ds sD  dsAD", data: [] },
					]
				},
			]
		},
		allViews: {
			title: 'All Views', collapsed: true, data: [
				{
					title: 'Others Views', collapsed: true, data: [
						{ title: "Sleeper", data: [], id: 1 },
					]
				},
				{
					title: 'Personal Views', collapsed: true, data: [
						{ title: "other Forms", data: [], id: 3 },
					]
				},
			],
		},
	}
	function reducer(state, { type, targetState, title, viewTitle, id }) {
		switch (type) {
			case 'toggleView':
				return {
					...state, [targetState]: {
						collapsed: !state?.[targetState]?.collapsed, title: state?.[targetState]?.title, data: state?.[targetState]?.data
					}
				};
			case 'toggleViewChild':
				return {
					...state, [targetState]: {
						collapsed: state?.[targetState]?.collapsed, title: state?.[targetState]?.title, data: state?.[targetState]?.data.map((item) => {
							if (item.title === title) {
								item.collapsed = !item.collapsed;
							}
							return item
						})
					}
				};
			case 'addView':
				return {
					...state, [targetState]: {
						collapsed: state?.[targetState]?.collapsed, title: state?.[targetState]?.title, data: state?.[targetState]?.data.map((item) => {
							if (item.title === title) {
								item.data.push({ title: viewTitle, data: [], id: UniqueCharacterGenerator(8) })
							}
							return item
						})
					}
				};
			case 'removeView':
				return {
					...state, [targetState]: {
						collapsed: state?.[targetState]?.collapsed, title: state?.[targetState]?.title, data: state?.[targetState]?.data.map((element) => {
							element.data = element.data?.filter((item) => {
								return item.id !== id
							})
							return element
						})
					}
				};
			case 'copyView':
				return {
					...state, [targetState]: {
						collapsed: state?.[targetState]?.collapsed, title: state?.[targetState]?.title, data: state?.[targetState]?.data.map((element) => {
							let data = element?.data?.map((item) => {
								if (item.id === id) {
									item.title = item.title + 'copy'
									item.id = UniqueCharacterGenerator(8)
								}
								return item
							})
							// element.data += data;
							return element
						})
					}
				};
			default:
				throw new Error();
		}
	}
	const [views, viewsDispatch] = useReducer(reducer, initialState);
	const [createToggle, setCreateToggle] = useState(true)
	return (
		<div className='text-black bg-white h-full  border-[#c8c8c8] border-r-[1px] p-2 flex flex-col justify-between select-none transition-all'>
			<div>
				<div className="flex items-center relative mb-4">
					<span className="material-symbols-rounded absolute text-[20px] ml-4 text-[rgb(68, 68, 68)]  font-extralight ">
						search
					</span>
					<input type="text" className=" focus:outline-none focus:border-blue-500 border-[#e8e8e8] mx-2 border-b transition-colors w-full p-2 px-4 pl-10 placeholder:text-[rgb(68, 68, 68)]" placeholder="Find a view" />
				</div>
				<div>
					{
						Object.keys(views).map((viewName, index) => {
							return (
								<div key={viewName}>
									<div className='flex justify-between items-center p-2 rounded cursor-pointer hover:bg-slate-100' onClick={() => viewsDispatch({ type: 'toggleView', targetState: viewName })}>
										<div className='font-medium text-lg'>{views?.[viewName].title}</div>
										<div className='flex items-center gap-1'>
											{/* <span className="material-symbols-rounded font-extralight  cursor-pointer rounded hover:bg-slate-300">add</span> */}
											<span className="material-symbols-rounded font-extralight">{views?.[viewName].collapsed ? "expand_more" : 'expand_less'}</span>
										</div>
									</div>
									{
										views?.[viewName]?.collapsed && (
											views?.[viewName]?.data?.map((item, i) => {
												return (
													<div key={i}>
														<div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100' onClick={() => viewsDispatch({ type: 'toggleViewChild', targetState: viewName, title: item.title })}>
															<span className="material-symbols-rounded font-extralight">{item.collapsed ? 'expand_more' : "chevron_right"}</span>
															<div className='font-medium text-base truncate'>{item.title}</div>
														</div>
														{item.collapsed && item.data?.map((ele, i) => {
															return (
																<div key={i} className='flex items-center justify-between p-2 rounded cursor-pointer hover:bg-slate-100' >
																	<div className='font-medium ml-7 text-base truncate'>{ele.title}</div>
																	<TableViewsPopUpMenuToolkit viewsDispatch={viewsDispatch} title={ele.title} viewName={viewName} id={ele.id} />
																</div>
															)
														}
														)}

													</div>
												)
											}
											)
										)
									}
									{index < Object.keys(views).length - 1 && <div className='h-[1px] w-full bg-[#e8e8e8] px-2 my-2 ' />}
								</div>
							)
						})
					}
				</div>
			</div>

			<div className='border-t-[1px] border-[#e8e8e8] pt-2 mx-2 '>
				<div className="flex justify-between p-2 cursor-pointer" onClick={() => setCreateToggle(!createToggle)}>
					<div className="text-xl  font-medium">
						Create...
					</div>
					<span className="material-symbols-rounded font-extralight">
						{
							createToggle ? "expand_more" : "expand_less"
						}
					</span>
				</div>
				{
					createToggle && (
						<div className='p-2'>
							{
								[...new Array(1)].map((item, i) => {
									return (
										<div key={i} className='flex justify-between items-center p-2 rounded-md  cursor-pointer'>
											<div className='flex items-center gap-2'>
												<span className="material-symbols-rounded font-extralight">
													table_view
												</span>
												<div>
													Grid
												</div>
											</div>
											<TableViewsAddToolkit viewsDispatch={viewsDispatch} views={views} />
										</div>
									)
								})
							}
						</div>
					)
				}
			</div>
		</div >
	);
};

function TableViewsPopUpMenuToolkit({ viewsDispatch, title, viewName, id }) {
	// Create a ref that we add to the element for which we want to detect outside clicks
	const viewsMenu = React.useRef();
	// Call hook passing in the ref and a function to call on outside click
	const [isMenuToggle, setIsMenuToggle] = React.useState(false);

	useDetectOutsideClick(viewsMenu, () => setIsMenuToggle(false));
	return (
		<div ref={viewsMenu} className='relative'>
			<span className="material-symbols-rounded font-extralight text-base mx-1" onClick={() => setIsMenuToggle(!isMenuToggle)}>expand_circle_down</span>
			{isMenuToggle && (
				<div className="absolute w-72 top-6 -right- bg-white p-2  z-50 shadow-lg border-gray-200 rounded border ">
					<div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100'>
						<span className="material-symbols-rounded font-extralight">edit</span>
						<div className='font-medium text-base truncate ml-2'>Rename</div>
					</div>
					<div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100' onClick={() => { setIsMenuToggle(!isMenuToggle); viewsDispatch({ type: 'copyView', targetState: viewName, id: id, viewTitle: title }) }}>
						<span className="material-symbols-rounded font-extralight">content_copy</span>
						<div className='font-medium text-base truncate ml-2'>Duplicate View</div>
					</div>
					<div className='flex items-center p-2 rounded cursor-pointer hover:bg-slate-100' onClick={() => { setIsMenuToggle(!isMenuToggle); viewsDispatch({ type: 'removeView', targetState: viewName, id: id, viewTitle: title }) }}>
						<span className="material-symbols-rounded font-extralight">delete</span>
						<div className='font-medium text-base truncate ml-2'>Delete View</div>
					</div>
				</div>
			)}
		</div>
	);
}

function TableViewsAddToolkit({ viewsDispatch, views }) {
	const [createNewViewApi, responseCreateView] = useCreateNewViewMutation();

	// Create a ref that we add to the element for which we want to detect outside clicks
	const viewsMenu = React.useRef();
	// Call hook passing in the ref and a function to call on outside click
	const [isMenuToggle, setIsMenuToggle] = React.useState(false);
	useDetectOutsideClick(viewsMenu, () => setIsMenuToggle(false));
	const {
		register, handleSubmit, watch, getValues, setValue, setError, clearErrors, formState: { errors }
	} = useForm({
		defaultValues: {
			addView: `View ${views?.allViews?.data[1]?.data.length - 1}`,
		}
	});


	// watch: UseFormWatch < TFieldValues >;
	// getValues: UseFormGetValues < TFieldValues >;
	// getFieldState: UseFormGetFieldState < TFieldValues >;
	// setError: UseFormSetError < TFieldValues >;
	// clearErrors: UseFormClearErrors < TFieldValues >;
	// setValue: UseFormSetValue < TFieldValues >;
	// trigger: UseFormTrigger < TFieldValues >;
	// formState: FormState < TFieldValues >;
	// resetField: UseFormResetField < TFieldValues >;
	// reset: UseFormReset < TFieldValues >;
	// handleSubmit: UseFormHandleSubmit < TFieldValues >;
	// unregister: UseFormUnregister < TFieldValues >;
	// control: Control < TFieldValues, TContext >;
	// register: UseFormRegister < TFieldValues >;
	// setFocus: UseFormSetFocus < TFieldValues >;

	const submitForm = (data) => {
		views.allViews.data[1].data.map(({ title }) => {
			if (title === data.addView) {
				setError("addView", { type: "manual", message: "unique name required" });
			}
		})
		if (!errors.addView) {
			// createNewViewApi({name:data.addView, })
			viewsDispatch({ type: 'addView', targetState: 'allViews', title: 'Personal Views', viewTitle: data.addView })
			setIsMenuToggle(!isMenuToggle)
			setValue('addView', `View ${views.allViews.data[1].data.length}`)
		}
	}
	return (
		<div ref={viewsMenu} className='relative flex items-center'>
			<span className="material-symbols-rounded font-extralight hover:bg-[#f4f4f4]" onClick={() => setIsMenuToggle(!isMenuToggle)}>add</span>
			{isMenuToggle && (
				<div className="absolute w-96 -bottom-4 left-16 bg-white p-4 z-50 shadow-lg border-gray-200 rounded border ">
					<form onSubmit={handleSubmit(submitForm)}>
						<input {...register('addView', { required: true })} type="text" className='w-full mb-1 border border-black rounded p-2 py-1' placeholder='Enter View Name' />
						<div className='h-5'>
							{errors?.addView?.type === 'required' && <label className='text-sm text-red-500'>Try entering a non-empty view name.</label>}
							{errors?.addView?.message === 'unique name required' && <label className='text-sm text-red-500'>Try entering a different view name.</label>}
						</div>
						<div className='flex justify-end gap-2 mt-8'>
							<button className='rounded hover:bg-gray-200 p-1 px-3 text-lg' onClick={() => setIsMenuToggle(!isMenuToggle)}>Cancel</button>
							<button className='rounded bg-blue-600 p-1 px-3 text-white text-lg disabled:bg-blue-300' disabled={errors.addView ? true : false} type={'submit'} >Create New View</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
