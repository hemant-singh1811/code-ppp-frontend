import React from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";

export default function TableColumnAdd() {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const addColumnRef = React.useRef();
    // Call hook passing in the ref and a function to call on outside click

    const [addColumnToggle, setAddColumnToggle] = React.useState(false);

    useDetectOutsideClick(addColumnRef, () => setAddColumnToggle(false));

    const [descriptionToggle, setDescriptionToggle] = React.useState(false);

    let fieldsType = [
        "Link to another record",
        "Single line text",
        "Long text",
        "Attachment",
        "Checkbox",
        "Multiple select",
        "User",
        "Date",
        "Phone number",
        "Email",
        "URL",
        "Created time",
        "Last modified time",
        "Created by",
        "Last modified by",
        "Autonumber",
        "button",
    ];

    let correspondingType = [
        "Link to another record",
        "string",
        "paragraph",
        "file",
        "boolean",
        "array",
        "array",
        "date",
        "number",
        "string",
        "string",
        "time",
        "time",
        "user",
        "user",
        "number",
        "string",
    ];

    console.log("s : ", fieldsType.length);

    console.log("s : ", correspondingType.length);

    for (var i = 0; i < correspondingType.length; i++) {
        console.log("field : ", fieldsType[i], " -> type : ", correspondingType[i]);
    }

    return (
        <div className="relative ref={addColumnRef}">
            <div className={`th bg-[#f5f5f5] border-r-[1px] mr-2`}>
                <div
                    onClick={() => setAddColumnToggle(!addColumnToggle)}
                    className="capitalize text-left text-lg font-normal select-none px-2 truncate w-[100px] flex justify-center items-center cursor-pointer"
                >
                    <span className="material-symbols-rounded">add</span>
                </div>
            </div>

            {addColumnToggle && (
                <div className="text-black absolute top-[30px] bg-white w-96 rounded-md right-2 p-4 border-gray-400 border-2 flex flex-col">
                    <input
                        type="text"
                        placeholder="Field Name (Optional)"
                        className="w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf]"
                    />

                    <div className="h-60 mt-2 border-[#eaebed] border-2 rounded-md  overflow-hidden">
                        <input
                            type="search"
                            name=""
                            id=""
                            className="bg-[#f0f1f3] w-full px-3 p-1.5  outline-none "
                            placeholder="Find a field type"
                        />
                        <div className="h-52 overflow-scroll p-1 px-1.5">
                            {fieldsType.map((field) => {
                                return (
                                    <div className="px-2 p-1.5 cursor-pointer hover:bg-blue-100 rounded-md">
                                        {field}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {descriptionToggle && (
                        <div className="mt-4">
                            <div className="mb-1">Description</div>
                            <input
                                type="text"
                                className="px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-sm"
                                placeholder="Describe this field (optional)"
                            />
                        </div>
                    )}
                    <div className="flex  justify-between items-center mt-8">
                        <div>
                            <div
                                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${descriptionToggle && "hidden"
                                    } `}
                                onClick={() => setDescriptionToggle(true)}
                            >
                                <span className="material-symbols-rounded text-xl">add</span>{" "}
                                Add description
                            </div>
                        </div>
                        <div
                            className="hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer"
                            onClick={() => {
                                setDescriptionToggle(false);
                                setAddColumnToggle(!addColumnToggle);
                            }}
                        >
                            cancel
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}