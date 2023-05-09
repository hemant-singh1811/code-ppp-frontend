import React, { useContext, useEffect, useState } from 'react';
import { useDetectOutsideClick } from '../../../../utilities/customHooks/useDetectOutsideClick';
import { useSelector } from 'react-redux';
import { TableContext } from '../../tableComponents/TableComponents';
import { colorPallet } from '../../../../utilities/colorPallet';

function SingleSelectWithAddOption({ columnData, rowData, cell }) {
  const { columns, setColumns, table } = useContext(TableContext);
  const socket = useSelector((state) => state.socketWebData.socket);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const singleSelectRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));

  let newOptions = [{ name: '' }];
  if (Array.isArray(columnData?.options)) {
    newOptions = columnData?.options;
  }

  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(rowData || []);
  const [options, setOptions] = useState(newOptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [bgColorAndTextColor, setBgColorAndTextColor] = useState(
    getRandomColor()
  );
  // const [textColor, setTextColor] = useState(getContrastColor(text));

  function getRandomColor() {
    return colorPallet[Math.floor(Math.random() * colorPallet.length)];
  }

  let rowCopy = cell?.row?.original;

  function addNewOption() {
    let obj = {
      type: columnData?.field_type,
      field_id: columnData?.field_id,
      table_id: selectedTableId,
      obj: {
        field_id: columnData?.field_id,
        field_description: columnData?.field_description,
        json_field_type: columnData?.json_field_type,
        created_at: columnData?.created_at,
        field_type: columnData?.field_type,
        created_by: columnData?.created_by,
        field_name: columnData?.field_name,
        options: [
          ...options,
          {
            name: searchTerm,
            bgcolor: bgColorAndTextColor.background,
            color: bgColorAndTextColor.color,
          },
        ],
      },
    };

    table.options.meta?.updateData(cell.row.index, cell.column.id, [
      searchTerm,
    ]);

    setColumns((prev) => {
      return prev.map((data) => {
        if (data.field_id === columnData.field_id) {
          data.options = [
            ...options,
            {
              name: searchTerm,
              bgcolor: bgColorAndTextColor.background,
              color: bgColorAndTextColor.color,
            },
          ];
        }
        return data;
      });
    });

    setOptions([
      ...options,
      {
        name: searchTerm,
        bgcolor: bgColorAndTextColor.background,
        color: bgColorAndTextColor.color,
      },
    ]);

    // Object.isFrozen(rowData);

    rowData = [searchTerm];
    setSelectedOption([searchTerm]);
    setSearchTerm('');
    setSingleSelectToggle(!SingleSelectToggle);
    rowCopy[cell?.column.id] = rowData;

    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [searchTerm] };

    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
    };

    socket?.emit('updatemetadata', obj, (response) => {
      console.log('socket response: ' + JSON.stringify(response));
    });

    socket?.emit('updatedata', rowObj, (response) => {
      console.log('res : ', response);
    });

    setBgColorAndTextColor(getRandomColor());
  }

  function updateOption(name) {
    rowData = [name];
    setSelectedOption([name]);
    let updatedRowKey = cell?.column.id;
    let newRowPart = { [updatedRowKey]: [name] };

    let rowObj = {
      base_id: selectedBaseId,
      table_id: selectedTableId,
      record_id: rowCopy.id52148213343234567,
      updated_data: newRowPart,
      field_type: cell.column.columnDef.field_type,
      field_name: cell.column.columnDef.field_name,
      field_id: cell.column.columnDef.field_id,
    };
    rowCopy[cell?.column.id] = rowData;
    table.options.meta?.updateData(cell.row.index, cell.column.id, [name]);
    // console.log(rowObj)
    socket?.emit('updatedata', rowObj, (response) => {
      console.log('res : ', response);
    });
    setSingleSelectToggle(!SingleSelectToggle);
  }

  useEffect(() => {
    setOptions(columnData?.options);
  }, [columns]);

  return (
    <div
      onClick={() => {
        setSingleSelectToggle(!SingleSelectToggle);
        setSearchTerm('');
      }}
      className='flex h-full w-full items-center p-1  '>
      <div
        className={`relative select-none h-full  z-0 flex items-start  border-transparent border rounded-sm w-[calc(100%_-_14px)] ${
          SingleSelectToggle && 'border-blue-500'
        }`}
        ref={singleSelectRef}>
        <div className=' w-full rounded-md cursor-pointer flex items-center pr-1 justify-between '>
          {options?.map(({ name, color, bgcolor }, i) => {
            if (selectedOption?.includes(name) && name !== '')
              return (
                <div
                  key={i}
                  className={`rounded-3xl px-2 text-[13px] truncate w-fit bg-opacity-20`}
                  style={{ background: bgcolor, color: color }}>
                  {name}
                </div>
              );
          })}
        </div>
        {SingleSelectToggle && (
          <div
            className='absolute -left-1 top-7 w-full  bg-white rounded-md shadow-lg min-w-[200px] border  overflow-x-hidden'
            style={{ zIndex: 100 }}>
            <input
              type='text'
              name='search option'
              id=''
              placeholder='find an option'
              className='w-full outline-none p-2'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              autoComplete={'off'}
              autoFocus
            />
            <div className='max-h-[300px]  overflow-y-auto'>
              {options
                ?.filter(({ name }) => name?.includes(searchTerm))
                .map(({ color, name, bgcolor }, i) => {
                  return (
                    <div
                      onClick={() => updateOption(name)}
                      key={i}
                      className='p-2 hover:bg-blue-100 flex min-h-[30px] w-full'>
                      {name && (
                        <div
                          onClick={() => setSearchTerm('')}
                          style={{ background: bgcolor, color: color }}
                          className={`rounded-xl px-2 truncate`}>
                          {name}
                        </div>
                      )}
                    </div>
                  );
                })}
              {options?.filter(({ name }) => name === searchTerm).length ===
                0 && (
                <div
                  onClick={addNewOption}
                  className='p-2 hover:bg-blue-100 flex truncate'>
                  <div className='truncate flex'>
                    Add New Option:
                    {searchTerm && (
                      <span
                        style={{
                          background: bgColorAndTextColor.background,
                          color: bgColorAndTextColor.color,
                        }}
                        className={`rounded-xl px-2 ml-1 truncate`}>
                        {searchTerm}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='min-w-4 h-4 flex'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='min-w-4 h-4 text-blue-500 ml-auto'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </div>
    </div>
  );
}

export default SingleSelectWithAddOption;
