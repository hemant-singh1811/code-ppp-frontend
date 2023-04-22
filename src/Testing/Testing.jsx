import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import FileReader from '../components/Table/tableUtilities/FileReader';
import FileReaderComponent from '../components/Table/tableUtilities/FileReader';

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);

  const handleFileSelect = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    const storage = getStorage();
    const promises = [];
    let totalSize = 0;

    console.log(files);

    for (const file of files) {
      totalSize += file.size;
      console.log(file);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      promises.push(uploadTask);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.error(error);
        }
      );
    }

    setUploadTask(promises);

    Promise.all(promises)
      .then(() => {
        setFiles([]);
        setUploadProgress(0);
        console.log('Upload complete!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelUpload = () => {
    for (const task of uploadTask) {
      task.cancel();

      setFiles([]);
      setUploadProgress(0);
      console.log('Upload canceled!');
    }
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleCancelUpload}>Cancel</button>
      <p>Upload progress: {uploadProgress}%</p>
      <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
        <div
          className='bg-blue-600 h-2.5 rounded-full'
          style={{ width: uploadProgress + '%' }}></div>
      </div>
    </div>
  );
}

export default function Testing() {
  return <FileReaderComponent />;
}
