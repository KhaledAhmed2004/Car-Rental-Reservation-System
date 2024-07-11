"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validators_1 = require("./user.validators");
const validateRequest_1 = __importDefault(require("../../Middleware/validateRequest"));
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validators_1.userValidation.userValidationSchema), user_controller_1.UserControllers.createUser);
router.post("/signin", (0, validateRequest_1.default)(user_validators_1.userValidation.userSingInValidationSchema), user_controller_1.UserControllers.singIn);
// router.post(
//   "/refresh-token",
//   validateRequest(userValidation.refreshtokenValidationSchema),
//   UserControllers.refreshToken
// );
exports.AuthRoutes = router;
