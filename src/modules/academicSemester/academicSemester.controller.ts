import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterFromDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Academic Semester Successfully',
        data: result
    })

})
const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester retrieved Succesfully",
        data: result
    })
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        data: result,
        success: true,
        message: 'Academic semester is retrieved succesfully'
    })
})
const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params
    const payload = req.body
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, payload)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is retrieved succesfully"
    })
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}