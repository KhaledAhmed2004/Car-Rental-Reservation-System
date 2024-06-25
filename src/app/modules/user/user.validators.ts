import { z } from "zod";
const userValidationSchema = z.object({
  name: z.string({ invalid_type_error: "Name must be sting" }),
  email: z.string().email("Invalid email address"),
  password: z.string({ invalid_type_error: "Password must be string" }),
  role: z.enum(["user", "admin"]),
  phone: z.string(),
  address: z.string(),
});

const userSingInValidationSchema = z.object({
  email: z.string().email("Invalid eamil address"),
  password: z.string({ invalid_type_error: "Password must be string" }),
});
export const userValidation = {
  userValidationSchema,
};
