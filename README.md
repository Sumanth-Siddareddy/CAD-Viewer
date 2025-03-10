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

## Demo Video

Watch the demo video explaining the approach and key features of this project:  
[![Demo Video](https://img.youtube.com/vi/your_video_id/0.jpg)](https://drive.google.com/file/d/your_google_drive_video_link/view)

*Note: Replace `your_video_id` with your actual YouTube video ID (if applicable) or update the link to your Google Drive video.*

## Local Setup Instructions

### Prerequisites

Make sure you have installed:
- **Python 3.x**
- **Node.js and npm**
- **Git**

### Backend Setup (Flask API)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your_username/your_repo.git
   cd your_repo/cad-backend
   ```

2. **Set up a virtual environment:** python -m venv venv
3. **Activate the virtual environment:**
    Windows : venv\Scripts\activate
    macOS/Linux : source venv/bin/activate
4. **Install required packages:**pip install -r requirements.txt
5. **Run the Flask server:** python app.py
   
### Frontend Setup (React Application)
1. **Navigate to the React project folder:** cd ../cad-viewer
2. **Install dependencies:** npm install
3. **Start the React application:** npm start or nodemon start ( Install nodemon if you are using nodemon )

### Project Structure
CAD-Viewer/
├── cad-backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── runtime.txt (optional)
│   └── uploads/
└── cad-viewer/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── CADViewer.js
    │   ├── FileUpload.js
    │   ├── ConvertDownload.js
    │   └── App.css
    └── package.json

### Technologies Used
  **Frontend:** React, Three.js, OrbitControls
  **Backend:** Flask, Gunicorn, numpy-stl
  **Conversion Functionality:** Custom endpoints to convert between STL and OBJ formats

### Deployment
You can deploy the backend and frontend separately (e.g., Flask on Heroku and React on Netlify/Vercel) or serve the React build from the Flask backend. For more details, refer to the deployment instructions in the repository.

### License
This project is licensed under the MIT License.

Feel free to adjust the placeholders (like GitHub URLs, video links, and any additional details) to match your project's specifics.
