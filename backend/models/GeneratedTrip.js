import mongoose from "mongoose";
const generatedTripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    tourSelections: [
      {
        tourId: {
          type: mongoose.Types.ObjectId,
          ref: "Tour",
          required: true,
        },
        orderInTrip: {
          type: Number,
          required: true,
        },
        durationInDays: {
          type: Number,
          required: true,
        },
        note: {
          type: String,
        },
      },
    ],

  }
)