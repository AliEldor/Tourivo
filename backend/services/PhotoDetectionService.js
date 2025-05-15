import PhotoDetection from "../models/PhotoDetection.js";
import fs from "fs";
import path from "path";
import vision from "@google-cloud/vision";
import dotenv from "dotenv";

dotenv.config();

// Vision client 
let client;
try {
  const keyFilePath = path.resolve(process.env.GOOGLE_CLOUD_CREDENTIALS);
  console.log("Looking for credentials file at:", keyFilePath);
  
  client = new vision.ImageAnnotatorClient({
    keyFilename: keyFilePath
  });
  
  console.log("Vision client initialized successfully!");
} catch (error) {
  console.error("Failed to initialize Vision client:", error);
}

const determineBestLandmark = (landmarks) => {
  if (!landmarks || landmarks.length === 0) return null;
  
  const famousLandmarks = [
    "Eiffel Tower", "Big Ben", "Statue of Liberty", "Taj Mahal", 
    "Colosseum", "Great Wall of China", "Pyramids of Giza", "Golden Gate Bridge",
    "Machu Picchu", "Grand Canyon", "Stonehenge", "Sydney Opera House",
    "Burj Khalifa", "Christ the Redeemer", "Mount Rushmore", "Louvre Museum",
    "Angkor Wat", "Acropolis", "Petra", "Sagrada Familia"
  ];
  
  // chek if any of the landmarks are in
  for (const famousLandmark of famousLandmarks) {
    const match = landmarks.find(l => 
      l.name.toLowerCase().includes(famousLandmark.toLowerCase()) && 
      l.confidence > 0.6
    );
    if (match) return match;
  }
  
  const sortedLandmarks = [...landmarks].sort((a, b) => b.confidence - a.confidence);
  if (sortedLandmarks[0] && sortedLandmarks[0].confidence > 0.7) {
    return sortedLandmarks[0];
  }
  
  return null;
};

export const PhotoDetectionService  = {
  uploadPhoto: async (userId, file, photoData) => {
    try {
      const newPhoto = new PhotoDetection({
        userId,
        tourId: photoData.tourId || null,
        tripId: photoData.tripId || null,
        imageUrl: file.path,
        filename: file.filename,
        personalNote: photoData.description || "", 
        isPublic: photoData.isPublic || false,
      });

      await newPhoto.save();

      // empty detection fields
      let landmarks = [];
      let labels = [];
      let locationInfo = {};
      let tags = [];
      let bestLandmark = null;

  


};