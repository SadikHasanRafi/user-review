"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCategoryValidator = void 0;
const zod_1 = require("zod");
exports.courseCategoryValidator = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30).trim(),
});
