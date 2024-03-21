import httpStatus from "http-status"
import AppError from "../../Errors/AppError"
import config from "../../config"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import generateStudentId from "./user.utils"
import mongoose from "mongoose"

const createStudentFromDB = async (password: string, payload: TStudent) => {

    if (await Student.isUserExists(payload.email)) {
        throw new AppError(httpStatus.NOT_FOUND, 'User already exists')
    }
    const userData: Partial<TUser> = {} //partial ---> to make type optional

    userData.password = password || (config.default_password as string)
    userData.role = "student"
    // year semestercode 4 disit number
    // userData.id = '14256525415'
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester
    );

    //set  generated id
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        userData.id = await generateStudentId(admissionSemester);

        const newUser = await User.create([userData], { session })
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Create user")
        }
        payload.id = newUser[0].id
        payload.user = newUser[0]._id //reference id
        const newStudent = await Student.create([payload], { session })
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Create student")
        }
        await session.commitTransaction()
        await session.endSession()
        return newStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error)
    }
}


export const UserService = {
    createStudentFromDB
}