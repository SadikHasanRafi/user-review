import { Schema, model } from "mongoose";
import { ReviewI } from "./review.interface";

const ReviewSchema = new Schema<ReviewI>({
  courseId: {
    type: Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
});

export const ReviewModel = model<ReviewI>("Review", ReviewSchema);
