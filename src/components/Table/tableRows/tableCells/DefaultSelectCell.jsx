import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableContext } from "../../tableComponents/TableComponents";
import { handleFormModal } from "../../../../store/features/globalStateSlice";

function DefaultSelectCell({
  rowIndex,
  data,
  indeterminate,
  className = "",
  ...rest
}) {
  const ref = React.useRef(null);
  const { rowsUtility } = useSelector((state) => state.globalState);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();

  const { selectedColorCondition } = useContext(TableContext);
  const columns = useContext(TableContext).columns;
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      if (ref?.current?.indeterminate) {
        ref.current.indeterminate = !rest?.checked && indeterminate;
      }
    }
  }, [ref, indeterminate]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  function customInput() {
    return (
      <input
        type='checkbox'
        ref={ref}
        className={className + " cursor-pointer"}
        {...rest}
      />
    );
  }

  // console.log(selectedColorCondition);

  return (
    <div
      className='flex h-full items-start'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='h-full cursor-not-allowed hover:bg-gray-100 min-w-[20px]'>
        {isHover && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 96 960 960'
            height='20'
            width='20'
            className='fill-gray-300 my-1 '
          >
            <path d='M360 896q-33 0-56.5-23.5T280 816q0-33 23.5-56.5T360 736q33 0 56.5 23.5T440 816q0 33-23.5 56.5T360 896Zm240 0q-33 0-56.5-23.5T520 816q0-33 23.5-56.5T600 736q33 0 56.5 23.5T680 816q0 33-23.5 56.5T600 896ZM360 656q-33 0-56.5-23.5T280 576q0-33 23.5-56.5T360 496q33 0 56.5 23.5T440 576q0 33-23.5 56.5T360 656Zm240 0q-33 0-56.5-23.5T520 576q0-33 23.5-56.5T600 496q33 0 56.5 23.5T680 576q0 33-23.5 56.5T600 656ZM360 416q-33 0-56.5-23.5T280 336q0-33 23.5-56.5T360 256q33 0 56.5 23.5T440 336q0 33-23.5 56.5T360 416Zm240 0q-33 0-56.5-23.5T520 336q0-33 23.5-56.5T600 256q33 0 56.5 23.5T680 336q0 33-23.5 56.5T600 416Z' />
          </svg>
        )}
      </div>
      {data ? (
        <div
          className='min-w-[20px] h-full  flex items-start justify-start cursor-pointer pt-1'
          {...rest}
        >
          {!isHover && !rest.checked ? (
            <div className=''>{parseInt(data.id) + 1}</div>
          ) : (
            <div className='mt-0.5'>{customInput()}</div>
          )}
        </div>
      ) : (
        customInput()
      )}
      <div className='flex justify-center h-full mr-1 py-1 items-center'>
        <div
          className=' w-2 h-full   rounded-md'
          style={{
            background:
              selectedColorCondition?.option &&
              selectedColorCondition?.option[
                data.original[selectedColorCondition?.name]
              ],
          }}
        ></div>
      </div>
      <div className='h-full min-w-[21px] cursor-pointer'>
        {isHover && (
          <div
            className='p-1 my-1 mr-1 bg-blue-100 rounded-full'
            onClick={(e) =>
              dispatch(
                handleFormModal({ isOpen: true, data, columns, id: data.id })
              )
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='blue'
              className='w-3 h-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default DefaultSelectCell;
