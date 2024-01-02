"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        try {
            return (fn(req, res, next));
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = catchAsync;
