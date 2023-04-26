import React, { useState } from 'react';

function IndeterminateCheckbox({
  data,
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);

  const [isHover, setIsHover] = useState(false);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
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
        className={className + ' cursor-pointer'}
        {...rest}
      />
    );
  }

  return data ? (
    <div
      className='hover:bg-blue-50 w-full h-full flex items-center justify-center cursor-pointer'
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {!isHover && !rest.checked ? (
        <div>{parseInt(data?.id) + 1}</div>
      ) : (
        customInput()
      )}
    </div>
  ) : (
    customInput()
  );
}

export default IndeterminateCheckbox;
