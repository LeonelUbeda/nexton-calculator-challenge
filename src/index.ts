import { calculator } from "./calculator";

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/calculator", (req: Request, res: Response) => {
  const { input } = req.body;
  try {
    res.json({ output: calculator(input) });
  } catch (error) {
    res.status(400);
    res.json({ error: "Input error" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
