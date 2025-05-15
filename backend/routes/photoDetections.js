import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  uploadPhoto,
  getPhoto,
  getUserPhotos,
  getTourPhotos,
  getPhotosByLandmark,
  deletePhoto,
  updatePhoto
} from "../controllers/photoDetectionController.js";
import { validatePhotoDetection, validate } from "../requests/PhotoDetection.js";

const router = express.Router();



export default router;