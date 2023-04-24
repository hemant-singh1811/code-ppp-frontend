import { useState } from 'react';

const FileReader = () => {
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleFileUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => {
      return {
        name: file.name,
        type: file.type.split('/')[0],
        data: URL.createObjectURL(file),
      };
    });
    setFiles(filesArray);
    setCurrentFileIndex(0);
  };

  const renderFile = (file) => {
    switch (file.type) {
      case 'image':
        return (
          <img
            className='h-full w-full object-contain'
            src={file.data}
            alt={file.name}
          />
        );
      case 'video':
        return (
          <video controls>
            <source
              src={file.data}
              type={file.type + '/' + file.name.split('.').pop()}
            />
            Your browser does not support the video tag.
          </video>
        );
      case 'pdf':
        return (
          <embed
            data={file.data}
            type='application/pdf'
            // type={file.type + '/' + file.name.split('.').pop()}
            width='100%'
            height='600px'>
            <p>Unable to display PDF. Please download the file to view it.</p>
          </embed>
        );
      case 'audio':
        return (
          <audio controls>
            <source
              src={file.data}
              type={file.type + '/' + file.name.split('.').pop()}
            />
            Your browser does not support the audio tag.
          </audio>
        );
      case 'html':
        return (
          <iframe
            src={file.data}
            title={file.name}
            width='100%'
            height='600px'></iframe>
        );
      case 'doc':
        return (
          <object
            data={file.data}
            type={file.type + '/' + file.name.split('.').pop()}
            width='100%'
            height='600px'>
            <p>
              Unable to display document. Please download the file to view it.
            </p>
          </object>
        );
      case 'csv':
        return (
          <object
            data={file.data}
            type={file.type + '/' + file.name.split('.').pop()}
            width='100%'
            height='600px'>
            <p>Unable to display CSV. Please download the file to view it.</p>
          </object>
        );
      case 'psd':
        return (
          <object
            data={file.data}
            type={file.type + '/' + file.name.split('.').pop()}
            width='100%'
            height='600px'>
            <p>Unable to display PSD. Please download the file to view it.</p>
          </object>
        );
      default:
        return (
          <object
            data={file.data}
            type={file.type + '/' + file.name.split('.').pop()}
            // width='100%'
            // height='600px'
            className='w-full h-full flex items-center justify-center'>
            <p>Unable to display file. Please download the file to view it.</p>
          </object>
        );
    }
  };

  const handlePreviousFile = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextFile = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDownloadFile = () => {
    const a = document.createElement('a');
    a.href = files[currentFileIndex].data;
    a.download = files[currentFileIndex].name;
    a.click();
  };

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex justify-center items-center bg-gray-100 p-4'>
        <input type='file' multiple onChange={handleFileUpload} />
      </div>
      {files.length > 0 && (
        <div className='flex flex-col h-full'>
          <div className='relative h-full'>
            <div className='absolute top-0 bottom-0 left-0 right-0 p-2 flex items-center justify-center'>
              {renderFile(files[currentFileIndex])}
            </div>
          </div>
          <div className='flex justify-between items-center bg-white py-2 px-4'>
            <div>
              <h2 className='text-lg font-bold'>
                {files[currentFileIndex].name}
              </h2>
              <p className='text-sm text-gray-500'>
                {files[currentFileIndex].type}
              </p>
            </div>
            <div>
              <button
                className='text-gray-600 hover:text-gray-900'
                onClick={handleDownloadFile}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='flex justify-between bg-gray-100 py-4 px-8'>
            <button
              className={`rounded-full p-2 bg-white shadow-lg ${
                currentFileIndex === 0 ? 'opacity-25 cursor-not-allowed' : ''
              }`}
              onClick={handlePreviousFile}
              disabled={currentFileIndex === 0}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <div className='flex justify-center items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 15l4-4 4 4m5-8v6h-2.5a2.5 2.5 0 00-2.5 2.5v5H7v-5a2.5 2.5 0 00-2.5-2.5H2V7h5z'
                />
              </svg>
            </div>
            <button
              className={`rounded-full p-2 bg-white shadow-lg ${
                currentFileIndex === files.length - 1
                  ? 'opacity-25 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleNextFile}
              disabled={currentFileIndex === files.length - 1}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileReader;
