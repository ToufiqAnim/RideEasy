import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173/",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);
import httpStatus = require("http-status");

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
export default app;
