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
        availableTours = availableTours.filter(
          (tour) => tour.price <= preferences.maxPrice
        );
      }

      if (preferences.maxGroupSize) {
        availableTours = availableTours.filter(
          (tour) => tour.maxGroupSize >= preferences.maxGroupSize
        );
      }

      if (preferences.city) {
        const cityRegex = new RegExp(preferences.city, "i");
        availableTours = availableTours.filter((tour) =>
          cityRegex.test(tour.city)
        );
      }

      // Convert tours to a format suitable for the AI
      const tourOptions = availableTours.map((tour) => ({
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

      // Get the format instructions
      const formatInstructions = outputParser.getFormatInstructions();

      // Initialize the OpenAI model
      const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "o4-mini",
        temperature: 1,
      });

      //  prompt template
      const prompt = ChatPromptTemplate.fromMessages([
        [
          "system",
          "You are a travel planning assistant that creates personalized itineraries from available tours.",
        ],
        [
          "human",
          `Create a personalized travel itinerary based on the following preferences:
          
          Budget: {budget}
          Duration: {duration} days
          Interests: {interests}
          Preferred type of destinations: {destinationType}
          Season/time of travel: {season}
          
          Select from these available tours to create the best itinerary:
          {tourOptions}
          
          Important rules:
          1. ONLY use tours from the provided list
          2. The total duration of selected tours should be roughly equal to the requested duration
          3. The total cost should not exceed the budget
          4. Select tours that match the user's interests
          5. Each tour MUST have a valid tourId from the options provided
          
          {format_instructions}`,
        ],
      ]);

      const interestsString = Array.isArray(preferences.interests)
        ? preferences.interests.join(", ")
        : preferences.interests;

      const chain = prompt.pipe(model).pipe(outputParser);

      const tripData = await chain.invoke({
        budget: preferences.budget,
        duration: preferences.duration,
        interests: interestsString,
        destinationType: preferences.destinationType,
        season: preferences.season,
        tourOptions: JSON.stringify(tourOptions, null, 2),
        format_instructions: formatInstructions,
      });

      console.log("Generated trip data:", JSON.stringify(tripData, null, 2));

      const tourIds = tripData.tourSelections.map(
        (selection) => selection.tourId
      );
      const validTours = await Tour.find({ _id: { $in: tourIds } });

      if (validTours.length !== tourIds.length) {
        return {
          success: false,
          error: "Some selected tours were not found in the database",
        };
      }

      const newTrip = new GeneratedTrip({
        userId,
        title: tripData.title,
        description: tripData.description,
        duration: preferences.duration,
        tourSelections: tripData.tourSelections,
        totalEstimatedCost: tripData.totalEstimatedCost,
        preferences: preferences,
      });

      await newTrip.save();

      const populatedTrip = await GeneratedTrip.findById(newTrip._id).populate({
        path: "tourSelections.tourId",
        model: "Tour",
      });

      return {
        success: true,
        data: populatedTrip,
      };
    } catch (err) {
      console.error("Error generating trip:", err);
      return {
        success: false,
        error: `Failed to generate trip: ${err.message}`,
      };
    }
  },

  getGeneratedTrip: async (id, userId) => {
    try {
      const trip = await GeneratedTrip.findById(id).populate({
        path: 'tourSelections.tourId',
        model: 'Tour',
      });

      if (!trip) {
        return {
          success: false,
          error: "Generated trip not found",
          statusCode: 404,
        };
      }

      if (trip.userId.toString() !== userId) {
        return {
          success: false,
          error: "Unauthorized access to this trip",
          statusCode: 403,
        };
      }

      return {
        success: true,
        data: trip,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to fetch generated trip",
      };
    }
  },

  getUserGeneratedTrips: async (userId) => {
    try {
      const trips = await GeneratedTrip.find({ userId }).populate({
        path: 'tourSelections.tourId',
        model: 'Tour',
        select: 'title city photo price' // Only get essential fields for list view
      });

      return {
        success: true,
        count: trips.length,
        data: trips,
      };
    } catch (err) {
      return {
        success: false,
        error: "Failed to fetch generated trips",
      };
    }
  },

  bookGeneratedTrip: async (tripId, userId, bookingData) => {
    try {
      const trip = await GeneratedTrip.findById(tripId).populate({
        path: 'tourSelections.tourId',
        model: 'Tour',
      });

      if (!trip) {
        return {
          success: false,
          error: "Generated trip not found",
          statusCode: 404,
        };
      }

      if (trip.userId.toString() !== userId) {
        return {
          success: false,
          error: "Unauthorized access to this trip",
          statusCode: 403,
        };
      }

    }
  }

};
