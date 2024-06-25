import express from "express";
import { AuthRoutes } from "./app/modules/user/user.routes";
import { globalErrohandler } from "./app/Middleware/globalErrorhandler";
import { notFound } from "./app/Middleware/notFound";

const app = express();
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(globalErrohandler);
//not found route
app.use(notFound);
export default app;
