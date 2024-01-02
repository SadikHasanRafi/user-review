"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
});
exports.ReviewModel = (0, mongoose_1.model)("Review", ReviewSchema);
