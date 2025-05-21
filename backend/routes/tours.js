import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { validate, validateTour } from "../requests/TourRequest.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//(admin)
router.post("/", verifyAdmin, validateTour("createTour"), validate, createTour);

router.put("/:id", verifyAdmin, validateTour("updateTour"), validate, updateTour);

router.delete("/:id",verifyAdmin, validateTour("deleteTour"), validate, deleteTour);

//user
router.get(
    "/search/getTourBySearch",
    validateTour("getTourBySearch"),
    validate,
    getTourBySearch
  );

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

router.get("/", validateTour("getAllTour"), validate, getAllTour);

router.get("/:id", validateTour("getSingleTour"), validate, getSingleTour);





export default router;
