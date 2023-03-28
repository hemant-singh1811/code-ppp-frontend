import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAddTableRowMutation } from "../../../store/services/alphaTruckingApi";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";
import { TableContext } from "../tableComponents/TableComponents";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";

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

  const tableNamesWithId = new Map();
  const fieldsMapTempTesting = new Set();

  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);


  sidebar.map((ele) => {
    if (ele?.subMenu) {
      ele.subMenu.map(({ tableId, title }) => {
        tableNamesWithId.set(tableId, title);
      });
    }
  });

  columns?.map((ele) => {
    // console.log(ele?.field_type)
    fieldsMapTempTesting.add(ele?.field_type);
  });

  // for (let [key] of fieldsMapTempTesting) {
  //   console.log(key);
  // }

  // for (const element of fieldsMapTempTesting) {
  //   // console.log(element);
  // }

  useEffect(() => {
    if (responseCreateRow.data) {
      setData([...data, responseCreateRow.data?.data]);
      setOpenAddRowToggle(false);
      console.log('response from server', responseCreateRow.data)
    }
  }, [responseCreateRow.isSuccess]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(storage)

  // const handleUpload = () => {
  //   const uploadTask = storage.ref(`files/${file.name}`).put(file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       storage
  //         .ref("files")
  //         .child(file.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           console.log(url);
  //         });
  //     }
  //   );
  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("sending data to server", data);
    // addRowApi({
    //   tableId: location.pathname.split("/")[2],
    //   data: data,
    // });
  };

  // console.log(watch('long Text'))

  return (
    <div
      ref={addRowToggle}
      className="absolute  flex items-center w-full bottom-0 rounded-md text-[#4d4d4d]  text-lg "
    >
      <div
        onClick={() => {
          setOpenAddRowToggle(!openAddRowToggle);
        }}
        className="text-black border-[1px] shadow-md bg-white hover:bg-blue-100 border-black   absolute bottom-3 left-3 rounded-full px-3 pl-1 h-10 flex justify-center items-center cursor-pointer "
      >
        <span className="material-symbols-rounded">add</span> Add Row
      </div>
      {openAddRowToggle && (
        <div className="h-4/5 w-1/2 overflow-scroll max-h-[80vh] min-w-[500px] max-w-[700px] mr-auto mt-auto bg-orange-100 z-50 p-10 pt-4 flex flex-col rounded-tr-md shadow-md">
          <h1>
            <div className=" text-center font-semibold text-2xl mb-5 capitalize border-b-2 border-black">
              {tableNamesWithId.get(location.pathname.split("/")[2])} Add Rows
            </div>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 flex-1">
              {columns?.map((data, i) => {
                let FieldsType = [
                  "multipleRecordLinks",
                  // "singleLineText",
                  // "multilineText",
                  // "multipleAttachments",
                  "checkbox",
                  "singleSelect",
                  "multipleSelects",
                  // "",
                  // "date",
                  // "phoneNumber",
                  // "email",
                  "url",
                  "createdTime",
                  "lastModifiedTime",
                  "createdBy",
                  "lastModifiedBy",
                  "autoNumber",
                  "button",
                ];
                switch (data?.field_type) {
                  case "singleLineText":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            {...register(data?.id)}
                            type="text"
                            placeholder={data?.id}
                            className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    )
                  case "multilineText":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            // style={{ resize: 'none' }}
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                          // name="" id="" rows="3"
                          />
                        </div>
                      </div>
                    )
                  case "phoneNumber":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            {...register(data?.id)}
                            placeholder={data?.id}
                            type='number'
                            className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    )
                  case "date":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            {...register(data?.id)}
                            placeholder={data?.id}
                            type='date'
                            className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    )
                  case "multipleAttachments":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            type="file"
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className="text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500"
                          />
                        </div>
                        {/* <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>
                        {progress > 0 && <progress value={progress} max="100" />} */}
                      </div>
                    )
                  case "url":
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            type="url"
                            {...register(data?.id)}
                            placeholder={data?.id}
                            className="text-black w-full p-1.5 py-[2.5px] bg-white px-2 rounded-md shadow-md focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    )

                  default:
                    // console.log(data)
                    return (
                      <div key={i} className="">
                        <div className="text-sm ml-1 mb-1">{data?.id}</div>
                        <div className="">
                          <input
                            {...register(data?.id)}
                            placeholder={data?.field_type}
                            className="text-black w-full p-1.5 px-2 rounded-md shadow-md  focus:outline-blue-500"
                          />
                        </div>
                      </div>
                    )
                }


              })}
            </div>
            <div className="flex gap-2 justify-between text-white text-xl mt-8">
              <button
                className="px-4 p-1 hover:bg-red-600 bg-red-400   rounded-md shadow-md"
                onClick={() => setOpenAddRowToggle(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 p-1 hover:bg-green-600 bg-green-400  rounded-md shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div >
      )
      }
    </div >
  );
}
