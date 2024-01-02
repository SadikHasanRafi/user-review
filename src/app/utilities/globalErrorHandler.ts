import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import {  validationErrorInterface } from "../interfaces/validationErrorInterface";
import { handleZodError } from "./handleZodError";

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
 


    
    // zod error handler
    if (err instanceof ZodError) {
        const result = handleZodError(err)
        res.status(400).json(result)    
    }


    res.status(400).json(err)    

}