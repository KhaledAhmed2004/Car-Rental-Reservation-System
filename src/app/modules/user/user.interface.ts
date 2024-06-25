export type TUserCreate = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone: string;
  address: string;
};

export type TUserSignIn = {
  email: string;
  password: string;
};
