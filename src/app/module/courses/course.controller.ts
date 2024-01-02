import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utilities/catchAsync";
import { courseService } from "./course.service";
import { courseFilterPaginationParamsI } from "../../utilities/filterPaginationParamsI";
import { ParsedQs } from "../../interfaces/parsedQsInterface";

const createCourse =  catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await courseService.addCourseIntoDB(req.body)
        res.status(201).send(result)    
    } catch (error) {
        next(error)
    }

})

const getAllCourses = catchAsync(async (req:Request,res:Response,next:NextFunction) => {
    const data:Partial<courseFilterPaginationParamsI> | Partial<ParsedQs>  = req.query
    const result =await courseService.getAllCourses(data)
    	res.send(result)
	})

const getSingleCourseWithReview = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await courseService.getCourseAndReviews(req.params.courseId)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})


const updateSingleCourse = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
      const result = await courseService.updateSingleCourseInDB (req)  
      res.status(200).send(result)    
})


const getBestCoursesByRating = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const result   = await  courseService.getBestCoursesByRating()
    res.status(200).send(result)
})

export const courseController = {
    createCourse,
    getAllCourses,
    updateSingleCourse,
    getSingleCourseWithReview,
    getBestCoursesByRating
}

