"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    NODE_ENV: process.env.NODE_ENV, // for understending this is a special type of evn
    port: process.env.PORT,
    db_uri: process.env.MONGO_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_assess_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
