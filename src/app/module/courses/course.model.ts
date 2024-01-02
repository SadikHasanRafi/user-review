import { Schema, model } from "mongoose";
import { CourseDetailsI, CourseI, TagsI } from "./course.interface";
import {  courseValidation } from "./course.validation";

const TagsSchema = new Schema<TagsI>({
  name: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>=1 && value.length<20) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Tag Name..',
    },
  },
  isDeleted: {
    type: Boolean,
  },
});

const CourseDetailsSchema = new Schema<CourseDetailsI>({
  level: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>3 && value.length<20) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Course Level.',
    },
  },
  description: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>10 && value.length<250) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Course Description.',
    },
  },
});

const CourseSchema = new Schema<CourseI>({
  title: {
    type: String,
    unique: true,
    validate: {
      validator: (value:string) => {
        if (value.length>3 && value.length<50) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Course Title.',
    },
  },

  instructor: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>3 && value.length<50) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Instructor Name.',
    },
  },
  categoryId: {
    type: Schema.Types.ObjectId || String,
  },
  price: {
    type: Number,
    validate: {
      validator: (value:number) => {
        if (value>0) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Course Price.',
    },
  },
  tags: {
    type: [TagsSchema],
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  language: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>3 && value.length<50) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Language.',
    },
  },
  provider: {
    type: String,
    validate: {
      validator: (value:string) => {
        if (value.length>3 && value.length<50) {
          return true
        }else{
          return false
        }
      },
      message: 'Invalid Provider.',
    },
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    type: CourseDetailsSchema,
  },
});







export const CourseModel = model<CourseI>("Course", CourseSchema);
