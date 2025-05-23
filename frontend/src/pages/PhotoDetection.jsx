import React, { useState } from "react";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import PhotoResult from "../components/PhotoDetection/PhotoResult";
import "../styles/photo-detection.css";
import CommonSection from "../shared/CommonSection";

const PhotoDetection = () => {
  const [photoData, setPhotoData] = useState(null);

  const handleUploadSuccess = (data) => {
    setPhotoData(data);

    // Scroll to results section
    const resultsElement = document.getElementById("results");
    if (resultsElement) {
      window.scrollTo({
        top: resultsElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <CommonSection title="AI Photo Detection" />
      <section className="photo-detection-page">
        <div className="container">
          <div className="page-header">
            <h1>AI Photo Detection</h1>
            <p>
              Upload a photo and let AI detect landmarks, objects, and more in
              your images
            </p>
          </div>

          <div className="upload-section">
            <PhotoUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div id="results" className="results-section">
            {photoData && <PhotoResult photo={photoData} />}

            {!photoData && (
              <div className="no-results">
                <i className="ri-image-2-line"></i>
                <p>Upload a photo to see AI detection results</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoDetection;
