"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = require("./handleZodError");
const globalErrorHandler = (err, req, res, next) => {
    // zod error handler
    if (err instanceof zod_1.ZodError) {
        const result = (0, handleZodError_1.handleZodError)(err);
        res.status(400).json(result);
    }
    res.status(400).json(err);
};
exports.globalErrorHandler = globalErrorHandler;
