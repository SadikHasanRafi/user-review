import { ZodError, ZodIssue } from "zod";
import { validationErrorInterface } from "../interfaces/validationErrorInterface";
import config from "../config/config";

export const handleZodError = (err:ZodError)=>{
    const messageArray = err.issues.map((issue:ZodIssue)=>{ 
        return `'${issue.path[issue.path.length-1]}' ${issue.message}. `
    })
    const errorMessage = messageArray.join('');
    let result : validationErrorInterface = {
        success:false,
        message:"Validation Error",
        errorMessage:errorMessage,
        errorDetails:{
            issues:err.issues,
            name:err.name
        },
        stack: config.NODE_ENV==="development" ? err.stack : null
    }
}