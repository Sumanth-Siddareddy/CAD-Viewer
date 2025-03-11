// src/CADViewer.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CADViewer = ({ filename }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!filename) return;
  
    const mountNode = mountRef.current; // Capture the current ref value
  
    const width = mountNode.clientWidth;
    const height = mountNode.clientHeight;
  
    // Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountNode.appendChild(renderer.domElement);
  
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
  
    // OrbitControls for rotation, zoom, and pan
    const controls = new OrbitControls(camera, renderer.domElement);
  
    // Choose loader based on file extension
    const fileExtension = filename.split('.').pop().toLowerCase();
    let loader;
    if (fileExtension === 'stl') {
      loader = new STLLoader();
    } else if (fileExtension === 'obj') {
      loader = new OBJLoader();
    } else {
      console.error('Unsupported file format');
      return;
    }
  
    // Construct the URL to fetch the model from the backend
    const fileURL = `http://127.0.0.1:5000/model/${filename}`;
  
    // Load the model and add to scene
    loader.load(
      fileURL,
      (geometryOrObject) => {
        let mesh;
        // For STLLoader, we get geometry; for OBJLoader, we get an object.
        if (fileExtension === 'stl') {
          const material = new THREE.MeshPhongMaterial({ color: 0x606060 });
          mesh = new THREE.Mesh(geometryOrObject, material);
          geometryOrObject.center();
        } else {
          mesh = geometryOrObject;
        }
        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  
    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  
    // Cleanup on unmount
    return () => {
      mountNode.removeChild(renderer.domElement);
    };
  }, [filename]);
  

  return <div ref={mountRef} style={{ width: '800px', height: '600px' }} />;
};

export default CADViewer;
