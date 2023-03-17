import React from 'react'

export default function TableColumnDropDown() {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const columnDropdownRef = React.useRef();
    // Call hook passing in the ref and a function to call on outside click
    // const location = useLocation();
    // const { columns, setColumns } = useContext(TableContext);

    const [columnDropdownToggle, setColumnDropdownToggle] = React.useState(false);
    return (
        <div ref={columnDropdownRef} className="relative ref={addColumnRef}">

            <div className="text-gray-400 -mr-2 cursor-pointer hover:text-blue-800 ">
                <span className="material-symbols-rounded font-light" onClick={() => setColumnDropdownToggle(!columnDropdownToggle)}>
                    expand_more
                </span>
            </div>

            {columnDropdownToggle && (
                <div className="text-black absolute top-[30px] bg-white w-96 rounded-md right-2 p-4 border-gray-400 border-2 flex flex-col">hello</div>
            )}
        </div>
    )
}
