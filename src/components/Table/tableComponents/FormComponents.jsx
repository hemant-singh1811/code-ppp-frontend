import React, { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "./TableComponents";
import { Input, Textarea } from "@material-tailwind/react";


const FormComponents = ({ row, column, type }) => {
  const components = {
    singleSelect: <SingleSelect row={row} column={column} />,
    linkedRecords: <SingleLineText row={row} column={column} />,
    singleLineText: <SingleLineText row={row} column={column} />,  //Done
    multilineText: <MultilineTextCell row={row} column={column} />,  //Done
    attachments: <SingleLineText row={row} column={column} />,
    checkbox: <Checkbox row={row} column={column} />, //Done
    multipleSelect: <SingleLineText row={row} column={column} />,
    user: <SingleLineText row={row} column={column} />,
    date: <SingleLineText row={row} column={column} />,
    phoneNumber: <SingleLineText row={row} column={column} />,  //Done
    email: <Email row={row} column={column} />,  //Done
    url: <SingleLineText row={row} column={column} />,  //Done
    number: <Number row={row} column={column} />,  //Done
    currency: <Currency row={row} column={column} />,  //Done
    percent: <SingleLineText row={row} column={column} />,
    duration: <SingleLineText row={row} column={column} />,
    rating: <SingleLineText row={row} column={column} />,
    formula: <SingleLineText row={row} column={column} />,
    rollup: <SingleLineText row={row} column={column} />,
    count: <SingleLineText row={row} column={column} />,
    lookup: <SingleLineText row={row} column={column} />,
    createdTime: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} />  //Done
    ),
    lastModifiedTime: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} />  //Done
    ),
    createdBy: <ModifiedAndCreatedCell type={type} column={column} row={row} />,  //Done
    lastModifiedBy: (
      <ModifiedAndCreatedCell type={type} column={column} row={row} /> //Done
    ),
    autoNumber: <SingleLineText row={row} column={column} />,
    barcode: <SingleLineText row={row} column={column} />,  //Done
    button: <SingleLineText row={row} column={column} />,
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

  //console.log("column", column);
  function handleBlur() {
    if (row?.getValue(column?.id) !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: column?.columnDef?.fieldType,
          fieldId: column?.columnDef?.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row?.index,
          column?.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }

  return (
    <div className="w-full hover:shadow-md border-gray-600">
      <input
        type="text"
        label={null}
        className="h-10 p-1 px-2 flex-auto width-full rounded-big border border-gray-300 focus:border-blue-700 focus:ring-0 border-rounded"
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
        <div className=" flex items-start w-full h-full text-left px-2 p-1">
          <div
            style={{
              background: row?.original.lastModifiedBy?.background,
              color: row?.original.lastModifiedBy?.color,
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center relative z-10">
            {row?.original?.lastModifiedBy?.userName.slice(0, 1).toUpperCase()}
          </div>
          <div className="capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5">
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
        <div className=" flex items-start w-full h-full text-left px-2 p-1">
          <div className="capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5">
            <span>{lastModifiedTime?.toLocaleDateString()}</span>
            <span>{lastModifiedTime?.toLocaleTimeString()}</span>
          </div>
        </div>
      );
    case "createdBy":
      return (
        <div className=" flex items-start w-full h-full text-left px-2 p-1">
          <div
            style={{
              background: row?.original.createdBy?.background,
              color: row?.original.createdBy?.color,
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center relative z-10">
            {row?.original?.createdBy?.userName.slice(0, 1).toUpperCase()}
          </div>
          <div className="capitalize text-sm px-2 pl-6 relative z-0 -ml-5 rounded-full bg-[#eee] mt-0.5">
            {row?.original?.createdBy?.userName}
          </div>
        </div>
      );
    case "createdTime":
      // console.log(cell.row.original?.createdTime);
      const createdTime = new Date(row?.original?.createdTime);
      return (
        <div className=" flex items-start w-full h-full text-left px-2 p-1">
          <div className="capitalize text-sm px-1 flex relative z-0 truncate rounded-sm gap-4 bg-[#eee] mt-0.5">
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
      className="p-1 px-2 flex-auto w-full rounded-big border border-gray-300 focus:border-blue-700 border-rounded h-auto"
      value={value}
      autoFocus
      onChange={changeHandler}
      onBlur={handleBlur}

      // onFocus={(e) => {
      //   e.target.style.outline = "blue auto 1px";
      // }}
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
      type="checkbox"
      className="w-4 h-4"
      checked={value}
      onChange={onChange}
      onBlur={handleBlur}
    />
  );
}

export function SingleSelect({ row, column }) {
  const [options, setOptions] = useState(column?.columnDef.options || []);
  console.log(options)
  const socket = useSelector((state) => state.socketWebData.socket);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const [value, setValue] = useState(row?.original[column.id] || "");
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const onChange = (e) => {
    console.log(e.target.value);
    //setValue(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [textInput, setTextInput] = useState('');
  //const options = ['Option 1', 'Option 2', 'Option 3']; // Replace with your own array

  const handleFieldClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    console.log("options",options);
    setSearchTerm(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  }
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
    <div className="relative">
      <button
        className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        onClick={handleFieldClick}
      >
        Select Field
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-white rounded shadow-lg">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Text Input"
              value={textInput}
              onChange={handleTextInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <ul>
            { options
              .filter((option) =>
                option?.name?.includes(searchTerm.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer z-2000"
                >
                  {option.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
    // <select
    //   className="w-full h-full outline-none"
    //   value={value}
    //   onChange={onChange}
    //   onBlur={handleBlur}
    //   multiple={true}>
    //   {/* {column.columnDef.options.map((opt) => (
    //     <option key={opt} value={opt}>
    //       {opt}
    //     </option>
    //   ))} */}
    // </select>
  );
}

export function Email({ row, column }) {
  const [value, setValue] = useState(row?.original[column.id] || "");
  //const [isValid, setIsValid] = useState(true);
  const socket = useSelector((state) => state.socketWebData.socket);

  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  const { table, activeNumberOfLines } = useContext(TableContext);

  function validateEmailString(emailString) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emails = emailString.split(",").map((email) => email.trim());

    for (let i = 0; i < emails.length; i++) {
      if (emails[i] === "") continue;
      if (!emailRegex.test(emails[i])) {
        return false;
      }
    }
    return true;
  }
  const onChange = (e) => {
    setValue(e.target.value);
  };
  function handleBlur() {
    if (!validateEmailString(value)) {
      console.log("invalid");
      setIsValid(false);
    }
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

  const myCLasses = `h-10 p-1 px-2 flex-auto width-full rounded-big border border-gray-300 focus:border-blue-700 focus:ring-0 border-rounded ${
    validateEmailString(value) ? "" : "bg-red-200"
  }`;

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={myCLasses}
      />
    </div>
  );
}

export function Currency({ row, column }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(row?.getValue(column?.id) || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  let options = column.columnDef?.currencyFieldOptions;
  //console.log(options);

  function handleChange(event) {
    const arr = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
      options?.currencyValue,
    ];
    if (arr.includes(event.target.value[event.target.value.length - 1])) {
      setValue(event.target.value);
    } else if (event.target.value === "") {
      setValue(event.target.value);
    } else {
      //setValue(event.target.value);
    }
  }
  //   console.log(options);
  function handleBlur() {
    setIsEditMode(false);
    const val = removeExtraCharacter(value);
    if (row.getValue(column.id) !== val) {
      let updatedValue = removeExtraCharacter(val);
      console.log("isNaN", isNaN(parseFloat(val)), parseFloat(val));
      updatedValue = isNaN(parseFloat(val))
        ? ""
        : parseFloat(val).toFixed(options?.fieldPrecision);
      console.log("updatedValue", updatedValue);
      setValue(updatedValue);

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: updatedValue,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          updatedValue,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }

  function removeExtraCharacter(value) {
    const inputValue = value.replace(/[^\d.]/g, ""); //  Remove non-digit and non-dot characters
    return inputValue;
  }

  function addCommas(value) {
    const inputValue = value.replace(/[^\d.]/g, ""); // Remove non-digit and non-dot characters
    const parts = inputValue.split("."); // Split into integer and decimal parts
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to the integer part

    // Reconstruct the value with commas and decimal point
    const formattedValue = parts.length === 2 ? parts.join(".") : parts[0];
    return formattedValue;
  }

  return (
    <input
      type="text"
      value={value && options?.currencyValue + addCommas(value)}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      style={{
        paddingBottom:
          activeNumberOfLines === 4
            ? 102
            : activeNumberOfLines === 3
            ? 62
            : activeNumberOfLines === 2
            ? 30
            : activeNumberOfLines === 1 && 4,
        // boxShadow: "0 0 0px 2px inset #166ee1",
      }}
      className="h-10 p-1 px-2 flex-auto width-full rounded-big border border-gray-300 focus:border-blue-700 focus:ring-0 border-rounded text-left"
    />
  );
}

export function Number({row,column}) {
  
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(row?.getValue(column?.id) || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  let options = column.columnDef?.numberFieldOptions;
  //console.log(options);

  function handleChange(event) {
    const arr = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9", 
      "0",
      ".",
      options?.numberValue,
    ];
    if (arr.includes(event.target.value[event.target.value.length - 1])) {
      setValue(event.target.value);
    } else if (event.target.value === "") {
      setValue(event.target.value);
    } else {
      //setValue(event.target.value);
    }
  }
  //   console.log(options);
  function handleBlur() {
    setIsEditMode(false);
    const val = (value);
    if (row.getValue(column.id) !== val) {
      let updatedValue = (val);
      console.log("isNaN", isNaN(parseFloat(val)), parseFloat(val));
      updatedValue = isNaN(parseFloat(val))
        ? ""
        : parseFloat(val).toFixed(options?.fieldPrecision);
      console.log("updatedValue", updatedValue);
      setValue(updatedValue);

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: row?.original.id52148213343234567,
          updatedData: updatedValue,
          fieldType: column.columnDef.fieldType,
          fieldId: column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          row.index,
          column.id,
          updatedValue,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }



  return (
    <input

      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      className="h-10 p-1 px-2 flex-auto width-full rounded-big border border-gray-300 focus:border-blue-700 focus:ring-0 border-rounded text-left"
    />
  );

  
}

export function Percent({row,column}) {
    
    const socket = useSelector((state) => state.socketWebData.socket);
    const [value, setValue] = useState(row?.getValue(column?.id) || "");
    const [isEditMode, setIsEditMode] = useState(false);
    const { table, activeNumberOfLines } = useContext(TableContext);
    const { selectedBaseId, selectedTableId } = useSelector(
      (state) => state.globalState
    );
    const userToken = useSelector((state) => state.auth.userInfo?.userToken);
    let options = column.columnDef?.percentFieldOptions;
    //console.log(options);
  
    function handleChange(event) {
      const arr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8", 
        "9",
        "0",
        ".",
        options?.percentValue,
      ];
      if (arr.includes(event.target.value[event.target.value.length - 1])) {
        setValue(event.target.value);
      } else if (event.target.value === "") {
        setValue(event.target.value);
      } else {
        //setValue(event.target.value);
      }
    }
    //   console.log(options);
    function handleBlur() {
      setIsEditMode(false);
      const val = (value);
      if (row.getValue(column.id) !== val) {
        let updatedValue = (val);
        console.log("isNaN", isNaN(parseFloat(val)), parseFloat(val));
        updatedValue = isNaN(parseFloat(val))
          ? ""
          : parseFloat(val).toFixed(options?.fieldPrecision);
        console.log("updatedValue", updatedValue);
        setValue(updatedValue);
  
        let rowObj = {
          userToken: userToken,
          data: {
            baseId: selectedBaseId,
            tableId: selectedTableId,
            recordId: row?.original.id52148213343234567,
            updatedData: updatedValue,
            fieldType: column.columnDef.fieldType,
            fieldId: column.columnDef.fieldId,
          },
        };
  
        socket.emit("updateData", rowObj, (response) => {
          table.options.meta?.updateData(
            row.index,
            column.id,
            updatedValue,
            response.metaData
          );
          console.log("res : ", response);
        });
      }
    }

    return (
      <input

        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        className="h-10 p-1 px-2 flex-auto width-full rounded-big border border-gray-300 focus:border-blue-700 focus:ring-0 border-rounded text-left"
      />
    );
}


export default FormComponents;
