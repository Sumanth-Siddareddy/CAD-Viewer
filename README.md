# CAD Viewer Application

A basic web-based CAD viewer that can import, display, and manipulate simple 3D models (e.g., STL or OBJ files). This full-stack project was developed as a technical assignment for a Full-Stack Engineering Intern role at insyde.io.

## Features

- **File Upload:**  
  - Upload STL or OBJ files using a simple React-based UI.
  
- **3D Model Viewing:**  
  - Render 3D models in the browser using Three.js.
  - Use OrbitControls for rotating, zooming, and panning the model.
  
- **Model Conversion:**  
  - Convert models between STL and OBJ formats (both STL → OBJ and OBJ → STL).
  - Download the converted file directly from the interface.
  
- **User-Friendly Interface:**  
  - Clean design with clear instructions.
  - Responsive viewer area with a frame and helpful notes.

- **Backend API:**  
  - Built with Flask to handle file upload, retrieval, and conversion.
  - Endpoints include `/upload`, `/model/<filename>`, and `/convert`.
  - Use CAD Viewer.postman_collection.json file to test API using Postman. Import the file and check routes

## Demo Video

Watch the demo video explaining the approach and key features of this project:  
[![Demo Video](/cad-viewer/public/CAD-Viewer-application-picture.jpg)](https://drive.google.com/file/d/your_google_drive_video_link/view)

*Note: Replace `your_video_id` with your actual YouTube video ID (if applicable) or update the link to your Google Drive video.*

## Local Setup Instructions

### Prerequisites

Make sure you have installed:
- **Python 3.x**
- **Node.js and npm**
- **Git**

### Open command prompt then perform below commands
### Backend Setup (Flask API)

1. **Clone the repository:**

   ```
   git clone https://github.com/Sumanth-Siddareddy/CAD-Viewer
   ```
   ```
   cd CAD-Viewer/cad-backend
   ```

2. **Set up a virtual environment:** 
    ```
      python -m venv venv
    ```
3. **Activate the virtual environment:** 
      ```
      Windows : venv\Scripts\activate
      ```
      ```
      macOS/Linux : source venv/bin/activate
      ```
5. **Install required packages:** 
    ```
      pip install -r requirements.txt
    ```
6. **Run the Flask server:** 
    ```
      python app.py
    ```
   
### Frontend Setup (React Application)
1. **Navigate to the React project folder:** 
    ```
      cd ../cad-viewer
    ```
2. **Install dependencies:** 
    ```
      npm install
    ```
3. **Start the React application:** ( Install nodemon if you are using nodemon )
    ```
      nodemon start
    ```
    ```
      npm start
    ```

### Project Structure
    CAD-Viewer-WebApp/
    ├── CAD Viewer.postman_collection.json
    ├── cad-backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   └── uploads/
    └── cad-viewer/
        ├── public/
        ├── src/
        │   ├── App.js
        │   ├── App.test.js
        │   ├── App.css
        │   ├── index.js
        │   ├── index.css
        │   ├── CADViewer.js
        │   ├── FileUpload.js
        │   └── ConvertDownload.js
        ├── package-lock.json
        └── package.json

### Technologies Used
      Frontend: React, Three.js, OrbitControls
      Backend: Flask, Gunicorn, numpy-stl
      Conversion Functionality: Custom endpoints to convert between STL and OBJ formats
