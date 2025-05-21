import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// create output parser with Zod schema
export const tripOutputParser = StructuredOutputParser.fromZodSchema(
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


export const tripPromptTemplate = ChatPromptTemplate.fromMessages([
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


export async function generateAITrip(preferences, tourOptions) {

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "o4-mini",
    temperature: 1,
  });

  const formatInstructions = tripOutputParser.getFormatInstructions();

  const chain = tripPromptTemplate.pipe(model).pipe(tripOutputParser);

  const interestsString = Array.isArray(preferences.interests)
    ? preferences.interests.join(", ")
    : preferences.interests;

  return chain.invoke({
    
  });
}
