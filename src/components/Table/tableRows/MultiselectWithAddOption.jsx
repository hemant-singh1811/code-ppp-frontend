import { useState } from 'react';

export default function MultiselectWithAddOption() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setSelectedOptions(selectedValues);
    };

    const handleInputChange = (event) => {
        setNewOption(event.target.value);
    };

    const handleAddOption = () => {
        if (newOption && !options.includes(newOption)) {
            setOptions([...options, newOption]);
            setSelectedOptions([...selectedOptions, newOption]);
            setNewOption('');
        }
    };

    return (
        <div className="flex flex-col w-64">
            <label htmlFor="multiselect" className="mb-1 font-bold text-gray-700">
                Select one or more options:
            </label>
            <div className="relative">
                <select
                    id="multiselect"
                    multiple
                    className="w-full h-24 py-2 pl-3 pr-8 text-base border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOptions}
                    onChange={handleSelectChange}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 5a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 15a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <div className="mt-2 flex items-center">
                <input
                    type="text"
                    className="w-full py-2 pl-3 pr-8 text-base border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a new option"
                    value={newOption}
                    onChange={handleInputChange}
                />
                <button
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleAddOption}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
