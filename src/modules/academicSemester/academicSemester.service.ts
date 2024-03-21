import httpStatus from "http-status"
import AppError from "../../Errors/AppError"
import { academicSemesterNameCodeMapper } from "./academicSemester.constant"
import { AcademicSemester } from "./academicSemester.model"
import { TAcademicSemester } from "./academicsemester.interface"



const createAcademicSemesterFromDB = async (payload: TAcademicSemester) => {

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code')
    }
    const result = await AcademicSemester.create(payload)
    return result
}
const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find()
    return result
}
const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id)
    return result
}
const updateAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code')
    }
    const result = await AcademicSemester.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterFromDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}