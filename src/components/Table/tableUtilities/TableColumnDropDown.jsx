import React, { useContext, useEffect } from 'react'
import { useDeleteTableColumnMutation } from '../../../store/services/alphaTruckingApi';
import { TableContext } from '../tableComponents/TableComponents';

export default function TableColumnDropDown({ columnDropdownRef, columnDef }) {
    // Create a ref that we add to the element for which we want to detect outside clicks

    // Call hook passing in the ref and a function to call on outside click
    // const location = useLocation();
    const { columns, setColumns } = useContext(TableContext);

    const [addDeleteApi, responseDeleteColumn] = useDeleteTableColumnMutation()
    // const [addDeleteApitest] = useDeleteTableColumnMutation()

    // console.log(addDeleteApitest)
    const [columnDropdownToggle, setColumnDropdownToggle] = React.useState(false);

    async function deleteColumn() {
        setColumnDropdownToggle(!columnDropdownToggle);
        addDeleteApi({
            tableId: location.pathname.split('/')[2],
            data: {
                field_id: columnDef?.field_id
            }
        }
        )
    }

    useEffect(() => {
        if (responseDeleteColumn.data) {
            setColumns((prev) => prev.filter((item) => item.field_id !== columnDef?.field_id));
        }
    }, [responseDeleteColumn.isSuccess])

    return (
        <div className=" " ref={columnDropdownRef}>
            <div className="text-gray-400 -mr-2 cursor-pointer hover:text-blue-800">
                <span className="material-symbols-rounded font-light" onClick={() =>
                    setColumnDropdownToggle(!columnDropdownToggle)}>
                    expand_more
                </span>
            </div>
            {columnDropdownToggle && (
                <div className="text-black absolute top-[30px] z-20 w-56 rounded-md left-0 p-4 border-gray-400 border-[.5px] shadow-md flex flex-col bg-white">
                    <div className='hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center '>
                        <span className="material-symbols-rounded text-lg font-light mr-4">
                            edit
                        </span>
                        Edit Field
                    </div>
                    <div className='hover:bg-gray-100 cursor-pointer rounded-[4px] py-1 text-left px-4 flex items-center ' onClick={() => deleteColumn()}>
                        <span className="material-symbols-rounded text-lg font-light mr-4">
                            delete
                        </span>
                        Delete Field
                    </div>
                </div>
            )}
        </div>
    )
}
