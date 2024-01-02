"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalResponse = (success, statusCode, message, data, meta) => {
    if (meta) {
        return {
            success, statusCode, message, meta, data
        };
    }
    else {
        return {
            success, statusCode, message, data
        };
    }
};
exports.default = globalResponse;
