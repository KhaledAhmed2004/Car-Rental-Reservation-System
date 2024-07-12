"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../Middleware/validateRequest"));
const car_controller_1 = require("./car.controller");
const car_validators_1 = require("./car.validators");
const auth_1 = __importDefault(require("../../Middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(car_validators_1.carValidation.createCarSchema), car_controller_1.CarControllers.createCar);
router.get("/", car_controller_1.CarControllers.getCallCars);
router.put("/return", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.CarControllers.returnTheCar);
router.get("/:id", car_controller_1.CarControllers.getSingleCar);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.CarControllers.updateCar);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.CarControllers.deleteCar);
exports.CarRouter = router;