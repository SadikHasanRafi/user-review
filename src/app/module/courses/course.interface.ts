import { Model, Types } from 'mongoose';

export interface TagsI {
    name:string,
    isDeleted:boolean
}

export interface CourseDetailsI {
    level:string,
    description:string
}

export interface CourseI {
    title:string,
    instructor:string,
    categoryId: Types.ObjectId,
    price:number,
    startDate:string,
    endDate:string,
    language:string,
    provider:string,
    durationInWeeks:number,
    
    tags:TagsI[],
    details:CourseDetailsI
}