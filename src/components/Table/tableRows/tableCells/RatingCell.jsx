import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import classNames from "classnames";

export default function RatingCell({ cell }) {
  const socket = useSelector((state) => state.socketWebData.socket);
  const [value, setValue] = useState(cell?.getValue() || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const { table, activeNumberOfLines } = useContext(TableContext);
  const { selectedBaseId, selectedTableId } = useSelector(
    (state) => state.globalState
  );
  const userToken = useSelector((state) => state.auth.userInfo?.userToken);
  function handleClick() {
    setIsEditMode(true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleBlur() {
    console.log("blur");
    setIsEditMode(false);

    if (cell.getValue() !== value) {
      let newRowPart = value;

      let rowObj = {
        userToken: userToken,
        data: {
          baseId: selectedBaseId,
          tableId: selectedTableId,
          recordId: cell?.row?.original.id52148213343234567,
          updatedData: newRowPart,
          fieldType: cell.column.columnDef.fieldType,
          fieldId: cell.column.columnDef.fieldId,
        },
      };

      socket.emit("updateData", rowObj, (response) => {
        table.options.meta?.updateData(
          cell.row.index,
          cell.column.id,
          value,
          response.metaData
        );
        console.log("res : ", response);
      });
    }
  }

  const [rating, setRating] = useState(cell?.getValue() || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (newRating) => {
    if (rating === newRating) {
      setRating(0);
      setValue(0);
    } else {
      setRating(newRating);
      setValue(newRating);
    }
  };

  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const renderStars = () => {
    const stars = [];
    for (
      let i = 1;
      i <= cell.column.columnDef.ratingFieldOptions.ratingFormat;
      i++
    ) {
      const starClassesSvg = classNames("star", {
        "text-blue-400 w-6 h-6 cursor-pointer fill-blue-400 hover:text-blue-300 hover:fill-blue-300":
          i <= rating || i <= hoverRating,
        "text-gray-300 fill-gray-300 w-6 h-6 cursor-pointer":
          i > rating && i > hoverRating,
      });
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarHover(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={starClassesSvg}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      tabIndex={-1}
      onClick={handleClick}
      onBlur={handleBlur}
      className="flex px-2 py-1 overflow-hidden"
    >
      {renderStars()}
    </div>
  );
}
