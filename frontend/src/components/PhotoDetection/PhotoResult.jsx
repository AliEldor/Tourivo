import React from "react";
import PropTypes from "prop-types";
import "./photo-result.css";

const ResultImage = ({ imageUrl }) => {
  const normalizedImageUrl = imageUrl?.replace?.(/\\/g, "/") || "";

  const formattedImageUrl = normalizedImageUrl.startsWith?.("http")
    ? normalizedImageUrl
    : `http://localhost:4000/${normalizedImageUrl}`;

  return (
    <div className="image-container">
      <img
        src={formattedImageUrl}
        alt="Uploaded"
        className="result-image"
        onError={(e) => {
          const altUrl = `http://localhost:4000/uploads/photos/${normalizedImageUrl
            .split("/")
            .pop()}`;
          e.target.src = altUrl;

          e.target.onerror = () => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Image+Not+Found";
            e.target.onerror = null;
          };
        }}
      />
    </div>
  );
};

const LandmarkSection = ({ landmark }) => {
  if (!landmark) return null;

  return (
    <div className="detail-section">
      <h3>Landmark Detection</h3>
      <p className="landmark-name">{landmark.name}</p>
      <p className="confidence">
        Confidence: {Math.round(landmark.confidence * 100)}%
      </p>
    </div>
  );
};



export default PhotoResult;
