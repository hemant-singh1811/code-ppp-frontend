import React, { useContext, useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
// const socket = io(import.meta.env.VITE_SERVER_URL + "webdata");

export default function MultiselectWithAddOption({ columnData, rowData }) {
    // const { columns } = useContext(TableContext);
    const { selectedTableId } = useSelector(state => state.globalState)
    // Create a ref that we add to the element for which we want to detect outside clicks
    const singleSelectRef = React.useRef();
    // Call hook passing in the ref and a function to call on outside click
    const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
    useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));

    const [options, setOptions] = useState([
    ]);

    // {
    //   type: "",
    //     table_id: "",
    //       field_id: "",
    //         obj: {


    //   }

    // }
    // console.log(columnData)
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
            options: options
        }
    }

    useEffect(() => {
        // socket.emit("updatemetadata", obj, (response) => {
        //     console.log("socket response: " + JSON.stringify(response));
        //     // console.log("res from server : ", response.message);
        // });
        console.log("object", obj)
    }, [obj])

    const [searchTerm, setSearchTerm] = useState("");
    const [randomColor, setRandomColor] = useState("");

    // Generates random color for select
    const getRandomColor = () => {
        const colors = [
            "pink"
            // "red",
            // "blue",
            // "green",
            // "yellow",
            // "purple",
            // "pink",
            // "orange",
            // "teal",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    // Sets random color for select
    //   const handleColorChange = () => {};
    useEffect(() => {
        setRandomColor(getRandomColor());
    }, []);

    return (
        <div
            className="relative select-none h-full w-full z-0"
            ref={singleSelectRef}
        >
            <div
                onClick={() => setSingleSelectToggle(!SingleSelectToggle)}
                tabIndex={-1}
                className="bg-white border    w-full rounded-md cursor-pointer flex items-center px-2 justify-between "
            >
                {options.map(({ name, color, isSelected }, i) => {
                    if (isSelected)
                        return (
                            <div
                                key={i}
                                className={`rounded-3xl px-2 truncate `}
                                style={{ background: color }}
                            >
                                {name}
                            </div>
                        );
                })}

                <span className="material-symbols-rounded text-blue-500 ml-auto">
                    keyboard_arrow_down
                </span>
            </div>
            {SingleSelectToggle && (
                <div
                    className="absolute left-0 top-10 w-full max-h-[300px] bg-white rounded-md shadow-lg min-w-[200px]"
                    style={{ zIndex: 1000 }}
                >
                    <input
                        // onClick={() => setSingleSelectToggle(true)}
                        type="text"
                        name="search option"
                        id=""
                        placeholder="find an option"
                        className="w-full outline-none p-2"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <div>
                        {options
                            .filter(({ name }) => name?.includes(searchTerm))
                            .map(({ color, isSelected, name }, i) => {
                                return (
                                    <div

                                        onClick={() => {
                                            setOptions((prev) => {
                                                return prev.map((prevMap) => {
                                                    if (name === prevMap.name) {
                                                        prevMap.isSelected = true;
                                                    } else {
                                                        prevMap.isSelected = false;
                                                    }
                                                    return prevMap;
                                                });
                                            });
                                            setSingleSelectToggle(!SingleSelectToggle);
                                        }}
                                        key={i}
                                        className="p-2 hover:bg-blue-100 flex min-h-[30px] w-full"
                                    >
                                        {name && (
                                            <div
                                                style={{ background: color }}
                                                className={`rounded-xl px-2 border-black border-[0.1px] truncate`}
                                            >
                                                {name}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        {options.filter(({ name }) => name?.includes(searchTerm)).length ===
                            0 && (
                                <div
                                    onClick={() => {
                                        setOptions((prev) => {
                                            let newdata = prev.map((prevMap) => {
                                                prevMap.isSelected = false;
                                                return prevMap;
                                            });

                                            newdata.push({
                                                name: searchTerm,
                                                isSelected: true,
                                                color: randomColor,
                                            });
                                            return newdata;
                                        });

                                        setSearchTerm("");
                                        setSingleSelectToggle(!SingleSelectToggle);
                                    }}
                                    className="p-2 hover:bg-blue-100 flex truncate"
                                >
                                    <div className="truncate flex">
                                        Add New Option:
                                        <span
                                            style={{ background: randomColor }}
                                            className={`rounded-xl px-2 ml-1 truncate`}
                                        >
                                            {searchTerm}
                                        </span>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}