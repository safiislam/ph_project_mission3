import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRouter } from "../modules/User/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepertmentRouters } from "../modules/academicDepertment/academicDepertment.route";
import { CourseRouters } from "../modules/Course/course.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRouters
    },
    {
        path: '/academic-depertment',
        route: AcademicDepertmentRouters
    },
    {
        path: '/course',
        route: CourseRouters
    }
]

// router.use('/students', StudentRoutes)
moduleRoutes.forEach(route => router.use(route.path, route.route))



export default router