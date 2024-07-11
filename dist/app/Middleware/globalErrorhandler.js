"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrohandler = void 0;
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handelValidationError_1 = __importDefault(require("../errors/handelValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrohandler = (error, req, res, next) => {
    //seting defult valuse
    let statusCode = 500;
    let message = "Somting want wrong!!!";
    let errorSourse = [
        {
            path: "",
            message: "Somting want wrong!!!",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifideError = (0, handleZodError_1.default)(error);
        statusCode = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.statusCode;
        message = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.message;
        errorSourse = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.errorSource;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifideError = (0, handelValidationError_1.default)(error);
        statusCode = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.statusCode;
        message = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.message;
        errorSourse = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.errorSource;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifideError = (0, handleCastError_1.default)(error);
        statusCode = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.statusCode;
        message = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.message;
        errorSourse = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.errorSource;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifideError = (0, handleDuplicateError_1.default)(error);
        statusCode = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.statusCode;
        message = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.message;
        errorSourse = simplifideError === null || simplifideError === void 0 ? void 0 : simplifideError.errorSource;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSourse = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSourse = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    // ultimate returen
    return res.status(statusCode).json({
        success: false,
        message,
        errorSourse,
        stack: config_1.default.NODE_ENV === "development" ? error === null || error === void 0 ? void 0 : error.stack : null,
        // error,
    });
};
exports.globalErrohandler = globalErrohandler;
