import { ReviewService } from "../services/ReviewService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// Create a new review
export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const userId = req.user.id;


}