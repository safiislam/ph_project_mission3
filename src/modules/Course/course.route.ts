import { Router } from "express";
import validationRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";


const router = Router()


router.post('/create-course', validationRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourse)
router.get('/:id', CourseControllers.getSingleCourse)
router.put('/:courseId/assign-faculties', validationRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/assign-faculties', validationRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.patch('/:id', validationRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)
router.delete('/:id', CourseControllers.deleteCourse)


export const CourseRouters = router