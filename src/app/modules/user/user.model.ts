// import { Schema, model } from "mongoose";
// import { TUserCreate, UserModel } from "./user.interface";
// import bcrypt from "bcrypt";
// import config from "../../config";
// const userCreateSchema = new Schema<TUserCreate, UserModel>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true, select: 0 },
//     role: { type: String, enum: ["user", "admin"] },
//   },
//   { timestamps: true }
// );
// userCreateSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds)
//     // Number("10")
//   );
//   next();
// });
// // set '' after saving password
// userCreateSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

// userCreateSchema.statics.isUserIsExistsByEmail = async function (
//   email: string
// ) {
//   // return await User.findOne({ email });
//   return await User.findOne({ email }).select("+password");
// };
// userCreateSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashPassword
// ) {
//   return await bcrypt.compare(plainTextPassword, hashPassword);
// };
// export const User = model<TUserCreate, UserModel>("User", userCreateSchema);

import { Schema, model } from "mongoose";
import { TUserCreate, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userCreateSchema = new Schema<TUserCreate, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"] },
    status: { type: String, enum: ["active", "block"], default: "active" }, // Add status field here
    phone: { type: String }, // Also, add the phone field if it's needed
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
userCreateSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// Post-save hook to set password to an empty string after saving
userCreateSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Static method to find user by email and include password
userCreateSchema.statics.isUserIsExistsByEmail = async function (
  email: string
) {
  return await User.findOne({ email }).select("+password");
};

// Static method to check if the password matches
userCreateSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUserCreate, UserModel>("User", userCreateSchema);
