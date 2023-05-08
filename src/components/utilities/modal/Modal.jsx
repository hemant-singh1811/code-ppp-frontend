import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handelCloseModal,
  handelOpenModal,
} from '../../../store/features/globalStateSlice';
import {
  handelRemoveSideBarField,
  handelRemoveSideBarMenu,
} from '../../../store/features/SideBarStateSlice';
import {
  useDeleteBaseMutation,
  useDeleteTableMutation,
} from '../../../store/services/alphaTruckingApi';
import LoadingAlt from '../LoadingAlt';
import { handelRemoveBases } from '../../../store/features/BasesStateSlice';
import { useNavigate } from 'react-router-dom';

export default function Modal() {
  const { isOpen, content } = useSelector((state) => state.globalState.modal);
  const [deleteTableApi, responseDeleteTable] = useDeleteTableMutation();
  const [deleteBaseApi, responseDeleteBase] = useDeleteBaseMutation();
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(handelCloseModal(''));
  }

  function openModal() {
    dispatch(handelOpenModal(''));
  }

  useEffect(() => {
    if (responseDeleteTable.data) {
      console.log('Delete table:', responseDeleteTable.data);
      if (selectedTableId === responseDeleteTable.data.table_id) {
        navigate('/');
      }

      dispatch(
        handelRemoveSideBarField({
          baseId: content.baseId,
          tableId: content.tableId,
        })
      );
      dispatch(handelCloseModal(''));
    }
  }, [responseDeleteTable.isSuccess]);
  useEffect(() => {
    if (responseDeleteBase.data) {
      console.log('Delete Base:', responseDeleteBase.data);
      if (selectedBaseId === responseDeleteBase?.data?.baseid) {
        navigate('/');
      }
      // dispatch(
      //   handelRemoveSideBarMenu({
      //     baseId: content.baseId,
      //   })
      // );
      // dispatch(
      //   handelRemoveBases({
      //     baseId: content.baseId,
      //   })
      // );
      // dispatch(handelCloseModal(''));
    }
  }, [responseDeleteBase.isSuccess]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel>
                <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                  <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div
                        className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}>
                        {content.icon ? (
                          content.icon
                        ) : (
                          <svg
                            className={`h-6 w-6 text-red-600`}
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='currentColor'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'></path>
                          </svg>
                        )}
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <h3
                          className='text-lg leading-6 font-medium text-gray-900'
                          id='modal-title'>
                          {content.heading} ({content.name})
                        </h3>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-500'>
                            {content.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      onClick={() => {
                        switch (content.target) {
                          case 'table':
                            deleteTableApi({
                              data: { table_id: content.tableId },
                              baseId: content.baseId,
                            });

                            break;
                          case 'base':
                            deleteBaseApi({
                              data: { baseid: content.baseId },
                            });
                            break;

                          default:
                            break;
                        }
                      }}
                      type='button'
                      className={`min-w-[100px] capitalize inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}>
                      {responseDeleteTable.isLoading ||
                      responseDeleteBase.isLoading ? (
                        <div>
                          <LoadingAlt />
                        </div>
                      ) : (
                        <span>Delete {content.target}</span>
                      )}
                    </button>
                    <button
                      onClick={closeModal}
                      type='button'
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
