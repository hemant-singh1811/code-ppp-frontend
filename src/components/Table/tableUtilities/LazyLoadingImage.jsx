import { useState } from 'react';
import Loading from '../../utilities/Loading';

function LazyLoadingImage({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleLoad() {
    setIsLoading(false);
  }

  function handleError(e) {
    setIsLoading(false);
    setError(e);
  }

  return (
    <div className='relative h-full w-full'>
      {/* {!isLoading && ( */}
      <img
        src={src}
        alt='Thumbnail'
        className={`h-full w-full object-contain rounded-md ${
          isLoading ? 'opacity-50' : ''
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {/* )} */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center z-50'>
          <Loading />
        </div>
      )}

      {error && (
        <div className='absolute inset-0 flex items-center justify-center text-red-500 font-bold'>
          Error: {error.message}
        </div>
      )}
    </div>
  );
}

export default LazyLoadingImage;
