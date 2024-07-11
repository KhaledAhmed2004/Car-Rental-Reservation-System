"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const config_1 = __importDefault(require("../../config"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (req === null || req === void 0 ? void 0 : req.body);
    const user = yield user_service_1.UserServices.createUserIntoDB(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: user,
    });
}));
const singIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.signIn(req === null || req === void 0 ? void 0 : req.body);
    const { refreshtoken, user, token } = result;
    res.cookie("refreshtoken", refreshtoken, {
        secure: config_1.default.NODE_ENV === "development",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in succesfully!",
        data: {
            user,
            token,
        },
    });
}));
// const refreshToken: RequestHandler = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await UserServices.refreshToken(refreshToken);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Assess token is retrive succesfully!",
//     data: result,
//   });
// });
exports.UserControllers = {
    createUser,
    singIn,
};
