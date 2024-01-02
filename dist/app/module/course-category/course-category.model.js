"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CourseCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
    }
});
exports.CourseCategoryModel = (0, mongoose_1.model)("CourseCategory", CourseCategorySchema);
