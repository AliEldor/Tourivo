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

