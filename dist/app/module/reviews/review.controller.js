"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const review_service_1 = require("./review.service");
const globalResponse_1 = __importDefault(require("../../utilities/globalResponse"));
const addNewReview = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await review_service_1.reviewService.addReviewIntoDB(req.body);
    res.send((0, globalResponse_1.default)(true, 201, "Review created successfully", result));
});
exports.reviewController = {
    addNewReview
};
