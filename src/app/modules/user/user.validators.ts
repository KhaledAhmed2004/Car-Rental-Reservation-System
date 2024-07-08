import { z } from "zod";
const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name must be sting" }),
    email: z.string().email("Invalid email address"),
    password: z.string({ invalid_type_error: "Password must be string" }),
    role: z.enum(["user", "admin"]),
    phone: z.string(),
    address: z.string(),
  }),
});

const userSingInValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid eamil address"),
    password: z.string({ invalid_type_error: "Password must be string" }),
  }),
});
const refreshtokenValidationSchema = z.object({
  cookies: z.object({
    refreshtoken: z.string({ required_error: "Refresh token is requreid" }),
  }),
});
export const userValidation = {
  userValidationSchema,
  userSingInValidationSchema,
  refreshtokenValidationSchema,
};
