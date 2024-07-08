import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUserCreate {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone: string;
  address: string;
}

export type TUserSignIn = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUserCreate> {
  isUserIsExistsByEmail(email: string): Promise<TUserCreate>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
