import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAddTableColumnMutation } from "../../../store/services/alphaTruckingApi";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";


export default function AddTable() {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const addColumnRef = React.useRef();
    // Call hook passing in the ref and a function to call on outside click
    const location = useLocation();

    const [addColumnToggle, setAddColumnToggle] = React.useState(true);

    useDetectOutsideClick(addColumnRef, () => setAddColumnToggle(false));


    const [fieldSearchInput, setFieldSearchInput] = React.useState("");

    const [fieldNameInput, setFieldNameInput] = React.useState("");

    const [isExistFieldNameInput, setIsExistFieldNameInput] = React.useState(false)

    const [fieldDescriptionInput, setFieldDescriptionInput] = React.useState("");

    const [selectedFieldType, setSelectedFieldType] = React.useState(undefined)

    const [addColumnApi, { isLoading, error, data }] = useAddTableColumnMutation()

    const existingColumns = new Map();


    return (
        <div className="">
            {addColumnToggle && (
                <div className="text-black absolute bottom-[0px] z-50 bg-white w-96 rounded-md left-0 p-4 border-gray-400 border-2 flex flex-col">
                    <input
                        type="text"
                        placeholder="Table Name (Mandatory)"
                        className="w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf]"
                        value={fieldNameInput}
                        onChange={(e) => {
                            setFieldNameInput(e.target.value);
                            existingColumns.get(e.target.value.toLocaleLowerCase()) ? setIsExistFieldNameInput(true) : setIsExistFieldNameInput(false)
                        }}
                    />
                    {
                        isExistFieldNameInput && <div className="text-red-700 text-sm m-1 ">Please enter a unique field name</div>
                    }

                    {
                        selectedFieldType &&
                        <div className="m-1">A single line of text. You can optionally prefill each new cell with a default value:</div>
                    }

                    {AddTableToggle && (
                        <div className="mt-4">
                            <div className="mb-1">Description</div>
                            <input
                                type="text"
                                className="px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-sm"
                                placeholder="Describe this field (optional)"
                                value={fieldDescriptionInput}
                                onChange={(e) => setFieldDescriptionInput(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="flex  justify-between items-center mt-8">
                        <div>
                            <div
                                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${AddTableToggle && "hidden"
                                    } `}
                                onClick={() => setAddTableToggle(true)}
                            >
                                <span className="material-symbols-rounded text-xl">add</span>{" "}
                                Add description
                            </div>
                        </div>
                        <div className="flex items-center gap-2">

                            <div
                                className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                                onClick={() => {
                                    setAddTableToggle(false);
                                    setAddColumnToggle(!addColumnToggle);
                                    setSelectedFieldType(undefined);
                                    setFieldSearchInput("")
                                    setFieldNameInput('')
                                }}
                            >
                                cancel
                            </div>
                            {
                                selectedFieldType && <button disabled={!fieldNameInput || isExistFieldNameInput} onClick={async () => {

                                    await addColumnApi(
                                        {
                                            tableId: location.pathname.split('/')[2],
                                            data:
                                            {
                                                field_description: fieldDescriptionInput,
                                                field_name: fieldNameInput,
                                                field_type: fieldsMap.get(selectedFieldType),
                                            }
                                        }
                                    )

                                    setColumns([...columns, {
                                        field_description: fieldDescriptionInput,
                                        field_name: fieldNameInput,
                                        field_type: fieldsMap.get(selectedFieldType),
                                        accessorKey: fieldNameInput,
                                        id: fieldNameInput,
                                        header: fieldNameInput,
                                    }])

                                    setAddTableToggle(false);
                                    setAddColumnToggle(!addColumnToggle);
                                    setSelectedFieldType(undefined);
                                    setFieldSearchInput("")
                                    setFieldNameInput('')
                                    setFieldDescriptionInput('')
                                }} className="bg-blue-600 rounded-md p-1.5 px-4 text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400">Create Field</button>
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}
