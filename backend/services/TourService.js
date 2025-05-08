import Tour from "../models/Tour.js"

export const TourService = {
    createTour: async (tourData) => {
        try {
          const newTour = new Tour(tourData);
          const savedTour = await newTour.save();
          return {
            success: true,
            data: savedTour
          };
        } catch (err) {
          return {
            success: false,
            error: "Failed to create tour"
          };
        }
      },

}