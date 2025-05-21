import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: false, 
    },
    tripId: {
      type: mongoose.Types.ObjectId,
      ref: "GeneratedTrip",
      required: false, 
    },
    imageUrl: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true, 
    },
    personalNote: { 
      type: String,
      required: false, 
    },
    tags: [{
      type: String,
    }],
    detections: {
      bestLandmark: { 
        name: String,
        confidence: Number,
      },
      landmarks: [{
        name: String,
        confidence: Number,
        locations: [{
          latitude: Number,
          longitude: Number
        }]
      }],
      labels: [{
        name: String,
        confidence: Number
      }],
      locationInfo: {
        latitude: Number,
        longitude: Number,
        locationName: String
      }
    },
    isPublic: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("PhotoDetection", photoSchema);