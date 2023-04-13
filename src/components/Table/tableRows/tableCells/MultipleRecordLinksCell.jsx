import React, { useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { TableContext } from '../../tableComponents/TableComponents';
import { useGetModelDataMutation, useGetTableDataPartMutation } from '../../../../store/services/alphaTruckingApi';
import Loading from '../../../utilities/Loading';


export default function MultipleRecordLinksCell({ cell }) {
    const { columns, setColumns } = useContext(TableContext);
    let [isOpen, setIsOpen] = useState(false)
    let selectedTableId = undefined;
    columns.forEach(element => {
        if (element.field_name === cell?.column?.id) {
            selectedTableId = element.linked_rec.tableid
        }
    });
    // let primaryData = "";
    let columnArrayTemp = [];

    const [getTableDataApi, responseGetTableData] = useGetTableDataPartMutation(selectedTableId);
    const [getModelDataApi, responseGetModelData] = useGetModelDataMutation(selectedTableId);
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [primaryData, setPrimaryData] = useState('')
    const [columnArray, setColumnArray] = useState([])

    useEffect(() => {
        if (responseGetTableData.data && responseGetModelData.data) {
            console.log(responseGetModelData.data)
            responseGetModelData?.data.forEach(({ data }) => {
                if (data?.is_primary) {
                    // primaryData = data.field_name;
                    setPrimaryData(data.field_name)
                    // console.log(data.field_name)
                } else {
                    columnArrayTemp.push(data.field_name);
                }
            })
            setColumnArray(columnArrayTemp)
            setIsDataFetched(true);
            // console.log("response from server", responseGetModelData.data, responseGetTableData.data);
        }
    }, [responseGetTableData.isSuccess, responseGetModelData.isSuccess]);


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className=" inset-0 flex p-0.5 px-1">
                <button
                    type="button"
                    onClick={() => {
                        openModal();
                        getTableDataApi(selectedTableId);
                        getModelDataApi(selectedTableId)
                    }}
                    className="rounded-md bg-black bg-opacity-10  text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className=' fill-gray-700' height="24" viewBox="0 96 960 960" width="24"><path d="M479.973 836q-8.512 0-14.242-5.75Q460 824.5 460 816V596H240q-8.5 0-14.25-5.758T220 575.973q0-8.512 5.75-14.242Q231.5 556 240 556h220V336q0-8.5 5.758-14.25 5.757-5.75 14.269-5.75t14.242 5.75Q500 327.5 500 336v220h220q8.5 0 14.25 5.758t5.75 14.269q0 8.512-5.75 14.242Q728.5 596 720 596H500v220q0 8.5-5.758 14.25-5.757 5.75-14.269 5.75Z" /></svg>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-10" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-[600px] h-[600px]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex relative'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-0 top-0 bottom-0 my-auto font-thin fill-gray-400' height="24" viewBox="0 96 960 960" width="24"><path d="M756 908 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l225 225q11 11 11 27t-12 28q-11 11-28 11t-28-11ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z" /></svg>
                                        <input type="text" className='p-4 pl-7 border-b-2 border-b-gray-300  focus:border-transparent focus:border-b-blue-500 focus:outline-none' name="" id="" autoFocus placeholder='Find an existing record' />
                                        <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className='cursor-pointer hover:fill-blue-500 absolute right-0 top-0 bottom-0 my-auto font-thin fill-gray-400' height="24" viewBox="0 96 960 960" width="24"><path d="M480 632 284 828q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536 576l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480 632Z" /></svg>
                                    </div>
                                    <div className="h-[500px]">
                                        {
                                            isDataFetched ? (
                                                responseGetTableData?.data?.map((ele, i) => {
                                                    // console.log(primaryData, columnArray)

                                                    // console.log(responseGetModelData.isSuccess, responseGetTableData.isSuccess)
                                                    // console.log("response from server", responseGetModelData.data, responseGetTableData.data);
                                                    return <div tabIndex={-1} className='h-[80px] hover:border-gray-400 border-gray-300 border-2 focus:border-blue-500 my-2 rounded-lg text-xl px-2 p-1' key={ele.id}>
                                                        <div className='font-medium truncate'>{ele.data[primaryData]}</div>
                                                    </div>
                                                })
                                            ) : <Loading />
                                        }
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}