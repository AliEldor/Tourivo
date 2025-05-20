import React, { useState } from "react";
import { uploadPhoto } from "../../services/photoService";
import "./photo-upload.css";

const PhotoUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only accept image files
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("photo", selectedFile);

      if (description.trim()) {
        formData.append("description", description);
      }

      const response = await uploadPhoto(formData);

      setSelectedFile(null);
      setPreview(null);
      setDescription("");

      if (onUploadSuccess) {
    
        if (response.data && response.success) {
          onUploadSuccess(response.data);
        } else {
         
          onUploadSuccess(response);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to upload photo");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="photo-upload">
      <h2>Upload a Photo</h2>
      <p className="subtitle">Upload a photo to analyze it with AI</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <label className="file-input-label">
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="file-preview" />
                <div className="overlay">Click to change</div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <i className="ri-image-add-line"></i>
                <span>Select an image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
        </div>

        
      </form>
    </div>
  );
};

export default PhotoUpload;
