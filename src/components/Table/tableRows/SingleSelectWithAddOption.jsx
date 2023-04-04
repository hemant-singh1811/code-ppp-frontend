// import { useState } from 'react';

// export default function SingleSelectWithAddOption() {
//     const [selectedOption, setSelectedOption] = useState('');
//     const [newOption, setNewOption] = useState('');
//     const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

//     const handleSelectChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     const handleInputChange = (event) => {
//         setNewOption(event.target.value);
//     };

//     const handleAddOption = () => {
//         if (newOption && !options.includes(newOption)) {
//             setOptions([...options, newOption]);
//             setSelectedOption(newOption);
//             setNewOption('');
//         }
//     };

//     return (
//         <div className="flex flex-col w-64">
//             <label htmlFor="select" className="mb-1 font-bold text-gray-700">
//                 Select an option:
//             </label>
//             <div className="relative">
//                 <select
//                     id="select"
//                     className="w-full py-2 pl-3 pr-8 text-base border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={selectedOption}
//                     onChange={handleSelectChange}
//                 >
//                     {options.map((option) => (
//                         <option key={option} value={option}>
//                             {option}
//                         </option>
//                     ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <svg
//                         className="w-5 h-5 text-gray-400"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5 5a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 15a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                 </div>
//             </div>
//             <div className="mt-2 flex items-center">
//                 <input
//                     type="text"
//                     className="w-full py-2 pl-3 pr-8 text-base border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter a new option"
//                     value={newOption}
//                     onChange={handleInputChange}
//                 />
//                 <button
//                     className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onClick={handleAddOption}
//                 >
//                     Add
//                 </button>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";

function SingleSelectWithAddOption() {
    const [selectedOption, setSelectedOption] = useState("");
    const [newOption, setNewOption] = useState("");
    const [options, setOptions] = useState([
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [randomColor, setRandomColor] = useState("");

    // Updates selected option when user changes select input
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Updates new option input when user types in "Add" field
    const handleInputChange = (e) => {
        setNewOption(e.target.value);
    };

    // Adds new option to list and sets as selected option when user clicks "Add" button
    const handleAddOption = () => {
        if (newOption.trim() !== "" && !options.includes(newOption)) {
            setOptions([...options, newOption]);
            setSelectedOption(newOption);
            setNewOption("");
        }
    };

    // Updates search term input when user types in search field
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filters options based on search term input
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Generates random color for select
    const getRandomColor = () => {
        const colors = [
            "red",
            "blue",
            "green",
            "yellow",
            "purple",
            "pink",
            "orange",
            "teal",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    // Sets random color for select
    const handleColorChange = () => {
        setRandomColor(getRandomColor());
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative">
                <select
                    className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring ${randomColor}`}
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    {filteredOptions.map((option, i) => (
                        i === 0 ? <input type={"text"} placeholder="hello" /> :
                            <option key={option} value={option}>
                                {option}
                            </option>
                    ))}
                </select>
                <div
                    className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${randomColor}`}
                >
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 6a2 2 0 012-2h16a2 2 0 110 4H2a2 2 0 01-2-2zm0 8a2 2 0 012-2h16a2 2 0 110 4H2a2 2 0 01-2-2z"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <label htmlFor="add-option" className={`mr-4 ${randomColor}`}>
                    Add option:
                </label>
                <input
                    id="add-option"
                    className={`block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring ${randomColor}`}
                    type="text"
                    placeholder="Type to add option"
                    value={newOption}
                    onChange={handleInputChange}
                />
                <button
                    className={`ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${randomColor}`}
                    onClick={handleAddOption}
                >
                    Add
                </button>
            </div>
            <div className="mt-4 relative">
                <input
                    className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring ${randomColor}`}
                    type="text"
                    placeholder="Search options"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <div
                    className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${randomColor}`}
                >
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.293 13.707a1 1 0 001.414-1.414l-1.22-1.22a6.5 6.5 0 111.414-1.414l1.22 1.22a1 1 0 001.414-1.414l-1.22-1.22a8.5 8.5 0 10-1.414 1.414l1.22 1.22a1 1 0 001.414 0z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 14a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 110-8 4 4 0 010 8z"
                        />
                    </svg>
                </div>
            </div>
            <button
                className={`mt-4 bg-${randomColor}-500 font-semibold py-2 px-4 border border-${randomColor}-400 rounded shadow`}
                onClick={() => {
                    handleAddOption()
                    handleColorChange()
                }}
                disabled={!selectedOption}
            >
                Select
            </button>
        </div>
    );
}

export default SingleSelectWithAddOption;



// import React, { useState } from "react";

// function SingleSelectWithAddOption() {
//     const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
//     const [newOption, setNewOption] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedOption, setSelectedOption] = useState("");

//     const randomColor = `text-${["red", "yellow", "green", "blue"][Math.floor(Math.random() * 4)]}-500`;

//     const handleInputChange = (event) => {
//         setNewOption(event.target.value);
//     };

//     const handleAddOption = () => {
//         if (newOption.trim() === "") return;
//         setOptions([...options, newOption.trim()]);
//         setNewOption("");
//     };

//     const handleSearchInputChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleSelectOption = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     const filteredOptions = options.filter((option) =>
//         option.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="relative">
//             <div className="inline-flex">
//                 {filteredOptions.map((option) => (
//                     <button
//                         key={option}
//                         className={`mr-2 mb-2 px-2 py-1 text-white rounded-full ${option === selectedOption ? `bg-${randomColor}` : `bg-gray-500 hover:bg-${randomColor}`}`}
//                         onClick={() => setSelectedOption(option)}
//                     >
//                         {option}
//                     </button>
//                 ))}
//             </div>
//             <div className="flex items-center mt-4">
//                 <label htmlFor="add-option" className={`mr-4 ${randomColor}`}>
//                     Add option:
//                 </label>
//                 <input
//                     id="add-option"
//                     className={`block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring ${randomColor}`}
//                     type="text"
//                     placeholder="Type to add option"
//                     value={newOption}
//                     onChange={handleInputChange}
//                 />
//                 <button
//                     className={`ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${randomColor}`}
//                     onClick={handleAddOption}
//                 >
//                     Add
//                 </button>
//             </div>
//             <div className="mt-4 relative">
//                 <input
//                     className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring ${randomColor}`}
//                     type="text"
//                     placeholder="Search options"
//                     value={searchTerm}
//                     onChange={handleSearchInputChange}
//                 />
//                 <div
//                     className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ${randomColor}`}
//                 >
//                     <svg
//                         className="fill-current h-4 w-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M14.293 13.707a1 1 0 001.414-1.414l-1.22-1.22a6.5 6.5 0 111.414-1.414l1.22 1.22a1
//       1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414l1.293-1.293V18a1 1 0 102 0v-4.586l1.293 1.293z"
//                         />
//                     </svg>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SingleSelectWithAddOption;