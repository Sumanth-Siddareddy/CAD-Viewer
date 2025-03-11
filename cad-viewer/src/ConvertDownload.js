// src/ConvertDownload.js
import React from 'react';

const ConvertDownload = ({ uploadedFilename }) => {
  const handleConversion = async () => {
    if (!uploadedFilename) return;
    const fileExtension = uploadedFilename.split('.').pop().toLowerCase();
    let targetFormat;
    if (fileExtension === 'stl') {
      targetFormat = 'obj';
    } else if (fileExtension === 'obj') {
      targetFormat = 'stl';
    } else {
      alert("Conversion is not supported for this file type.");
      return;
    }
    const convertURL = `http://127.0.0.1:5000/convert?filename=${uploadedFilename}&format=${targetFormat}`;
    try {
      const response = await fetch(convertURL);
      if (!response.ok) {
        alert("Conversion failed.");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const newFilename = uploadedFilename.replace(/\.[^/.]+$/, "") + '.' + targetFormat;
      a.download = newFilename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Conversion failed: " + error.message);
    }
  };

  const fileExtension = uploadedFilename.split('.').pop().toLowerCase();
  let targetLabel = '';
  if (fileExtension === 'stl') {
    targetLabel = 'OBJ';
  } else if (fileExtension === 'obj') {
    targetLabel = 'STL';
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={handleConversion}>
        Convert to {targetLabel}
      </button>
      
    </div>
  );
};

export default ConvertDownload;
