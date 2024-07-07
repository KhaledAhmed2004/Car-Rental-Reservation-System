import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV, // for understending this is a special type of evn
  port: process.env.PORT,
  db_uri: process.env.MONGO_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_assess_secret: process.env.JWT_ACCESS_SECRET,
};
