import { Router } from "express";
import { reviewController } from "./review.controller";
import { dataValidator } from "../../utilities/dataValidator";
import { reviewValidation } from "./review.validator";


const reviewRouter = Router()

 reviewRouter.post("/",dataValidator(reviewValidation),reviewController.addNewReview)


 export default reviewRouter