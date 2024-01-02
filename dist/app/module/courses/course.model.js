"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const TagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length >= 1 && value.length < 20) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Tag Name..',
        },
    },
    isDeleted: {
        type: Boolean,
    },
});
const CourseDetailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length > 3 && value.length < 20) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Course Level.',
        },
    },
    description: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length > 10 && value.length < 250) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Course Description.',
        },
    },
});
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                if (value.length > 3 && value.length < 50) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Course Title.',
        },
    },
    instructor: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length > 3 && value.length < 50) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Instructor Name.',
        },
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId || String,
    },
    price: {
        type: Number,
        validate: {
            validator: (value) => {
                if (value > 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Course Price.',
        },
    },
    tags: {
        type: [TagsSchema],
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    language: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length > 3 && value.length < 50) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Language.',
        },
    },
    provider: {
        type: String,
        validate: {
            validator: (value) => {
                if (value.length > 3 && value.length < 50) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: 'Invalid Provider.',
        },
    },
    durationInWeeks: {
        type: Number,
    },
    details: {
        type: CourseDetailsSchema,
    },
});
exports.CourseModel = (0, mongoose_1.model)("Course", CourseSchema);
