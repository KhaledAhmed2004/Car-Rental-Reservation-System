"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: "Name must be sting" }),
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string({ invalid_type_error: "Password must be string" }),
        role: zod_1.z.enum(["user", "admin"]),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
const userSingInValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid eamil address"),
        password: zod_1.z.string({ invalid_type_error: "Password must be string" }),
    }),
});
const refreshtokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshtoken: zod_1.z.string({ required_error: "Refresh token is requreid" }),
    }),
});
exports.userValidation = {
    userValidationSchema,
    userSingInValidationSchema,
    refreshtokenValidationSchema,
};
