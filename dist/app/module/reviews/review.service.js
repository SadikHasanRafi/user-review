"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = require("./review.model");
const addReviewIntoDB = async (payload) => {
    const result = new review_model_1.ReviewModel(payload);
    await result.save();
    const { courseId, rating, review } = result;
    return { courseId, rating, review };
};
exports.reviewService = {
    addReviewIntoDB
};
