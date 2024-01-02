"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCategoryService = void 0;
const course_category_model_1 = require("./course-category.model");
const addNewCourseCategoryIntoDB = async (payload) => {
    const result = new course_category_model_1.CourseCategoryModel(payload);
    await result.save();
    const { _id, name } = result.toObject();
    return { _id, name };
};
const getAllCourseCategoryFromDB = async () => {
    const result = await course_category_model_1.CourseCategoryModel.find();
    return result;
};
exports.courseCategoryService = {
    addNewCourseCategoryIntoDB,
    getAllCourseCategoryFromDB
};
