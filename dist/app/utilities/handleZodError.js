"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const config_1 = __importDefault(require("../config/config"));
const handleZodError = (err) => {
    const messageArray = err.issues.map((issue) => {
        return `'${issue.path[issue.path.length - 1]}' ${issue.message}. `;
    });
    const errorMessage = messageArray.join('');
    let result = {
        success: false,
        message: "Validation Error",
        errorMessage: errorMessage,
        errorDetails: {
            issues: err.issues,
            name: err.name
        },
        stack: config_1.default.NODE_ENV === "development" ? err.stack : null
    };
};
exports.handleZodError = handleZodError;
