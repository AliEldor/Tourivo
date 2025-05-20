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
        
      </section>
    </>
  );
};

export default PhotoDetection;
