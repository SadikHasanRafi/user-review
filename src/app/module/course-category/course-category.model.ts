import { Schema, model } from "mongoose";
import { CourseCategoryI } from "./course-category.interface";

const CourseCategorySchema = new Schema({
    name:{
        type:String,
    }
})

export const CourseCategoryModel = model<CourseCategoryI>("CourseCategory",CourseCategorySchema)