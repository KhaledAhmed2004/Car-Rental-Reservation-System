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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../auth/auth.utils");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield user_model_1.User.create(userData);
    return create;
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserIsExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user did not found");
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    //create token and send to the client
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_assess_secret, "1d");
    const refreshtoken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, "365d");
    return {
        user,
        token,
        refreshtoken,
    };
});
// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string
//   ) as JwtPayload;
//   const user = await User.isUserIsExistsByEmail(payload?.email);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user did not found");
//   }
//   const jwtPayload = {
//     userId: user._id as string,
//     role: user.role,
//   };
//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_assess_secret as string,
//     "1d"
//   );
//   return {
//     accessToken,
//   };
// };
exports.UserServices = { createUserIntoDB, signIn };
