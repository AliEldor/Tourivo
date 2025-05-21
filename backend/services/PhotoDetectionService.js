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
    keyFilename: keyFilePath,
  });

  console.log("Vision client initialized successfully!");
} catch (error) {
  console.error("Failed to initialize Vision client:", error);
}

const determineBestLandmark = (landmarks) => {
  if (!landmarks || landmarks.length === 0) return null;

  const famousLandmarks = [
    "Eiffel Tower",
    "Big Ben",
    "Statue of Liberty",
    "Taj Mahal",
    "Colosseum",
    "Great Wall of China",
    "Pyramids of Giza",
    "Golden Gate Bridge",
    "Machu Picchu",
    "Grand Canyon",
    "Stonehenge",
    "Sydney Opera House",
    "Burj Khalifa",
    "Christ the Redeemer",
    "Mount Rushmore",
    "Louvre Museum",
    "Angkor Wat",
    "Acropolis",
    "Petra",
    "Sagrada Familia",
  ];

  for (const famousLandmark of famousLandmarks) {
    const match = landmarks.find(
      (l) =>
        l.name.toLowerCase().includes(famousLandmark.toLowerCase()) &&
        l.confidence > 0.6
    );
    if (match) return match;
  }

  const sortedLandmarks = [...landmarks].sort(
    (a, b) => b.confidence - a.confidence
  );
  if (sortedLandmarks[0] && sortedLandmarks[0].confidence > 0.7) {
    return sortedLandmarks[0];
  }

  return null;
};

export const PhotoDetectionService = {
  uploadPhoto: async (userId, file, photoData) => {
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

    let landmarks = [];
    let labels = [];
    let locationInfo = {};
    let tags = [];
    let bestLandmark = null;

    if (client) {
      try {
        console.log("Reading image file from:", file.path);

        const imageBuffer = fs.readFileSync(file.path);

        console.log(
          "Image file read successfully, size:",
          imageBuffer.length,
          "bytes"
        );
        console.log("Starting Vision API analysis...");

        // analyze  image with g vision
        const [result] = await client.annotateImage({
          image: { content: imageBuffer.toString("base64") },
          features: [
            { type: "LANDMARK_DETECTION", maxResults: 10 },
            { type: "LABEL_DETECTION", maxResults: 15 },
            { type: "IMAGE_PROPERTIES" },
          ],
        });

        console.log("Vision API analysis completed successfully");

        if (
          result.landmarkAnnotations &&
          result.landmarkAnnotations.length > 0
        ) {
          landmarks = result.landmarkAnnotations.map((landmark) => ({
            name: landmark.description,
            confidence: landmark.score,
            locations: landmark.locations
              ? landmark.locations.map((loc) => ({
                  latitude: loc.latLng.latitude,
                  longitude: loc.latLng.longitude,
                }))
              : [],
          }));

          console.log(
            "Detected landmarks:",
            landmarks
              .map((l) => `${l.name} (${(l.confidence * 100).toFixed(1)}%)`)
              .join(", ")
          );

          bestLandmark = determineBestLandmark(landmarks);
          console.log(
            "Best landmark determined to be:",
            bestLandmark ? bestLandmark.name : "None"
          );
        } else {
          console.log("No landmarks detected");
        }

        if (result.labelAnnotations && result.labelAnnotations.length > 0) {
          labels = result.labelAnnotations.map((label) => ({
            name: label.description,
            confidence: label.score,
          }));
          console.log(
            "Detected labels:",
            labels
              .slice(0, 5)
              .map((l) => l.name)
              .join(", "),
            "..."
          );
        } else {
          console.log("No labels detected");
        }

        // location info
        if (
          bestLandmark &&
          bestLandmark.locations &&
          bestLandmark.locations.length > 0
        ) {
          locationInfo = {
            latitude: bestLandmark.locations[0].latitude,
            longitude: bestLandmark.locations[0].longitude,
            locationName: bestLandmark.name,
          };
          console.log("Location info set to:", locationInfo);
        } else if (
          landmarks.length > 0 &&
          landmarks[0].locations &&
          landmarks[0].locations.length > 0
        ) {
          locationInfo = {
            latitude: landmarks[0].locations[0].latitude,
            longitude: landmarks[0].locations[0].longitude,
            locationName: landmarks[0].name,
          };
          console.log("Using fallback location:", locationInfo);
        } else {
          console.log("No location info detected");
        }

        tags = labels
          .filter((label) => label.confidence > 0.75)
          .map((label) => label.name);

        if (bestLandmark && !tags.includes(bestLandmark.name)) {
          tags.unshift(bestLandmark.name);
        }

        console.log("Generated tags:", tags.join(", "));
      } catch (analysisError) {
        console.error("Error during image analysis:", analysisError);
      }
    } else {
      console.warn("Vision client not available, skipping image analysis");
    }

    newPhoto.detections = {
      bestLandmark: bestLandmark
        ? {
            name: bestLandmark.name,
            confidence: bestLandmark.confidence,
          }
        : null,
      landmarks,
      labels,
      locationInfo,
    };
    newPhoto.tags = tags;

    await newPhoto.save();
    console.log("Photo saved with analysis results");

    return newPhoto;
  },

  getPhoto: async (id) => {
    const photo = await PhotoDetection.findById(id);

    if (!photo) {
      const error = new Error("Photo not found");
      error.statusCode = 404;
      throw error;
    }

    return photo;
  },

  getUserPhotos: async (userId) => {
    const photos = await PhotoDetection.find({ userId }).sort({
      createdAt: -1,
    });

    return {
      count: photos.length,
      data: photos,
    };
  },

  getPhotosByLandmark: async (landmarkName) => {
    const photos = await PhotoDetection.find({
      "detections.bestLandmark.name": { $regex: new RegExp(landmarkName, "i") },
    }).sort({ createdAt: -1 });

    return {
      count: photos.length,
      data: photos,
    };
  },

  getTourPhotos: async (tourId) => {
    const photos = await PhotoDetection.find({
      tourId,
      isPublic: true,
    }).sort({ createdAt: -1 });

    return {
      count: photos.length,
      data: photos,
    };
  },

  
};
