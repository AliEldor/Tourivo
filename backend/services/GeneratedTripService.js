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
      
    }
  }
}