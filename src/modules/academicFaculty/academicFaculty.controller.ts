import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async (req, res) => {
    const data = req.body
    const result = await AcademicFacultyServices.createAcademicFacultyFromDB(data)
    sendResponse(res, {
        data: result,
        message: "Academic Faculty Create  Successfully",
        success: true,
        statusCode: httpStatus.OK
    })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all Academic Faculty Successfully"
    })
})
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params

    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: "Get A Single Academic Faculty Successfully"
    })
})
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params
    const data = req.body
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(facultyId, data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Academic Faculty Successfully"
    })
})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}