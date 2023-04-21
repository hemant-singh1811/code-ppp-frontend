import React from 'react';
import { useAddTableRowMutation } from '../../../store/services/alphaTruckingApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TableContext } from '../tableComponents/TableComponents';
import { useContext } from 'react';

export default function CreateRow() {
  const [addRowApi, responseCreateRow] = useAddTableRowMutation();
  const { selectedTableId, selectedBaseId } = useSelector(
    (state) => state.globalState
  );
  const { columns, setData, data } = useContext(TableContext);

  useEffect(() => {
    if (responseCreateRow.data) {
      console.log('Create Row', responseCreateRow.data);
      let newData = {
        ...responseCreateRow.data?.data,
        id52148213343234567: responseCreateRow.data?.metadata?.record_id,
      };
      setData([...data, newData]);
    }
  }, [responseCreateRow.isSuccess]);

  function createRow() {
    let updatedData = {};
    columns.forEach(({ field_type, field_name }) => {
      switch (field_type) {
        case 'singleSelect':
          updatedData[field_name] = '';
          break;
        case 'multipleSelects':
          updatedData[field_name] = '';
          break;
        case 'multipleAttachments':
          updatedData[field_name] = [];
          break;
        case 'checkbox':
          updatedData[field_name] = false;
          break;

        default: //string
          updatedData[field_name] = '';
          break;
      }
    });
    addRowApi({
      baseId: selectedBaseId,
      data: {
        table_id: selectedTableId,
        data: updatedData,
      },
    });
  }

  return (
    <div
      className='hover:bg-gray-100 px-1 cursor-pointer h-full item-center flex'
      onClick={createRow}>
      <span className='material-icons-round font-thin '>add</span>
    </div>
  );
}
