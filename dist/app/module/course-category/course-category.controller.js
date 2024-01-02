"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const course_category_service_1 = require("./course-category.service");
const globalResponse_1 = __importDefault(require("../../utilities/globalResponse"));
const addNewCourseCategory = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_category_service_1.courseCategoryService.addNewCourseCategoryIntoDB(req.body);
    res.status(201).send((0, globalResponse_1.default)(true, 201, "Category created successfully", result));
});
const getAllCourseCategory = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_category_service_1.courseCategoryService.getAllCourseCategoryFromDB();
    res.status(200).send((0, globalResponse_1.default)(true, 200, "Categories retrieved successfully", result));
});
exports.courseCategoryController = {
    addNewCourseCategory,
    getAllCourseCategory
};
