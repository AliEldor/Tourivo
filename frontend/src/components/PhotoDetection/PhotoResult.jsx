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

const LocationSection = ({ locationInfo }) => {
  if (!locationInfo?.locationName) return null;

  const openInMaps = (lat, lng) => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="detail-section">
      <h3>Location</h3>
      <p>{locationInfo.locationName}</p>
      {locationInfo.latitude && locationInfo.longitude && (
        <div className="location-details">
          <p className="coordinates">
            {locationInfo.latitude.toFixed(6)},{" "}
            {locationInfo.longitude.toFixed(6)}
          </p>
          <button
            className="maps-button"
            onClick={() =>
              openInMaps(locationInfo.latitude, locationInfo.longitude)
            }
          >
            View in Maps
          </button>
        </div>
      )}
    </div>
  );
};

const TagsSection = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <div className="detail-section">
      <h3>Tags</h3>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const NoteSection = ({ personalNote }) => {
  if (!personalNote) return null;

  return (
    <div className="detail-section">
      <h3>Personal Note</h3>
      <p className="personal-note">{personalNote}</p>
    </div>
  );
};

const LabelsSection = ({ labels }) => {
  if (!labels?.length) return null;

  return (
    <div className="detail-section">
      <h3>AI Labels</h3>
      <div className="labels-container">
        {labels.slice(0, 10).map((label, index) => (
          <div key={index} className="label-item">
            <span className="label-name">{label.name}</span>
            <span className="label-confidence">
              {Math.round(label.confidence * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const extractPhotoData = (photo) => {
  const data = photo?.data?.data || photo?.data || photo || {};

  return {
    imageUrl: data.imageUrl || "",
    personalNote: data.personalNote || "",
    tags: data.tags || [],
    detections: data.detections || {},
  };
};

const PhotoResult = ({ photo }) => {
  if (!photo) return null;

  const { imageUrl, personalNote, tags, detections } = extractPhotoData(photo);
  const { bestLandmark, locationInfo, labels } = detections;

  return (
    <div className="photo-result">
      <div className="result-header">
        <h2>Analysis Results</h2>
      </div>

      <div className="result-content">
        <ResultImage imageUrl={imageUrl} />
        <div className="details-container">
          <LandmarkSection landmark={bestLandmark} />
          <LocationSection locationInfo={locationInfo} />
          <TagsSection tags={tags} />
          <NoteSection personalNote={personalNote} />
          <LabelsSection labels={labels} />
        </div>
      </div>
    </div>
  );
};

PhotoResult.propTypes = {
  photo: PropTypes.shape({
    imageUrl: PropTypes.string,
    personalNote: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    detections: PropTypes.object,
    data: PropTypes.object,
  }),
};

export default PhotoResult;
