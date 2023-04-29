import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handelRemoveFiles,
  handelToggleFilesModal,
} from '../../../store/features/fileViewerSlice';
import LoadingAlt from '../../utilities/LoadingAlt';
import LazyLoadingImage from './LazyLoadingImage';
import { useRenameTableFileMutation } from '../../../store/services/alphaTruckingApi';
const FileViewer = () => {
  const dispatch = useDispatch();
  const fileViewer = useSelector((state) => state.fileViewer);
  const socket = useSelector((state) => state.socketWebData.socket);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const [renameFileApi, responseRenameFile] = useRenameTableFileMutation();
  const [files, setFiles] = useState(fileViewer.files || []);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(fileViewer.index);
  const [editFileName, setEditFileName] = useState('');
  let [isOpen, setIsOpen] = useState(false);
  const [selectedFileIdForRename, setSelectedFileIdForRename] = useState('');

  const handleFileUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => {
      return {
        name: file?.name,
        type: file?.type.split('/')[0],
        data: URL.createObjectURL(file),
      };
    });
    setFiles(filesArray);
    setCurrentFileIndex(0);
  };

  const renderFile = (file) => {
    // console.log(file?.type.split('/')[0]);
    switch (file?.type.split('/')[0]) {
      case 'image':
        return (
          <LazyLoadingImage src={file?.url} />
          // <img
          //   className='h-full w-full object-contain'
          //   src={file?.url}
          //   alt={file?.name}
          // />
        );
      case 'video':
        return (
          <video className='w-full h-auto max-h-full' controls>
            <source
              src={file.url}
              type='video/mp4'
              // type={file?.type}
              className='w-full h-full object-contain'
            />
            Your browser does not support the video tag.
          </video>
        );
      case 'application':
        return (
          <object
            data={file.url}
            type={file.type}
            className='w-full h-full flex items-center justify-center'>
            <p>Unable to display file. Please download the file to view it.</p>
          </object>
        );
      case 'audio':
        return (
          <audio controls>
            <source src={file.url} type={file?.type} />
            Your browser does not support the audio tag.
          </audio>
        );
      // case 'html':
      //   return (
      //     <iframe
      //       src={file?.url}
      //       title={file?.name}
      //       width='100%'
      //       height='600px'></iframe>
      //   );
      // case 'doc':
      //   return (
      //     <object
      //       data={file?.url}
      //       type={file?.type}
      //       width='100%'
      //       height='600px'>
      //       <p>
      //         Unable to display document. Please download the file to view it.
      //       </p>
      //     </object>
      //   );
      // case 'csv':
      //   return (
      //     <object
      //       data={file?.url}
      //       type={file?.type}
      //       width='100%'
      //       height='600px'>
      //       <p>Unable to display CSV. Please download the file to view it.</p>
      //     </object>
      //   );
      // case 'psd':
      //   return (
      //     <object
      //       data={file?.url}
      //       type={file?.type}
      //       width='100%'
      //       height='600px'>
      //       <p>Unable to display PSD. Please download the file to view it.</p>
      //     </object>
      //   );
      // case 'text':
      //   return (
      //     <object data={file?.url} type={file?.type} width='100%' height='100%'>
      //       <p>Unable to display PSD. Please download the file to view it.</p>
      //     </object>
      //   );
      default:
        return (
          <object
            data={file?.url}
            type={file?.type}
            // width='100%'
            // height='600px'
            className='w-full h-full flex items-center justify-center'>
            <p>Unable to display file. Please download the file to view it.</p>
          </object>
        );
    }
  };

  const handlePreviousFile = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextFile = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDownloadFile = () => {
    // Create a download link for the file
    const link = document.createElement('a');
    link.href = files[currentFileIndex].url;
    link.download = files[currentFileIndex].name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteFile = (fileUploadHandleTemp) => {
    setIsDeleting(true);
    const cell = fileViewer.cell;
    let newRowPart = { [cell?.column.id]: [fileUploadHandleTemp] };
    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: cell?.row?.original.id52148213343234567,
      updated_data: newRowPart,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
      is_added: false,
    };

    socket.emit('updatedata', rowObj, (response) => {
      dispatch(handelRemoveFiles({ id: fileUploadHandleTemp.id }));

      // console.log(fileViewer.files);
      fileViewer.table(
        cell.row.index,
        cell.column.id,
        fileViewer.files.filter((ele) => ele.id !== fileUploadHandleTemp.id)
      );

      console.log('res : ', response);
      setIsDeleting(false);
      if (fileViewer.files.length <= 1) {
        closeModal();
      }
    });
  };

  const handleEditFile = (ele) => {
    setSelectedFileIdForRename(ele.id);
    setEditFileName(ele.name);
    openInnerModal();
  };

  const handleEditFileRename = () => {
    const cell = fileViewer.cell;
    renameFileApi({
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: cell.row.original.id52148213343234567,
      field_id: cell.column.columnDef.field_id,
      file_id: selectedFileIdForRename,
      field_name: cell.column.columnDef.field_name,
      updated_name: editFileName.trim(),
    });
  };

  function closeModal() {
    console.log('object');
    dispatch(handelToggleFilesModal());
    setFiles([]);
  }

  function closeInnerModal() {
    setIsOpen(false);
  }

  function openInnerModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setFiles(fileViewer.files);
    setCurrentFileIndex(fileViewer.index);
  }, [fileViewer]);

  useEffect(() => {
    if (responseRenameFile.isSuccess) {
      console.log('response Rename File', responseRenameFile.data);
      const cell = fileViewer.cell;
      fileViewer.table(
        cell.row.index,
        cell.column.id,
        files.map((ele) => {
          if (selectedFileIdForRename === ele.id) {
            const copyObj = { ...ele };
            copyObj.name = editFileName;
            return copyObj;
          }
          return ele;
        })
      );

      setFiles((prev) => {
        return prev.map((file) => {
          if (file.id === selectedFileIdForRename) {
            const copyObj = { ...file };
            copyObj.name = editFileName;
            return copyObj;
          }
          return file;
        });
      });

      closeInnerModal();
    }
  }, [responseRenameFile.isSuccess]);

  return (
    <>
      <Transition appear show={fileViewer.isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 backdrop-blur-md bg-[#0000004a]' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto '>
            <div className='flex min-h-full items-center justify-center  text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full h-full '>
                  <div className='flex flex-col h-screen w-full'>
                    <div className='flex justify-start items-center bg-gray-100 p-4'>
                      <div
                        onClick={() => closeModal()}
                        className='border-[1px] rounded-full border-black p-1 cursor-pointer'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </div>
                    </div>
                    {files?.length > 0 && (
                      <div className='flex flex-col h-full'>
                        <div className='relative h-full'>
                          <div className='absolute top-0 bottom-0 left-0 right-0 p-2 flex items-center justify-center'>
                            {renderFile(files[currentFileIndex])}
                          </div>
                        </div>
                        <div className='flex justify-between items-center bg-white py-2 px-4'>
                          <div>
                            <h2 className='text-lg font-bold text-left'>
                              {files[currentFileIndex]?.name}
                            </h2>
                            <p className='text-sm text-gray-500 text-left'>
                              {files[currentFileIndex]?.type}
                            </p>
                          </div>
                          <div className='flex gap-2'>
                            <button
                              disabled={isDeleting}
                              className='text-gray-600 hover:text-gray-900 border-black border-[1px] rounded-full p-2 hover:bg-red-100 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100'
                              onClick={() =>
                                handleDeleteFile(files[currentFileIndex])
                              }>
                              {isDeleting ? (
                                <LoadingAlt />
                              ) : (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='w-6 h-6'>
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                  />
                                </svg>
                              )}
                            </button>
                            <button
                              className='text-gray-600 hover:text-gray-900 border-black border-[1px] rounded-full p-2 hover:bg-red-100'
                              onClick={() =>
                                handleEditFile(files[currentFileIndex])
                              }>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                                />
                              </svg>
                            </button>
                            <button
                              className='text-gray-600 hover:text-gray-900 border-black border-[1px] rounded-full p-2 hover:bg-blue-100'
                              onClick={handleDownloadFile}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='flex justify-between bg-gray-100 py-4 px-8'>
                          <button
                            className={`rounded-full p-2 bg-white shadow-lg ${
                              currentFileIndex === 0
                                ? 'opacity-25 cursor-not-allowed'
                                : ''
                            }`}
                            onClick={handlePreviousFile}
                            disabled={currentFileIndex === 0}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-gray-600'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 19l-7-7 7-7'
                              />
                            </svg>
                          </button>
                          <div className='flex justify-center items-center'></div>
                          <button
                            className={`rounded-full p-2 bg-white shadow-lg ${
                              currentFileIndex === files.length - 1
                                ? 'opacity-25 cursor-not-allowed'
                                : ''
                            }`}
                            onClick={handleNextFile}
                            disabled={currentFileIndex === files.length - 1}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-gray-600'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 5l7 7-7 7'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeInnerModal}>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    Rename
                  </Dialog.Title>
                  <div className='mt-2'>
                    <input
                      type='text'
                      className=' border-2 border-blue-500'
                      value={editFileName}
                      onChange={(e) => {
                        setEditFileName(e.target.value);
                      }}
                    />
                    <div className='mt-4 flex justify-end'>
                      <button
                        type='button'
                        className='inline-flex ml-auto min-w-[80px] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1 h-[25px] items-center text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={() => handleEditFileRename()}>
                        {responseRenameFile.isLoading ? (
                          <LoadingAlt />
                        ) : (
                          'Rename'
                        )}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FileViewer;
