import catchAsync from "../../utilities/catchAsync";
import globalResponse from "../../utilities/globalResponse";
import { CourseCategoryI } from "./course-category.interface";
import { CourseCategoryModel } from "./course-category.model";


const addNewCourseCategoryIntoDB = async (payload:CourseCategoryI)=>{
    const result = new CourseCategoryModel(payload);
    await result.save()
    const {_id,name} = result.toObject()
    return {_id,name}
}



const getAllCourseCategoryFromDB = async ()=>{
    const result =await CourseCategoryModel.find()
    return result
}



export const courseCategoryService = {
    addNewCourseCategoryIntoDB,
    getAllCourseCategoryFromDB
}