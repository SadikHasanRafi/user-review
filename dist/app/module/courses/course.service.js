"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globalResponse_1 = __importDefault(require("../../utilities/globalResponse"));
const course_model_1 = require("./course.model");
const review_model_1 = require("../reviews/review.model");
const addCourseIntoDB = async (payload) => {
    const startDateString = new Date(payload.startDate);
    const endDateString = new Date(payload.endDate);
    const timeDifference = endDateString.getTime() - startDateString.getTime();
    const durationInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
    const result = new course_model_1.CourseModel({ ...payload, durationInWeeks: durationInWeeks });
    await result.save();
    const newResult = { result };
    return (0, globalResponse_1.default)(true, 201, "Course created successfully", newResult);
};
const getAllCourses = async (params) => {
    const page = Number(params.page) | 1;
    const limit = Number(params.limit) | 10;
    const skip = (page - 1) * limit;
    let orderBy = params.sortOrder;
    if (params.sortOrder === undefined) {
        orderBy = "asc";
    }
    let result;
    if (params.sortBy) {
        result = await course_model_1.CourseModel.find().sort([[`${params.sortBy}`, orderBy]]).skip(skip).limit(limit).select(["-__v", "-details._id", ""]).exec();
    }
    else {
        result = await course_model_1.CourseModel.find().skip(skip).limit(limit).select('durationInWeeks').exec();
    }
    const totalCount = await course_model_1.CourseModel.countDocuments();
    return (0, globalResponse_1.default)(true, 201, "Course retrieved successfully", result, { page: page, limit: limit, total: totalCount });
};
const getCourseAndReviews = async (params) => {
    const _id = new mongoose_1.default.Types.ObjectId(params);
    let course = await course_model_1.CourseModel.findById({ _id: _id }).select('-__v');
    const reviews = await review_model_1.ReviewModel.find({ courseId: params }).select('-__v').exec();
    const result = {
        ...course?.toObject(),
        reviews: reviews
    };
    return result;
};
const updateSingleCourseInDB = async (req) => {
    const params = req.params;
    let updatedCourse = req.body;
    // let courseDetails:CourseDetailsI | undefined;
    const { tags, details, ...otherInfo } = updatedCourse;
    const _id = new mongoose_1.default.Types.ObjectId(params.courseId);
    let otherInfoResult;
    const doc = await course_model_1.CourseModel.findById({ _id: _id });
    if (doc) {
        for (const key in updatedCourse) {
            if (updatedCourse.hasOwnProperty(key)) {
                if (key === "tags") {
                    updatedCourse.tags?.map((tag) => {
                        doc?.tags.map((docTag) => {
                            if (tag.name === docTag.name) {
                                docTag.isDeleted = tag.isDeleted;
                            }
                        });
                    });
                    updatedCourse.tags?.map((updatedTag) => {
                        if (!doc?.tags.find((docTag) => docTag.name === updatedTag.name)) {
                            doc?.tags.push(updatedTag);
                        }
                    });
                }
                if (key === "details" && updatedCourse.details) {
                    if (updatedCourse.details.level) {
                        doc.details.level = updatedCourse.details.level;
                    }
                    if (updatedCourse.details.description) {
                        doc.details.description = updatedCourse.details.description;
                    }
                }
            }
        }
        if (otherInfo) {
            otherInfoResult = await course_model_1.CourseModel.findOneAndUpdate(_id, otherInfo);
        }
    }
    const result = await doc?.save();
    return (0, globalResponse_1.default)(true, 200, "Course updated successfully", result);
};
const getBestCoursesByRating = async () => {
    const courses = await course_model_1.CourseModel.find();
    const reviews = await review_model_1.ReviewModel.find();
    let coursesWithRating = [];
    let courseWithRating;
    let x;
    x = courses.map((course) => {
        let sum = 0;
        if (course) {
            reviews.map((review) => {
                if (review.courseId.toString() === course._id.toString()) {
                    sum = sum + review.rating;
                }
            });
            if (sum) {
                courseWithRating = {
                    courseId: course._id,
                    rating: sum
                };
                coursesWithRating.push(courseWithRating);
            }
        }
    });
    const maxRating = Math.max(...coursesWithRating.map(rating => rating.rating));
    const highestRatingCourseDetails = coursesWithRating.map((course) => {
        if (course.rating === maxRating) {
            return course;
        }
    });
    const doc = await course_model_1.CourseModel.findById({ _id: highestRatingCourseDetails[0]?.courseId });
    return (0, globalResponse_1.default)(true, 200, "Best course retrieved successfully", doc);
};
exports.courseService = {
    addCourseIntoDB,
    getAllCourses,
    getCourseAndReviews,
    updateSingleCourseInDB,
    getBestCoursesByRating
};
