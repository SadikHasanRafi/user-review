import { Router } from "express";
import { courseController } from "./course.controller";
import {dataValidator} from "../../utilities/dataValidator";
import { courseValidation } from "./course.validation";

const courseRoutes = Router()

courseRoutes.post("/course",dataValidator(courseValidation.addCourseSchemaValidationInsert),courseController.createCourse)
courseRoutes.get("/courses",courseController.getAllCourses)
courseRoutes.put("/courses/:courseId",dataValidator(courseValidation.addCourseSchemaValidationUpdate),courseController.updateSingleCourse)
courseRoutes.get("/courses/:courseId/reviews",courseController.getSingleCourseWithReview)
courseRoutes.get("/course/best",courseController.getBestCoursesByRating)

export default courseRoutes