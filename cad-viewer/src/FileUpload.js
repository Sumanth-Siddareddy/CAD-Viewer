// src/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('model', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setUploadMessage(data.message);
        onUploadSuccess(data.filename); // notify parent component of the uploaded file name
      } else {
        setUploadMessage(data.error || 'Upload failed.');
      }
    } catch (error) {
      setUploadMessage('An error occurred during the upload.');
    }
  };

  return (
    <div>
      <input class="chooseFile" type="file" onChange={handleFileChange} accept=".stl,.obj" />
      <button onClick={handleUpload}>Upload Model</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;
