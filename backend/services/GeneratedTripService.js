import GeneratedTrip from "../models/GeneratedTrip.js";
import Tour from "../models/Tour.js";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export const GeneratedTripService = {
  generateTrip: async (userId, preferences) => {
    try {
      //fetch available tours from the database
      let availableTours = await Tour.find({});

      // Apply basic filters based on preferences if provided
      if (preferences.maxPrice) {
        availableTours = availableTours.filter(tour => tour.price <= preferences.maxPrice);
      }

      if (preferences.maxGroupSize) {
        availableTours = availableTours.filter(tour => tour.maxGroupSize >= preferences.maxGroupSize);
      }
      
      if (preferences.city) {
        const cityRegex = new RegExp(preferences.city, "i");
        availableTours = availableTours.filter(tour => cityRegex.test(tour.city));
      }

      // Convert tours to a format suitable for the AI
      const tourOptions = availableTours.map(tour => ({
        id: tour._id.toString(),
        title: tour.title,
        city: tour.city,
        address: tour.address,
        description: tour.desc,
        price: tour.price,
        maxGroupSize: tour.maxGroupSize,
        distance: tour.distance,
        featured: tour.featured,
      }));
      
      // If no tours found after filtering
      if (tourOptions.length === 0) {
        return {
          success: false,
          error: "No tours available matching your preferences",
        };
      }

      // Create output parser with Zod schema
      const outputParser = StructuredOutputParser.fromZodSchema(
        z.object({
          title: z.string().min(1),
          description: z.string().min(1),
          tourSelections: z.array(
            z.object({
              tourId: z.string().min(1),
              orderInTrip: z.number().positive(),
              durationInDays: z.number().positive(),
              note: z.string().optional(),
            })
          ),
          totalEstimatedCost: z.number().positive(),
        })
      );

    }
  }
}