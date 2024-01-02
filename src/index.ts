import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/router/routes";
import cors from 'cors';
import { globalErrorHandler } from "./app/utilities/globalErrorHandler";


const app: Application = express();


app.use(express.json());
app.use(cors());


//root function
const rootRoute = async (req: Request, res: Response) => {
  res.send("Hello from course review server.");
};



app.use("/api", routes);
app.get("/", rootRoute);
app.use(globalErrorHandler)

export default app;
