import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        data: result,
        message: "Create Courese Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})
const getAllCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDB(req.query)
    sendResponse(res, {
        data: result,
        message: "Get All Courese Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.getSingleCourseFromDB(id)
    sendResponse(res, {
        data: result,
        message: "Get Single Courese Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const data = req.body
    const result = await CourseServices.updateCourseIntoDB(id, data)
    sendResponse(res, {
        data: result,
        message: "Update Course Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params
    const { faculties } = req.body
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties)
    sendResponse(res, {
        data: result,
        message: "Assign Faculty Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params
    const { faculties } = req.body
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId, faculties)
    sendResponse(res, {
        data: result,
        message: "Assign Faculty Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await CourseServices.deleteCourseIntoDB(id)
    sendResponse(res, {
        data: result,
        message: "Get Single Courese Succesfully",
        statusCode: httpStatus.OK,
        success: true
    })
})





export const CourseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
} 