"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
exports.reviewValidation = zod_1.z.object({
    courseId: zod_1.z.string().min(3).max(30).trim(),
    rating: zod_1.z.number(),
    review: zod_1.z.string()
});
