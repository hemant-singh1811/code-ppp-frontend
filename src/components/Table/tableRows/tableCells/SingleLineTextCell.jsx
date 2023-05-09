import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableContext } from '../../tableComponents/TableComponents';

export default function SingleLineTextCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || '');
  const [isEditMode, setIsEditMode] = useState(false);
  const { table } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );

  function handleDoubleClick() {
    setIsEditMode(true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  // console.log(cell.getValue(), cell.row.original);

  function handleBlur() {
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      table.options.meta?.updateData(cell.row.index, cell.column.id, value);

      let newRowPart = { [cell?.column.id]: value };

      let rowObj = {
        base_id: selectedBaseId,
        table_id: selectedTableId,
        record_id: cell?.row?.original.id52148213343234567,
        updated_data: newRowPart,
        field_type: cell.column.columnDef.field_type,
        field_name: cell.column.columnDef.field_name,
        field_id: cell.column.columnDef.field_id,
      };

      socket.emit('updatedata', rowObj, (response) => {
        console.log('res : ', response);
      });
    }
  }

  return isEditMode ? (
    <input
      type='text'
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
      className='w-full h-full border-none px-2 p-1'
    />
  ) : (
    <div
      className='text-left w-full h-full break-words truncate  px-2 p-1'
      onDoubleClick={handleDoubleClick}>
      {value}
    </div>
  );
}
