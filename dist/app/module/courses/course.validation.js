"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const tagSchemaValidationInsert = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30).trim(),
    isDeleted: zod_1.z.boolean(),
});
const detailsSchemaValidationInsert = zod_1.z.object({
    level: zod_1.z.string().min(3).max(20).trim(),
    description: zod_1.z.string().min(10).max(200),
});
const addCourseSchemaValidationInsert = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(50).trim(),
        instructor: zod_1.z.string().min(3).max(50).trim(),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        startDate: zod_1.z.string().refine((date) => new Date(date) <= new Date(), { message: "Start date must be in the past to today", }),
        endDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), { message: "End date must be in the future", }),
        language: zod_1.z.string().min(3).max(20).trim(),
        provider: zod_1.z.string().min(3).max(50).trim(),
        durationInWeeks: zod_1.z.string().optional(),
        tags: zod_1.z.array(tagSchemaValidationInsert),
        details: detailsSchemaValidationInsert,
    }),
});
const tagSchemaValidationUpdate = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30).trim(),
    isDeleted: zod_1.z.boolean().optional(),
});
const detailsSchemaValidationUpdate = zod_1.z.object({
    level: zod_1.z.string().min(3).max(20).trim(),
    description: zod_1.z.string().min(10).max(200).optional(),
});
const addCourseSchemaValidationUpdate = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(50).trim().optional(),
        instructor: zod_1.z.string().min(3).max(50).trim().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        startDate: zod_1.z.string().refine((date) => new Date(date) <= new Date(), { message: "Start date must be in the past to today", }).optional(),
        endDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), { message: "End date must be in the future", }).optional(),
        language: zod_1.z.string().min(3).max(20).trim().optional(),
        provider: zod_1.z.string().min(3).max(50).trim().optional(),
        durationInWeeks: zod_1.z.string().optional(),
        tags: zod_1.z.array(tagSchemaValidationUpdate).optional(),
        details: detailsSchemaValidationUpdate.optional(),
    }),
});
exports.courseValidation = {
    addCourseSchemaValidationInsert, addCourseSchemaValidationUpdate
};
