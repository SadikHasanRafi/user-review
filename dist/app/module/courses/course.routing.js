"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const dataValidator_1 = require("../../utilities/dataValidator");
const course_validation_1 = require("./course.validation");
const courseRoutes = (0, express_1.Router)();
courseRoutes.post("/course", (0, dataValidator_1.dataValidator)(course_validation_1.courseValidation.addCourseSchemaValidationInsert), course_controller_1.courseController.createCourse);
courseRoutes.get("/courses", course_controller_1.courseController.getAllCourses);
courseRoutes.put("/courses/:courseId", (0, dataValidator_1.dataValidator)(course_validation_1.courseValidation.addCourseSchemaValidationUpdate), course_controller_1.courseController.updateSingleCourse);
courseRoutes.get("/courses/:courseId/reviews", course_controller_1.courseController.getSingleCourseWithReview);
courseRoutes.get("/course/best", course_controller_1.courseController.getBestCoursesByRating);
exports.default = courseRoutes;
