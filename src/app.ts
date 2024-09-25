import express, { Application } from "express";
import { globalErrohandler } from "./app/Middleware/globalErrorhandler";
import { notFound } from "./app/Middleware/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(globalErrohandler);
//not found route
app.use(notFound);
export default app;
