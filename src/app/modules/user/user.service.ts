import { TUserCreate, TUserSignIn } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUserCreate) => {
  const create = await User.create(userData);
  return create;
};

const signIn = async (payload: TUserSignIn) => {
  const user = await User.findOne({ email: payload?.email });
  return user;
};
export const UserServices = { createUserIntoDB, signIn };
