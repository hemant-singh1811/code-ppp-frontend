import React, { useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";

function SingleSelectWithAddOption() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const singleSelectRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [SingleSelectToggle, setSingleSelectToggle] = React.useState(false);
  useDetectOutsideClick(singleSelectRef, () => setSingleSelectToggle(false));

  const [options, setOptions] = useState([
    { name: "", isSelected: false, color: "green" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomColor, setRandomColor] = useState("");

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
  //   const handleColorChange = () => {};
  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  //   console.log(randomColor);
  // focus:outline focus:outline-blue-500 focus:outline-2

  // <div className="w-full max-w-md mx-auto relative overflow-scroll ">
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
          className="absolute left-0 top-10 w-full max-h-[300px] overflow-x-hidden bg-white rounded-md shadow-lg "
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
                <div className="truncate">
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
// </div>

export default SingleSelectWithAddOption;
