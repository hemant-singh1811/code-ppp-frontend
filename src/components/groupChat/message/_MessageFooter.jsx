import React from 'react'
import _ProfileImage from './_ProfileImage'


export default function _MessageFooter({ setActivePage, activePage }) {
    const options = ["chat", "dispatch", "payroll", "location", "document"];
    const handelActivePage = (e) => {
        setActivePage(e);
    };
    return (
        <div className="bg-white w-full flex flex-col">
            <div className="flex gap-1 p-1">
                {options.map((element, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-3 py-1 hover:bg-gray-800 rounded-md capitalize hover:text-white ${element === activePage ? "bg-black text-white" : ""
                                }`}
                            onClick={() => handelActivePage(element)}
                        >
                            {element}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
