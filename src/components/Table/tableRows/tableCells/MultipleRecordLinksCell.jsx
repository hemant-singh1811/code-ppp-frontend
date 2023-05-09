import React, { useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TableContext } from '../../tableComponents/TableComponents';
import {
  useGetModelDataMutation,
  useGetTableDataPartMutation,
} from '../../../../store/services/alphaTruckingApi';
import Loading from '../../../utilities/Loading';
import { useSelector } from 'react-redux';

let fetchedTableId = undefined;
let linkedRecord = undefined;
let fetchedTableColumnsTemp = [];

export default function MultipleRecordLinksCell({ cell, rowData }) {
  const { columns, setColumns } = useContext(TableContext);

  columns.forEach((element) => {
    if (element.field_name === cell?.column?.id) {
      fetchedTableId = element?.linked_rec?.tableid;
      linkedRecord = element?.linked_rec;
    }
  });

  // console.log(rowData);
  // [linked_rec?.selected_field_name]

  const socket = useSelector((state) => state.socketWebData.socket);

  const [getTableDataApi, responseGetTableData] =
    useGetTableDataPartMutation(fetchedTableId);
  const [getModelDataApi, responseGetModelData] =
    useGetModelDataMutation(fetchedTableId);
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [primaryData, setPrimaryData] = useState('');
  const [fetchedTableColumns, setFetchedTableColumns] = useState([]);
  const [selectedRowData, setSelectedRowData] = React.useState(
    Array.isArray(rowData) ? rowData : [rowData] || []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [rowsDataMap, setRowsDataMap] = useState(new Map());

  // console.log(selectedRowData);

  let rowCopy = cell?.row?.original;

  const handleFocus = () => {
    setIsChildVisible(true);
  };

  const handleBlur = () => {
    setIsChildVisible(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function addSelectedRow(ele) {
    console.log(ele);

    setSelectedRowData([
      ...selectedRowData,
      { data: ele.data, recordId: ele.id },
    ]);

    // let selectedRowRecordId = selectedRowData.map((ele) => {

    //   return ele.recordId;
    // });
    // rowData = [ele];

    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: ele.id };
    // let newRowPart = { [updatedRowKey]: [...selectedRowRecordId, ele.id] };
    // let oldRowPart = { [updatedRowKey]: selectedRowData };

    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
      linked_rec: linkedRecord,
      is_added: true,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
    };
    console.log(rowObj);
    // rowCopy[cell?.column.id] = rowData;

    // console.log(rowObj)
    socket.emit('updatedata', rowObj, (response) => {
      console.log('res : ', response);
    });
  }

  function removeSelectedRow(ele) {
    console.log(ele);

    let updatedSelectedRowData = selectedRowData?.filter((id) => id !== ele);

    setSelectedRowData((prev) => prev.filter((id) => id !== ele));

    let updatedRowKey = cell?.column.id;

    let selectedRowRecordId = updatedSelectedRowData.map(
      ({ recordId }) => recordId
    );

    let newRowPart = { [updatedRowKey]: ele?.recordId };
    // let newRowPart = { [updatedRowKey]: selectedRowRecordId };
    // let oldRowPart = { [updatedRowKey]: selectedRowData };

    let rowObj = {
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      // linked_table_id: fetchedTableId,
      updated_data: newRowPart,
      // old_data: oldRowPart,
      linked_rec: linkedRecord,
      is_added: false,
    };
    console.log(rowObj);

    // // console.log(rowObj)
    socket.emit('updatedata', rowObj, (response) => {
      console.log('res : ', response);
    });
  }

  useEffect(() => {
    if (responseGetTableData.data && responseGetModelData.data) {
      console.log(
        'Multiple Linked Records -- Table data | Modal Data',
        responseGetTableData.data,
        responseGetModelData.data
      );
      responseGetModelData?.data.forEach(({ data }) => {
        if (data?.is_primary) {
          setPrimaryData(data.field_name);
        } else {
          fetchedTableColumnsTemp.push(data.field_name);
        }
      });

      const newMap = new Map(rowsDataMap);

      responseGetTableData?.data?.map((ele) => {
        newMap.set(ele.id, ele.data);
      });

      setRowsDataMap(newMap);

      setFetchedTableColumns(fetchedTableColumnsTemp);
      setIsDataFetched(true);
    }
  }, [responseGetTableData.isSuccess, responseGetModelData.isSuccess]);

  return (
    <div className='h-full overflow-hidden select-none'>
      <div
        className='flex h-full w-full items-center  px-1 gap-1'
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        tabIndex='1'>
        {/* //add new record */}
        {isChildVisible && (
          <div
            // type="button"
            onClick={() => {
              openModal();
              getTableDataApi(fetchedTableId);
              getModelDataApi(fetchedTableId);
            }}
            className='cursor-pointer  rounded-md bg-black bg-opacity-10  text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className=' fill-gray-700'
              height='24'
              viewBox='0 96 960 960'
              width='24'>
              <path d='M479.973 836q-8.512 0-14.242-5.75Q460 824.5 460 816V596H240q-8.5 0-14.25-5.758T220 575.973q0-8.512 5.75-14.242Q231.5 556 240 556h220V336q0-8.5 5.758-14.25 5.757-5.75 14.269-5.75t14.242 5.75Q500 327.5 500 336v220h220q8.5 0 14.25 5.758t5.75 14.269q0 8.512-5.75 14.242Q728.5 596 720 596H500v220q0 8.5-5.758 14.25-5.757 5.75-14.269 5.75Z' />
            </svg>
          </div>
        )}
        {selectedRowData?.map((ele, i) => {
          return (
            ele && (
              <div
                key={i}
                className='flex bg-purple-100 rounded-md items-center cursor-pointer px-1'>
                <div className='h-full w-max'>
                  {ele?.data?.hasOwnProperty(
                    cell.column.columnDef.linked_rec.selected_field_name
                  ) &&
                    ele.data[
                      cell.column.columnDef.linked_rec.selected_field_name
                    ]}
                </div>
                {isChildVisible && (
                  <svg
                    onClick={() => removeSelectedRow(ele)}
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 96 960 960'
                    width='20'>
                    <path d='M480 604.308 270.154 814.154q-5.615 5.615-13.769 6-8.154.385-14.539-6T235.461 800q0-7.769 6.385-14.154L451.692 576 241.846 366.154q-5.615-5.615-6-13.769-.385-8.154 6-14.539T256 331.461q7.769 0 14.154 6.385L480 547.692l209.846-209.846q5.615-5.615 13.769-6 8.154-.385 14.539 6T724.539 352q0 7.769-6.385 14.154L508.308 576l209.846 209.846q5.615 5.615 6 13.769.385 8.154-6 14.539T704 820.539q-7.769 0-14.154-6.385L480 604.308Z' />
                  </svg>
                )}
              </div>
            )
          );
        })}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-10' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-[600px] h-[600px]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='absolute left-0 top-0 bottom-0 my-auto font-thin fill-gray-400'
                      height='24'
                      viewBox='0 96 960 960'
                      width='24'>
                      <path d='M756 908 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l225 225q11 11 11 27t-12 28q-11 11-28 11t-28-11ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z' />
                    </svg>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type='text'
                      className='p-4 pl-7 border-b-2 border-b-gray-300  focus:border-transparent focus:border-b-blue-500 focus:outline-none'
                      name=''
                      id=''
                      autoFocus
                      placeholder='Find an existing record'
                    />
                    <svg
                      onClick={closeModal}
                      xmlns='http://www.w3.org/2000/svg'
                      className='cursor-pointer hover:fill-blue-500 absolute right-0 top-0 bottom-0 my-auto font-thin fill-gray-400'
                      height='24'
                      viewBox='0 96 960 960'
                      width='24'>
                      <path d='M480 632 284 828q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536 576l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480 632Z' />
                    </svg>
                  </div>
                  <div className='h-[500px] overflow-y-auto'>
                    {isDataFetched ? (
                      responseGetTableData?.data
                        ?.filter((element) => {
                          let isRecordIdContains = true;
                          selectedRowData.forEach((ele) => {
                            if (ele?.recordId === element?.id) {
                              isRecordIdContains = false;
                            }
                          });
                          return isRecordIdContains;
                        })
                        .filter(({ data }) => {
                          return data[primaryData]
                            .toLowerCase()
                            .trim()
                            .includes(searchTerm.toLowerCase().trim());
                        })
                        .map((ele, i) => {
                          return (
                            <div
                              onClick={() => {
                                closeModal();
                                addSelectedRow(ele);
                              }}
                              tabIndex={-1}
                              className='h-[80px] hover:border-gray-400 border-gray-300 border-2 focus:border-blue-500 my-2 rounded-lg text-xl px-2 p-1'
                              key={ele.id}>
                              <div className='font-medium truncate'>
                                {ele.data[primaryData] || 'empty field'}
                              </div>
                              <div></div>
                            </div>
                          );
                        })
                    ) : (
                      <Loading />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
