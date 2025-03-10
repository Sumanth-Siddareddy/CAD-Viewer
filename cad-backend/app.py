from flask import Flask, request, jsonify
from flask import send_from_directory
from flask_cors import CORS
from stl import mesh
from werkzeug.utils import secure_filename
import os
import numpy as np

app = Flask(__name__)
CORS(app)

# Define the folder where uploaded files will be stored
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'stl', 'obj'}

# Root endpoint for testing the server
@app.route('/')
def hello():
    return "Hello, Flask Backend!"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# File upload endpoint
@app.route('/upload', methods=['POST'])
def upload_file():
    # print(request.files['model'])
    if 'model' not in request.files:
        return jsonify({'error': 'No file part in the request. Key name should be model and type is file.'}), 400

    file = request.files['model']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed. Please upload a .stl or .obj file.'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

@app.route('/model/<filename>', methods=['GET'])
def get_model(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

import numpy as np
from stl import mesh

@app.route('/convert', methods=['GET'])
def convert_file():
    """
    Converts an uploaded CAD file between STL and OBJ formats.
    Query Parameters:
      - filename: the name of the uploaded file (e.g., 'model.stl' or 'model.obj')
      - format: the target format, either 'obj' or 'stl'
    """
    filename = request.args.get('filename')
    target_format = request.args.get('format', '').lower()
    
    if not filename or not target_format:
        return jsonify({'error': 'Missing filename or target format parameter'}), 400

    source_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(source_path):
        return jsonify({'error': 'Source file not found'}), 404

    source_extension = filename.rsplit('.', 1)[1].lower()

    # Conversion: STL -> OBJ
    if source_extension == 'stl' and target_format == 'obj':
        try:
            # Load the STL file using numpy-stl
            stl_mesh = mesh.Mesh.from_file(source_path)
            # Collect all vertices from the STL triangles
            vertices = np.concatenate([stl_mesh.v0, stl_mesh.v1, stl_mesh.v2], axis=0)
            # Get unique vertices and remap indices
            vertices_unique, indices = np.unique(vertices, axis=0, return_inverse=True)
            faces = indices.reshape(-1, 3)

            # Build the OBJ file content
            obj_lines = []
            for v in vertices_unique:
                obj_lines.append("v {} {} {}".format(v[0], v[1], v[2]))
            for face in faces:
                # OBJ vertex indices start at 1
                obj_lines.append("f {} {} {}".format(face[0] + 1, face[1] + 1, face[2] + 1))
            obj_content = "\n".join(obj_lines)
            # Create the OBJ filename by replacing the extension
            obj_filename = filename.rsplit('.', 1)[0] + '.obj'
            obj_path = os.path.join(app.config['UPLOAD_FOLDER'], obj_filename)
            # Write the OBJ file
            with open(obj_path, 'w') as f:
                f.write(obj_content)
            return send_from_directory(app.config['UPLOAD_FOLDER'], obj_filename, as_attachment=True)
        except Exception as e:
            return jsonify({'error': 'Conversion from STL to OBJ failed', 'details': str(e)}), 500

    # Conversion: OBJ -> STL
    elif source_extension == 'obj' and target_format == 'stl':
        try:
            # Read the OBJ file and parse vertices and faces
            with open(source_path, 'r') as f:
                lines = f.readlines()

            vertices = []
            faces = []
            for line in lines:
                if line.startswith("v "):
                    parts = line.split()
                    # Expecting format: "v x y z"
                    vertices.append([float(parts[1]), float(parts[2]), float(parts[3])])
                elif line.startswith("f "):
                    parts = line.split()
                    face_indices = []
                    for p in parts[1:]:
                        # OBJ face entries can be in the form "index" or "index/..."
                        vertex_index = p.split('/')[0]
                        face_indices.append(int(vertex_index) - 1)  # Convert to zero-based index
                    if len(face_indices) < 3:
                        continue
                    # If the face is a polygon (more than 3 vertices), use fan triangulation
                    if len(face_indices) == 3:
                        faces.append(face_indices)
                    else:
                        for i in range(1, len(face_indices) - 1):
                            faces.append([face_indices[0], face_indices[i], face_indices[i+1]])

            if not vertices or not faces:
                return jsonify({'error': 'Invalid or empty OBJ file'}), 400

            # Create an array of triangles for the STL file
            triangles = []
            for face in faces:
                triangle = [vertices[face[0]], vertices[face[1]], vertices[face[2]]]
                triangles.append(triangle)
            triangles = np.array(triangles)

            # Create a new mesh for the STL using numpy-stl
            stl_mesh = mesh.Mesh(np.zeros(triangles.shape[0], dtype=mesh.Mesh.dtype))
            for i, triangle in enumerate(triangles):
                stl_mesh.v0[i] = triangle[0]
                stl_mesh.v1[i] = triangle[1]
                stl_mesh.v2[i] = triangle[2]

            # Create the STL filename by replacing the extension
            stl_filename = filename.rsplit('.', 1)[0] + '.stl'
            stl_path = os.path.join(app.config['UPLOAD_FOLDER'], stl_filename)
            stl_mesh.save(stl_path)
            return send_from_directory(app.config['UPLOAD_FOLDER'], stl_filename, as_attachment=True)
        except Exception as e:
            return jsonify({'error': 'Conversion from OBJ to STL failed', 'details': str(e)}), 500

    else:
        return jsonify({'error': 'Conversion not supported for the provided file and target format'}), 400


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join('client_build', path)):
        return send_from_directory('client_build', path)
    else:
        return send_from_directory('client_build', 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
