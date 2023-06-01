import React, { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "./TableComponents";

const FormComponents = ({ row, column, type }) => {
  const components = {
    singleSelect: <SingleSelect row={row} column={column} />,
    linkedRecords: <SingleLineText />,
    singleLineText: <SingleLineText row={row} column={column} />,
    multilineText: <MultilineTextCell row={row} column={column} />,
    attachments: <SingleLineText />,
    checkbox: <Checkbox row={row} column={column} />,
    multipleSelect: <SingleLineText />,
    user: <SingleLineText render={"form"} />,
    date: <SingleLineText />,
    phoneNumber: <SingleLineText />,
    email: <SingleLineText />,
    url: <SingleLineText />,
    number: <SingleLineText />,
    currency: <SingleLineText />,
    percent: <SingleLineText />,
    duration: <SingleLineText />,
    rating: <SingleLineText />,
    formula: <SingleLineText />,
    rollup: <SingleLineText />,
    count: <SingleLineText />,
    lookup: <SingleLineText />,
    createdTime: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} />
    ),
    lastModifiedTime: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} />
    ),
    createdBy: <ModifiedAndCreatedCell type={type} column={column} row={row} />,
    lastModifiedBy: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} />
    ),
    autoNumber: <SingleLineText />,
    barcode: <SingleLineText />,
    button: <SingleLineText />,
  };
  return <>{components[type]}</>;
};

export const SingleLineText = ({ row, column }) => {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(row?.getValue(column.id) || "");
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const { table, activeNumberOfLines } = useContext(TableContext);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  function handleBlur() {
    if (row?.getValue(column.id) !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }

  return (
    <div className='w-full hover:shadow-md'>
      <input
        type='text'
        className='outline-blue-700'
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export function ModifiedAndCreatedCell({ type, row }) {
  switch (type) {
    case "lastModifiedBy":
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div
            style={{
              background: row?.original.lastModifiedBy?.background,
              color: row?.original.lastModifiedBy?.color,
            }}
            className='w-6 h-6 rounded-full flex items-center justify-center relative z-10'
          >
            {row?.original?.lastModifiedBy?.userName.slice(0, 1).toUpperCase()}
          </div>
          <div className='capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5'>
            {row?.original?.lastModifiedBy?.userName}
          </div>
        </div>
      );
    case "lastModifiedTime":
      // console.log(cell.row.original?.lastModifiedTime);
      let lastModifiedTime;
      if (row?.original?.lastModifiedTime) {
        lastModifiedTime = new Date(row.original?.lastModifiedTime);
        // lastModifiedTime = convertDate(cell.row.original?.lastModifiedTime);
      }
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div className='capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
            <span>{lastModifiedTime?.toLocaleDateString()}</span>
            <span>{lastModifiedTime?.toLocaleTimeString()}</span>
          </div>
        </div>
      );
    case "createdBy":
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div
            style={{
              background: row?.original.createdBy?.background,
              color: row?.original.createdBy?.color,
            }}
            className='w-6 h-6 rounded-full flex items-center justify-center relative z-10'
          >
            {row?.original?.createdBy?.userName.slice(0, 1).toUpperCase()}
          </div>
          <div className='capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5'>
            {row?.original?.createdBy?.userName}
          </div>
        </div>
      );
    case "createdTime":
      // console.log(cell.row.original?.createdTime);
      const createdTime = new Date(row?.original?.createdTime);
      return (
        <div className=' flex items-start w-full h-full text-left px-2 p-1'>
          <div className='capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5'>
            <span>{createdTime.toLocaleDateString()}</span>
            <span>{createdTime.toLocaleTimeString()}</span>
          </div>
        </div>
      );

    default:
      break;
  }
}

export function MultilineTextCell({ row, column }) {
  const [value, setValue] = useState(row?.getValue(column.id) || []);
  const socket = useSelector((state) => state.socketWebData.socket);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  function handleBlur(event) {
    event.target.style.outline = "none";
    if (row?.getValue() !== event.target.innerText) {
      let newRowPart = event.target.value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          event.target.value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }
  return (
    <textarea
      className='w-full h-full outline-none placeholder:p-1'
      value={value}
      onChange={changeHandler}
      onBlur={handleBlur}
      onFocus={(e) => {
        e.target.style.outline = "blue auto 1px";
      }}
    />
  );
}

export function Checkbox({ row, column }) {
  const [value, setValue] = useState(row?.original[column.id] || false);
  const socket = useSelector((state) => state.socketWebData.socket);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const onChange = (e) => {
    setValue(e.target.checked);
  };
  function handleBlur() {
    if (row?.getValue(column.id) !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }
  return (
    <input
      type='checkbox'
      className='w-4 h-4'
      checked={value}
      onChange={onChange}
      onBlur={handleBlur}
    />
  );
}

export function SingleSelect({ row, column }) {
  const [options, setOptions] = useState(column?.columnDef.options || []);
  const socket = useSelector((state) => state.socketWebData.socket);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const [value, setValue] = useState(row?.original[column.id] || "");
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  console.log("Single Select column", column);
  function handleBlur() {
    if (row?.getValue(column.id) !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }
  return (
    <select
      className='w-full h-full outline-none'
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      multiple={true}
    >
      {/* {column.columnDef.options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))} */}
    </select>
  );
}

export default FormComponents;
