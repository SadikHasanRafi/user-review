"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const course_service_1 = require("./course.service");
const createCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await course_service_1.courseService.addCourseIntoDB(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        next(error);
    }
});
const getAllCourses = (0, catchAsync_1.default)(async (req, res, next) => {
    const data = req.query;
    const result = await course_service_1.courseService.getAllCourses(data);
    res.send(result);
});
const getSingleCourseWithReview = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await course_service_1.courseService.getCourseAndReviews(req.params.courseId);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
const updateSingleCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.courseService.updateSingleCourseInDB(req);
    res.status(200).send(result);
});
const getBestCoursesByRating = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.courseService.getBestCoursesByRating();
    res.status(200).send(result);
});
exports.courseController = {
    createCourse,
    getAllCourses,
    updateSingleCourse,
    getSingleCourseWithReview,
    getBestCoursesByRating
};
