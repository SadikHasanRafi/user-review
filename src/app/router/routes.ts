import { Router } from "express"
import courseRoutes from "../module/courses/course.routing"
import courseCategoryRoutes from "../module/course-category/course-category.routing"
import reviewRouter from "../module/reviews/review.routing"




 const router = Router()

 const allRoutes = [
    {
        path:"/",
        route:courseRoutes
    },
    {
        path:"/categories",
        route:courseCategoryRoutes
    },
    {
        path:"/reviews",
        route:reviewRouter
    }
 ]

 allRoutes.map((route)=> router.use(route.path,route.route))

export default router