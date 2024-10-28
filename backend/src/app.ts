import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Car Rental Backend !");
});

export default app;
