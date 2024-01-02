import mongoose from "mongoose";
import { courseFilterPaginationParamsI } from "../../utilities/filterPaginationParamsI";
import globalResponse from "../../utilities/globalResponse";
import { CourseI, TagsI } from "./course.interface";
import { CourseModel } from "./course.model";
import { ReviewModel } from "../reviews/review.model";
import { Request } from "express";
import { ReviewI } from "../reviews/review.interface";

const addCourseIntoDB =  async (payload: CourseI) => {
  const startDateString = new Date(payload.startDate);
  const endDateString = new Date(payload.endDate);
  const timeDifference = endDateString.getTime() - startDateString.getTime();
  const durationInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
  const result = new CourseModel({ ...payload, durationInWeeks: durationInWeeks });
  await result.save();
  const newResult = { result };
  return globalResponse(true,201,"Course created successfully",newResult);
  }

const getAllCourses =async (params:Partial<courseFilterPaginationParamsI>) => {
  const page = Number(params.page) | 1;
  const limit = Number(params.limit) | 10;
  const skip = (page - 1) * limit;
  let orderBy : "desc" | "asc"  = params.sortOrder as "desc" | "asc" ;
  if (params.sortOrder === undefined ) {
    orderBy =  "asc"
  }

  let result
     if (params.sortBy) {
      result =await CourseModel.find().sort([[`${params.sortBy}`,orderBy]]).skip(skip).limit(limit).select(["-__v","-details._id",""]).exec()
    }else{
      result =await CourseModel.find().skip(skip).limit(limit).select('durationInWeeks').exec()
    }
  const totalCount = await CourseModel.countDocuments();

  return globalResponse(true,201,"Course retrieved successfully",result,{page:page,limit:limit,total:totalCount});
}

const getCourseAndReviews =  async (params:string) => {

  const _id =new mongoose.Types.ObjectId(params);
  let course = await CourseModel.findById({_id:_id}).select('-__v')
  const reviews = await ReviewModel.find({ courseId: params }).select('-__v').exec();
  const result = {
    ...course?.toObject(),
    reviews:reviews
  }
  return result  
}

const updateSingleCourseInDB =async (req:Request) => {
  const params = req.params
  let updatedCourse:Partial<CourseI> = req.body
  // let courseDetails:CourseDetailsI | undefined;
  const { tags, details, ...otherInfo} = updatedCourse
  const _id =new mongoose.Types.ObjectId(params.courseId)
  let otherInfoResult
  const  doc = await CourseModel.findById({_id:_id})

  if (doc) {
    for(const key in updatedCourse){
      if (updatedCourse.hasOwnProperty(key)) {
        if (key==="tags") {
          updatedCourse.tags?.map((tag:TagsI)=>{
            doc?.tags.map((docTag:TagsI)=>{
              if (tag.name===docTag.name) {
                docTag.isDeleted = tag.isDeleted
              }
            })
          })
          updatedCourse.tags?.map((updatedTag:TagsI) => {
            if (!doc?.tags.find((docTag:TagsI) => docTag.name === updatedTag.name)) {
              doc?.tags.push(updatedTag);
            }
          });
        }
        if (key === "details" && updatedCourse.details) {
          if (updatedCourse.details.level) {
            doc.details.level = updatedCourse.details.level
          }if (updatedCourse.details.description) {
            doc.details.description = updatedCourse.details.description
          }
        }
      }
    }
    if (otherInfo) {
      otherInfoResult = await CourseModel.findOneAndUpdate(_id,otherInfo)
    }
  }

  const result = await doc?.save()
  return globalResponse(true,200,"Course updated successfully",result);

}

const getBestCoursesByRating = async () => {
  const courses = await CourseModel.find()
  const reviews = await ReviewModel.find()
  interface courseAndRating{
    rating:number 
    courseId:string 
  }
  

  let coursesWithRating:courseAndRating[] = []
  let courseWithRating:courseAndRating

  let x
  
  

  x = courses.map((course:any)=>{
    let sum = 0
    
    if (course) { 
      reviews.map((review:ReviewI)=>{
        if ( review.courseId.toString() === course._id.toString() ) {
          sum = sum + review.rating
        }
      })
     if (sum) {
      courseWithRating = {
        courseId:course._id,
        rating:sum
      }
      coursesWithRating.push(courseWithRating)
     }
    }
  })

  const maxRating: number = Math.max(...coursesWithRating.map(rating => rating.rating));
  const highestRatingCourseDetails = coursesWithRating.map((course:courseAndRating)=>{
    if (course.rating===maxRating) {
      return course
    }
  })

  const doc = await CourseModel.findById({_id:highestRatingCourseDetails[0]?.courseId})

  return globalResponse(true,200,"Best course retrieved successfully",doc);
  
}

export const courseService = {
  addCourseIntoDB,
  getAllCourses,
  getCourseAndReviews,
  updateSingleCourseInDB,
  getBestCoursesByRating
};
