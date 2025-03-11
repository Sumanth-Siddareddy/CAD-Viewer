import React, { useState } from 'react';
import FileUpload from './FileUpload';
import CADViewer from './CADViewer';
import ConvertDownload from './ConvertDownload';
import './App.css';

function App() {
  const [uploadedFilename, setUploadedFilename] = useState('');

  return (
    <div className="container">
      <h1 className="header">CAD Viewer</h1>
      <div className="upload-section">
        <FileUpload onUploadSuccess={setUploadedFilename} />
      </div>
      {uploadedFilename && (
        <div className="viewer-wrapper">
          <h2>Viewing: {uploadedFilename}</h2>
          <div className="viewer-container">
            <CADViewer filename={uploadedFilename} />
          </div>
          <p className="instructions">
            <strong>Note:</strong> Use your mouse wheel to zoom in/out and double click &amp; drag the object to rotate.
            (The model may appear small by default, so please zoom in to view details.)
          </p>
          <ConvertDownload uploadedFilename={uploadedFilename} />
          <p class="instructions">Click the convert button to convert and download file</p>
        </div>
      )}
    </div>
  );
}

export default App;
