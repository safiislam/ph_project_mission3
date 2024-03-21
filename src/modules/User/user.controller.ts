import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";




const createStudent = catchAsync(async (req, res) => {

    const { student, password } = req.body
    const result = await UserService.createStudentFromDB(password, student)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "student create succesfully",
        data: result
    })
})

export const UserController = {
    createStudent
} 