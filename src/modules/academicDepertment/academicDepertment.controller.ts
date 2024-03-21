import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepertmentServices } from "./academicDepertment.service";


const createAcademicDepertment = catchAsync(async (req, res) => {
    const data = req.body
    const result = await AcademicDepertmentServices.createAcademicDepertmentFromDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Depertment create successfully'
    })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicDepertmentServices.getAllAcademicDepertmentFromDB()
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Academic Depertment '
    })
})
const getSingleAcademicDepertment = catchAsync(async (req, res) => {
    const { depertmentId } = req.params
    const result = await AcademicDepertmentServices.getSingleAcademicDepertmentFromDB(depertmentId)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get Single Academic Depertment '
    })
})
const updateAcademicDepertment = catchAsync(async (req, res) => {
    const { depertmentId } = req.params
    const data = req.body
    const result = await AcademicDepertmentServices.updateAcademicDepertmentIntoDB(depertmentId, data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Updated Academic Depertment '
    })
})


export const AcademicDepertmentControllers = {
    createAcademicDepertment,
    getAllAcademicFaculty,
    getSingleAcademicDepertment,
    updateAcademicDepertment
}