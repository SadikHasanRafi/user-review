import { dataValidator } from './../../utilities/dataValidator';
import {  Router } from "express";
import { courseCategoryController } from "./course-category.controller";
import { courseCategoryValidator } from './course-category.validator';

const courseCategoryRoutes = Router()


courseCategoryRoutes.post("/",dataValidator(courseCategoryValidator),courseCategoryController.addNewCourseCategory)
courseCategoryRoutes.get("/",courseCategoryController.getAllCourseCategory)



export default courseCategoryRoutes