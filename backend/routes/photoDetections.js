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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photos/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};



export default router;