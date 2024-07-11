"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    // Extract value within double quotes using regex
    const match = error.message.match(/"([^"]*)"/);
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    // Create an error source array with the extracted message
    const errorSource = [
        { path: "", message: `${extractedMessage} already exists` },
    ];
    // Set the status code to 400 for Bad Request
    const statusCode = 400;
    // Return the error response with status code, message, and error source
    return {
        statusCode,
        message: "Duplicate Key Error",
        errorSource,
    };
};
exports.default = handleDuplicateError;
