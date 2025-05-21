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
      
    ),
    totalEstimatedCost: z.number().positive(),
  })
);


