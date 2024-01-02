import { z } from "zod";

const tagSchemaValidationInsert = z.object({
  name: z.string().min(3).max(30).trim(),
  isDeleted: z.boolean(),
});

const detailsSchemaValidationInsert = z.object({
  level: z.string().min(3).max(20).trim(),
  description: z.string().min(10).max(200),
});

const addCourseSchemaValidationInsert = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim(),
    instructor: z.string().min(3).max(50).trim(),
    categoryId: z.string(), 
    price: z.number().positive(),
    startDate: z.string().refine((date) => new Date(date) <= new Date(), {message: "Start date must be in the past to today", }),
    endDate: z.string().refine((date) => new Date(date) > new Date(), {message: "End date must be in the future",}),
    language: z.string().min(3).max(20).trim(),
    provider: z.string().min(3).max(50).trim(),
    durationInWeeks: z.string().optional(),
    tags: z.array(tagSchemaValidationInsert),
    details: detailsSchemaValidationInsert,
  }),
});



const tagSchemaValidationUpdate =z.object({
  name: z.string().min(3).max(30).trim(),
  isDeleted: z.boolean().optional(),
});


const detailsSchemaValidationUpdate = z.object({
  level: z.string().min(3).max(20).trim(),
  description: z.string().min(10).max(200).optional(),
});


const addCourseSchemaValidationUpdate = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim().optional(),
    instructor: z.string().min(3).max(50).trim().optional(),
    categoryId: z.string().optional(), 
    price: z.number().positive().optional(),
    startDate: z.string().refine((date) => new Date(date) <= new Date(), {message: "Start date must be in the past to today", }).optional(),
    endDate: z.string().refine((date) => new Date(date) > new Date(), {message: "End date must be in the future",}).optional(),
    language: z.string().min(3).max(20).trim().optional(),
    provider: z.string().min(3).max(50).trim().optional(),
    durationInWeeks: z.string().optional(),
    tags: z.array(tagSchemaValidationUpdate).optional(),
    details: detailsSchemaValidationUpdate.optional(),
  }),
});






export const courseValidation = {
  addCourseSchemaValidationInsert,addCourseSchemaValidationUpdate
};
