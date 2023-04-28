import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAddTableRowMutation } from '../../../store/services/alphaTruckingApi';
import { useDetectOutsideClick } from '../../../utilities/customHooks/useDetectOutsideClick';
import { TableContext } from '../tableComponents/TableComponents';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import SingleSelectWithAddOption from '../tableRows/tableCells/SingleSelectWithAddOption';

export default function AddRowTable() {
  const location = useLocation();

  let tableModel = [];

  // Create a ref that we add to the element for which we want to detect outside clicks
  const addRowToggle = useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [openAddRowToggle, setOpenAddRowToggle] = useState(false);

  useDetectOutsideClick(addRowToggle, () => setOpenAddRowToggle(false));

  const { columns, setData, data } = useContext(TableContext);

  const { sidebar } = useSelector((state) => state.sidebar);

  const [addRowApi, responseCreateRow] = useAddTableRowMutation();

  const [uploadProgress, setUploadProgress] = useState(0);

  const [fileUploadHandle, setFileUploadHandle] = useState();

  const [submitButton, setSubmitButton] = useState(false);

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );

  const tableNamesWithId = new Map();
  const fieldsMapTempTesting = new Set();

  sidebar.map((ele) => {
    if (ele?.subMenu) {
      ele.subMenu.map(({ tableId, title }) => {
        tableNamesWithId.set(tableId, title);
      });
    }
  });

  columns?.map((ele) => {
    fieldsMapTempTesting.add(ele?.field_type);
  });

  // for (let [key] of fieldsMapTempTesting) {
  //   console.log(key);
  // }

  // for (const element of fieldsMapTempTesting) {
  //   // console.log(element);
  // }

  function uploader(e, fieldName) {
    // const message_id = UniqueCharacterGenerator();
    const file = e.target.files[0];
    let file_name = file.name;
    const reader = new FileReader();
    let parts = file_name.split('.');
    let fileType = parts[parts.length - 1];
    file_name = file_name.slice(0, file_name.length - fileType.length - 1);
    file_name = `${file_name}.${fileType}`;
    reader.readAsDataURL(file);
    setSubmitButton(true);

    reader.addEventListener('load', async (e) => {
      // let handleUploading = async () => {
      const storageRef = ref(storage, file_name);
      // 'file' comes from the Blob or File API
      try {
        // const uploadTask = await uploadBytes(storageRef, file);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100
            ).toFixed(0);
            // console.log('Upload is ' + progress + '% done');
            setUploadProgress('Upload is ' + progress + '% done');
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
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              console.log(downloadURL);
              setSubmitButton(false);
              setFileUploadHandle({
                [fieldName]: [
                  {
                    filename: file.name,
                    size: file.size,
                    type: file.type,
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
                  },
                ],
              });
            });
          }
        );

        // const starsRef = ref(storage, file_name);
        //   getDownloadURL(starsRef)
        //     .then((url) => {
        //       send("", user_token, url, fileType, file_name);
        //     })
        //     .catch((error) => {
        //       // A full list of error codes is available at
        //       // https://firebase.google.com/docs/storage/web/handle-errors
        //       switch (error.code) {
        //         case "storage/object-not-found":
        //           console.log("File doesn't exist");
        //           // File doesn't exist
        //           break;
        //         case "storage/unauthorized":
        //           console.log(
        //             "User doesn't have permission to access the object"
        //           );
        //           // User doesn't have permission to access the object
        //           break;
        //         case "storage/canceled":
        //           console.log("User canceled the upload");
        //           // User canceled the upload
        //           break;
        //         case "storage/unknown":
        //           // Unknown error occurred, inspect the server response
        //           break;
        //       }
        //     });
        // }
      } catch (e) {
        console.log(e);
      }
    });
  }

  useEffect(() => {
    if (responseCreateRow.data) {
      console.log('Create row:', responseCreateRow.data);
      setData([...data, responseCreateRow.data?.data]);
      setOpenAddRowToggle(false);
      console.log('response from server', responseCreateRow.data);
    }
  }, [responseCreateRow.isSuccess]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data)
    // console.log(fileUploadHandle)
    const updatedData = { ...data, ...fileUploadHandle };
    // console.log(updatedData)
    console.log('sending data to server', updatedData);
    addRowApi({
      baseId: selectedBaseId,
      data: {
        table_id: selectedTableId,
        data: updatedData,
      },
    });
  };

  return (
    <div
      ref={addRowToggle}
      className='absolute z-[1] flex items-center w-full bottom-0 rounded-md text-[#4d4d4d]  text-lg '>
      <div
        onClick={() => {
          setOpenAddRowToggle(!openAddRowToggle);
        }}
        className='text-black border-[1px] shadow-md bg-white hover:bg-blue-100 border-black   absolute bottom-3 left-3 rounded-full px-3 pl-1 h-10 flex justify-center items-center cursor-pointer '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
        Add Row
      </div>
      {openAddRowToggle && (
        <div className='h-4/5 w-1/2 overflow-scroll max-h-[80vh] min-w-[500px] max-w-[700px] mr-auto mt-auto bg-orange-100 z-50 p-10 pt-4 flex flex-col rounded-tr-md shadow-md'>
          <h1>
            <div className=' text-center font-semibold text-2xl mb-5 capitalize border-b-2 border-black'>
              {tableNamesWithId.get(selectedTableId)} Add Rows
            </div>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-y-4 gap-x-5 flex-1'>
              {columns?.map((data, i) => {
                let FieldsType = [
                  'multipleRecordLinks',
                  // "singleLineText",
                  // "multilineText",
                  // "multipleAttachments",
                  'checkbox',
                  'singleSelect',
                  'multipleSelects',
                  // "",
                  // "date",
                  // "phoneNumber",
                  // "email",
                  'url',
                  'createdTime',
                  'lastModifiedTime',
                  'createdBy',
                  'lastModifiedBy',
                  'autoNumber',
                  'button',
                ];
                switch (data?.field_type) {
                  case 'singleLineText':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            {...register(data?.id)}
                            type='text'
                            placeholder={data?.id}
                            className='text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500'
                          />
                        </div>
                      </div>
                    );
                  case 'multilineText':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            // style={{ resize: 'none' }}
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className='text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500'
                            // name="" id="" rows="3"
                          />
                        </div>
                      </div>
                    );
                  case 'phoneNumber':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            {...register(data?.id)}
                            placeholder={data?.id}
                            type='number'
                            className='text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500'
                          />
                        </div>
                      </div>
                    );
                  case 'date':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            {...register(data?.id)}
                            placeholder={data?.id}
                            type='date'
                            className='text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500'
                          />
                        </div>
                      </div>
                    );
                  case 'multipleAttachments':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        {/* <div className="">
                          <input
                            type="file"
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className="text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500"
                          />
                        </div> */}
                        <div className='bg-white rounded-md'>
                          <input
                            // {...register(data?.id)}
                            accept='image/*'
                            type='file'
                            id='file'
                            onChange={(e) => {
                              if (e.target.files[0]) uploader(e, data?.id);
                            }}
                            className='text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500'
                          />
                          <div className='m-1'>
                            {uploadProgress === 0 ? '' : uploadProgress}
                          </div>
                        </div>
                      </div>
                    );
                  case 'url':
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            type='url'
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className='text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500'
                          />
                        </div>
                      </div>
                    );
                  case 'singleSelect':
                    return (
                      <div key={i} className=''>
                        <SingleSelectWithAddOption />
                      </div>
                    );

                  default:
                    // console.log(data)
                    return (
                      <div key={i} className=''>
                        <div className='text-sm ml-1 mb-1'>{data?.id}</div>
                        <div className=''>
                          <input
                            {...register(data?.id)}
                            placeholder={data?.field_type}
                            className='text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500'
                          />
                        </div>
                      </div>
                    );
                }
              })}
            </div>
            <div className='flex gap-2 justify-between text-white text-xl mt-8'>
              <button
                className='px-4 p-1 hover:bg-red-600 bg-red-400   rounded-md shadow-md'
                onClick={() => setOpenAddRowToggle(false)}>
                Cancel
              </button>
              <button
                disabled={submitButton}
                type='submit'
                className='px-4 p-1 hover:bg-green-600 bg-green-400  rounded-md shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed'>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
