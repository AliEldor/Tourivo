import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Container } from "reactstrap";
import travelAnimation from "../assets/animations/travel-loading.json";
import "../styles/trip-loading.css";

const TripLoadingScreen = () => {
  const [loadingMessage, setLoadingMessage] = useState(
    "Planning your perfect trip..."
  );
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Planning your perfect trip...",
    "Finding the best destinations...",
    "Analyzing your interests...",
    "Calculating optimal routes...",
    "Curating special experiences...",
    "Finalizing your dream itinerary...",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        return loadingMessages[(currentIndex + 1) % loadingMessages.length];
      });
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(progressInterval);
          return 90; // Cap at 90% until actual completion
        }
        return prevProgress + Math.random() * 15;
      });
    }, 2000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="trip-loading-overlay">
      <Container className="trip-loading-container">
        <div className="trip-loading-content">
          <div className="trip-loading-animation">
            <Lottie
              animationData={travelAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
          </div>

          <h2 className="loading-title">Creating Your Adventure</h2>
          <p className="loading-message">{loadingMessage}</p>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="loading-tip">
            <strong>Travel Tip:</strong> {getTravelTip()}
          </p>
        </div>
      </Container>
    </div>
  );
};

function getTravelTip() {
  const tips = [
    "Pack a portable charger for your devices",
    "Learn a few phrases in the local language",
    "Always keep a copy of your passport",
    "Roll your clothes instead of folding them to save space",
    "Bring an empty water bottle to fill after security at airports",
    "Use packing cubes to organize your suitcase",
    "Download maps for offline use",
    "Notify your bank about your travel plans",
  ];

  return tips[Math.floor(Math.random() * tips.length)];
}

export default TripLoadingScreen;
