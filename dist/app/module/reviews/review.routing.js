"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const dataValidator_1 = require("../../utilities/dataValidator");
const review_validator_1 = require("./review.validator");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post("/", (0, dataValidator_1.dataValidator)(review_validator_1.reviewValidation), review_controller_1.reviewController.addNewReview);
exports.default = reviewRouter;
