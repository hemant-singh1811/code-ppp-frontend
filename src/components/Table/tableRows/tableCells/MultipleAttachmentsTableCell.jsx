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
// import { useStorage } from 'react-firebase-hooks/storage';
// import { useDatabase } from 'react-firebase-hooks/database';

export default function MultipleAttachmentsTableCell({ rowData, cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChildVisible, setIsChildVisible] = useState(false);

  const dispatch = useDispatch();

  let images;
  let thumbnails;
  if (Array.isArray(rowData)) {
    thumbnails = rowData?.map(({ thumbnails }) => thumbnails?.small);
    images = rowData?.map(({ url }) => url);
  }

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
  return (
    <div className='h-full overflow-hidden select-none'>
      <div
        className='flex h-full w-full items-center  px-1 gap-1'
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        tabIndex='1'>
        {Array.isArray(images) &&
          thumbnails.map((image, index) => (
            <img
              src={image?.url}
              className={`border h-full rounded-sm  cursor-pointer object-fill `}
              key={index}
              // style={{ minWidth: activeHeight - 10 + 'px' }}
              alt='i'
            />
          ))}

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
  let fieldName = cell.column.columnDef.header;
  const [selectedFile, SetSelectedFile] = useState([]);
  const [Files, SetFiles] = useState([]);
  const [uploadTask, setUploadTask] = useState(null);
  const [fileUploadHandle, setFileUploadHandle] = useState([]);

  const [submitButton, setSubmitButton] = useState(false);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

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

  const FileUploadSubmit = (e) => {
    e.preventDefault();
    // console.log(selectedFile);
    setSubmitButton(true);

    // form reset on submit
    e.target.reset();
    if (selectedFile.length > 0) {
      const storage = getStorage();
      let totalSize = 0;

      selectedFile.map((file, i) => {
        totalSize += file.size;
        let tempFile = file.file;

        const storageRef = ref(storage, file.file.name);
        const uploadTask = uploadBytesResumable(storageRef, tempFile);

        promises.push(uploadTask);

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
            switch (snapshot.state) {
              case 'paused':
                // console.log('Upload is paused');
                break;
              case 'running':
                // console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.error(error);
          }
          // async () => {
          //   // Handle successful uploads on complete
          //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          //   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          //   setFileUploadHandle([
          //     ...fileUploadHandle,
          //     {
          //       filename: file.file.name,
          //       size: file.file.size,
          //       type: file.file.type,
          //       thumbnails: {
          //         small: {
          //           width: 25,
          //           height: 36,
          //           url: downloadURL,
          //         },
          //         large: {
          //           width: 512,
          //           height: 725,
          //           url: downloadURL,
          //         },
          //         full: {
          //           width: 3000,
          //           height: 3000,
          //           url: downloadURL,
          //         },
          //       },
          //       url: downloadURL,
          //       width: 3000,
          //       height: 4676,
          //     },
          //   ]);
          //   console.log(downloadURL);
          //   //  .then((downloadURL) => {
          //   //     // console.log('File available at', downloadURL);
          //   //     // console.log(uploadTask);
          //   //     // console.log(downloadURL);
          //   //   });
          // }
        );
      });

      // setUploadTask(promises);

      Promise.all(promises)
        .then(() => {
          promises.map((prom) => {
            prom.on();
            console.log(prom);
          });
          console.log(promises);
          setSubmitButton(false);
          console.log('Upload complete!');
          console.log('fileUploadHandle', fileUploadHandle);
          SetSelectedFile([]);
        })
        .catch((error) => {
          console.error(error);
        });

      // setUploadTask(promises);

      // Promise.all(promises)
      //   .then(() => {
      //     setFiles([]);
      //     setUploadProgress(0);
      //     console.log('Upload complete!');
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // for (let index = 0; index < selectedFile.length; index++) {
      //   SetFiles((preValue) => {
      //     return [...preValue, selectedFile[index]];
      //   });
      // }
      // SetSelectedFile([]);
    } else {
      alert('Please select file');
    }
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
                        type='file'
                        id='fileupload'
                        className='file-upload-input'
                        onChange={InputChange}
                        multiple
                      />
                      <span>
                        Drag and drop or{' '}
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
                                <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
                                  <div
                                    className='bg-blue-600 h-2.5 rounded-full'
                                    style={{ width: progress + '%' }}></div>
                                </div>
                              ) : (
                                <button
                                  type='button'
                                  className='file-action-btn'
                                  onClick={() => DeleteSelectFile(id)}>
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                          {uploading && (
                            <div className='w-[100px] flex items-center justify-center overflow-hidden'>
                              <div className='loaderAltTwo '>
                                <div>{progress}%</div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex justify-start gap-2 flex-row-reverse'>
                    <button
                      disabled={submitButton}
                      type='submit'
                      className='btn bg-blue-500 text-white form-submit disabled:bg-gray-500'>
                      Upload
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
