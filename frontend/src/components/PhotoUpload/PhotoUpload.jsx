import React, { useState } from "react";
import { uploadPhoto } from "../../services/photoService";
import "./photo-upload.css";

const PhotoUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  
};

export default PhotoUpload;
