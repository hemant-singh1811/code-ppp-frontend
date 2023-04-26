import React, { useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './filesUploader.css';
import shortid from 'https://cdn.skypack.dev/shortid@2.2.16';
import './loaderAlt.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  handelAddFiles,
  handelUpdateFiles,
} from '../../../../store/features/fileViewerSlice';
import { TableContext } from '../../tableComponents/TableComponents';
import LoadingAlt from '../../../utilities/LoadingAlt';
// import { useStorage } from 'react-firebase-hooks/storage';
// import { useDatabase } from 'react-firebase-hooks/database';

export default function MultipleAttachmentsTableCell({ rowData, cell }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChildVisible, setIsChildVisible] = useState(false);

  const dispatch = useDispatch();

  // let images;
  // let thumbnails;
  // if (Array.isArray(rowData)) {
  //   thumbnails = rowData?.map(({ thumbnails }) => thumbnails?.small);
  //   images = rowData?.map(({ url }) => url);
  // }

  // console.log(rowData);

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

  // console.log(rowData);

  const renderFile = (file, i) => {
    // console.log(file, i);
    switch (file?.type.split('/')[0]) {
      case 'image':
        return (
          <img
            onClick={() => {
              dispatch(
                handelAddFiles({ files: rowData, index: i, cell: cell })
              );
            }}
            key={i}
            className='h-full w-auto object-contain border  rounded-sm  cursor-pointer'
            src={file?.url}
            alt={file?.name}
          />
        );
      case 'video':
        return (
          <div
            onClick={() => {
              dispatch(
                handelAddFiles({ files: rowData, index: i, cell: cell })
              );
            }}
            key={i}
            className=' border h-full rounded-sm flex justify-center items-center cursor-pointer'>
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
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            </svg>
          </div>
        );
      case 'audio':
        return (
          <div
            onClick={() => {
              dispatch(
                handelAddFiles({ files: rowData, index: i, cell: cell })
              );
            }}
            key={i}
            className=' border h-full rounded-sm flex justify-center items-center cursor-pointer'>
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
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            </svg>
          </div>
        );
      default:
        return (
          <div
            onClick={() => {
              dispatch(
                handelAddFiles({ files: rowData, index: i, cell: cell })
              );
            }}
            key={i}
            className=' border h-full rounded-sm flex justify-center items-center cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 m-auto'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
          </div>

          // <object
          //   data={file?.url}
          //   type={file?.type + '/'}
          //   // width='100%'
          //   // height='600px'
          //   className='w-full h-full flex items-center justify-center'>
          //   <p>Unable to display file. Please download the file to view it.</p>
          // </object>
        );
    }
  };
  return (
    <div className='h-full overflow-hidden select-none'>
      <div
        className='flex h-full w-full items-center  px-1 gap-3 '
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        tabIndex='1'>
        {/* //add new record */}
        {isChildVisible && (
          <div
            onClick={() => {
              openModal();
            }}
            className='cursor-pointer rounded-md bg-black bg-opacity-10  text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
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

        {Array.isArray(rowData) && rowData.map((ele, i) => renderFile(ele, i))}

        {/* {Array.isArray(images) &&
          thumbnails.map((image, index) => (
            <img
              onClick={() => {
                dispatch(handelAddFiles(rowData));
              }}
              src={image?.url}
              className={`border h-full rounded-sm  cursor-pointer object-fill `}
              key={index}
              alt='i'
            />
          ))} */}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => <></>}>
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
                <Dialog.Panel className=' '>
                  <FileUploadHandler closeModal={closeModal} cell={cell} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function FileUploadHandler({ closeModal, cell }) {
  const { table } = useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  const [selectedFile, SetSelectedFile] = useState([]);
  const [Files, SetFiles] = useState([]);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();

  const [submitButton, setSubmitButton] = useState(false);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  let fileUploadHandleTemp = [];

  const InputChange = (e) => {
    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: shortid.generate(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              datetime:
                e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
              filesize: filesizes(e.target.files[i].size),
              uploading: false,
              progress: 0,
              file: file,
              isUploaded: false,
              uploadedUrl: null,
            },
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  const DeleteSelectFile = (id) => {
    const result = selectedFile.filter((data) => data.id !== id);
    SetSelectedFile(result);
  };

  const promises = [];

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedFile);
    setSubmitButton(true);

    // form reset on submit
    e.target.reset();

    if (selectedFile.length > 0) {
      try {
        const storage = getStorage();
        let totalSize = 0;

        selectedFile.map((file, i) => {
          totalSize += file.size;
          let tempFile = file.file;

          const storageRef = ref(storage, file.file.name);
          const uploadTask = uploadBytesResumable(storageRef, tempFile);

          promises.push({ uploadTask: uploadTask, file: file });

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(0);
              SetSelectedFile((prev) => {
                return prev.map((prevFiles) => {
                  if (file.id === prevFiles.id) {
                    prevFiles.progress = progress;
                    prevFiles.uploading = true;
                    if (progress === 100) {
                      prevFiles.uploading = false;
                      prevFiles.isUploaded = true;
                    }
                  }
                  return prevFiles;
                });
              });
            },
            (error) => {
              console.error(error);
            }
          );
        });

        await Promise.all(promises.map((ele) => ele.uploadTask));
        for (let i = 0; i < promises.length; i++) {
          let promise = promises[i];
          const downloadURL = await getDownloadURL(
            promise.uploadTask.snapshot.ref
          );
          AddUrlToSendServer(downloadURL, promise);
        }
        // console.log(fileUploadHandleTemp);
        let newRowPart = { [cell?.column.id]: fileUploadHandleTemp };
        let rowObj = {
          base_id: selectedBaseId,
          table_id: selectedTableId,
          record_id: cell?.row?.original.id52148213343234567,
          updated_data: newRowPart,
          field_type: cell.column.columnDef.field_type,
          field_name: cell.column.columnDef.field_name,
          field_id: cell.column.columnDef.field_id,
          is_added: true,
        };

        socket.emit('updatedata', rowObj, (response) => {
          // console.log([...response.resdata.sample, ...cell.getValue()]);
          console.log('res : ', response);
          dispatch(handelUpdateFiles(response?.resdata));
          // table.options.meta?.updateData(cell.row.index, cell.column.id, [
          //   ...response.resdata,
          //   ...cell.getValue(),
          // ]);
          closeModal();
          setSubmitButton(false);
          SetSelectedFile([]);
          SetFiles([]);
        });

        // console.log(fileUploadHandleTemp);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please select file');
    }
  };

  const AddUrlToSendServer = (downloadURL, promise) => {
    // console.log(downloadURL);
    fileUploadHandleTemp.push({
      name: promise.file.file.name,
      size: promise.file.file.size,
      type: promise.file.file.type,
      thumbnails: {
        small: {
          width: 25,
          height: 36,
          url: downloadURL,
        },
        large: {
          width: 512,
          height: 725,
          url: downloadURL,
        },
        full: {
          width: 3000,
          height: 3000,
          url: downloadURL,
        },
      },
      url: downloadURL,
      width: 3000,
      height: 4676,
    });
  };

  const CancelUploadAll = async () => {
    SetFiles([]);
    closeModal();
    promises.map((ele) => {
      ele.cancel();
    });
  };

  return (
    <div className='fileupload-view w-[800px]'>
      <div className='row justify-content-center m-0'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='kb-data-box'>
                <div className='kb-modal-data-title'>
                  <div className='kb-data-title'>
                    <h6>Multiple File Upload With Preview</h6>
                  </div>
                </div>
                <form onSubmit={FileUploadSubmit}>
                  <div className='kb-file-upload'>
                    <div className='file-upload-box'>
                      <input
                        disabled={submitButton}
                        type='file'
                        id='fileupload'
                        className='file-upload-input disabled:cursor-not-allowed'
                        onChange={InputChange}
                        multiple
                      />
                      <span>
                        {/* Drag and drop or{' '} */}
                        <span className='file-link'>Choose your files</span>
                      </span>
                    </div>
                  </div>
                  <div className='kb-attach-box mb-3 max-h-[500px] overflow-auto'>
                    {selectedFile.map((data, index) => {
                      const {
                        id,
                        filename,
                        filetype,
                        fileimage,
                        datetime,
                        filesize,
                        uploading,
                        progress,
                      } = data;
                      return (
                        <div className='file-atc-box' key={id}>
                          {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                            <div className='file-image'>
                              <img src={fileimage} alt='' />
                            </div>
                          ) : (
                            <div className='file-image'>
                              <i className='far fa-file-alt'></i>
                            </div>
                          )}
                          <div className='file-detail '>
                            {/* <div> */}
                            <h6>{filename}</h6>
                            <p></p>
                            <p>
                              <span>Size : {filesize}</span>
                              <span className='ml-2'>
                                Modified Time : {datetime}
                              </span>
                            </p>
                            <div className='file-actions'>
                              {uploading ? (
                                <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                                  <div
                                    className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                                    style={{ width: progress + '%' }}>
                                    {progress}%
                                  </div>
                                </div>
                              ) : (
                                // <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
                                //   <div
                                //     className='bg-blue-600 h-2.5 rounded-full'
                                //     style={{ width: progress + '%' }}></div>
                                // </div>

                                <button
                                  type='button'
                                  className='file-action-btn'
                                  onClick={() => DeleteSelectFile(id)}>
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                          {/* {uploading && (
                            <div className='w-[100px] flex items-center justify-center overflow-hidden'>
                              <div className='loaderAltTwo '>
                                <div>{progress}%</div>
                              </div>
                            </div>
                          )} */}
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex justify-start gap-2 flex-row-reverse'>
                    <button
                      disabled={submitButton}
                      type='submit'
                      className='btn bg-blue-500 text-white flex gap-2 form-submit disabled:bg-gray-500'>
                      {submitButton && <LoadingAlt />}
                      <div>Upload</div>
                    </button>
                    <div
                      onClick={() => CancelUploadAll()}
                      className='btn bg-red-500 text-white form-submit cursor-pointer'>
                      cancel
                    </div>
                  </div>
                </form>
                {Files.length > 0 ? (
                  <div className='kb-attach-box'>
                    <hr />
                    {Files.map((data, index) => {
                      const {
                        id,
                        filename,
                        filetype,
                        fileimage,
                        datetime,
                        filesize,
                      } = data;
                      return (
                        <div className='file-atc-box' key={index}>
                          {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                            <div className='file-image'>
                              <img src={fileimage} alt='' />
                            </div>
                          ) : (
                            <div className='file-image'>
                              <i className='far fa-file-alt'></i>
                            </div>
                          )}
                          {/* <div className='file-detail'>
                            <h6>{filename}</h6>
                            <p>
                              <span>Size : {filesize}</span>
                              <span className='ml-3'>
                                Modified Time : {datetime}
                              </span>
                            </p>
                            <div className='file-actions'>
                              <button
                                className='file-action-btn'
                                onClick={() => DeleteFile(id)}>
                                Delete
                              </button>
                              <a
                                href={fileimage}
                                className='file-action-btn'
                                download={filename}>
                                Download
                              </a>
                            </div>
                          </div> */}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
