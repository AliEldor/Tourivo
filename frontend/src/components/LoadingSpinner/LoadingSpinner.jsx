import React from "react";
import { Spinner } from "reactstrap";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner color="primary" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
