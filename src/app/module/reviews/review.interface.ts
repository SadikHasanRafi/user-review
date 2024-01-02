import { Types } from "mongoose";

export interface ReviewI {
    courseId:Types.ObjectId,
    rating:number,
    review:string
}