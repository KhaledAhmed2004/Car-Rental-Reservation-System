"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSource = [
        { path: error.path, message: error.message },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSource,
    };
};
exports.default = handleCastError;
