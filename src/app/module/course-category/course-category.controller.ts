import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utilities/catchAsync"
import { courseCategoryService } from "./course-category.service"
import globalResponse from "../../utilities/globalResponse"


const addNewCourseCategory = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const result = await courseCategoryService.addNewCourseCategoryIntoDB(req.body)
    res.status(201).send(globalResponse(true,201,"Category created successfully",result)) 
})

const getAllCourseCategory= catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const result = await courseCategoryService.getAllCourseCategoryFromDB();
    res.status(200).send(globalResponse(true,200,"Categories retrieved successfully",result)) 
})

export const courseCategoryController = {
    addNewCourseCategory,
    getAllCourseCategory
}