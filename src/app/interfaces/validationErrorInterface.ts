import { ZodError, ZodIssue } from "zod"

export interface validationErrorInterface {
    success:false
    message:string | "Validation Error"
    errorMessage:string|undefined
    errorDetails:{
        issues:ZodIssue[],
        name:string | "ZodError"
    }
    stack?:string | null
}

