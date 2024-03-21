/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAcademicSemester } from "../academicSemester/academicsemester.interface"
import { User } from "./user.model"


const findLastStudentId = async () => {

    const lastStudent = await User.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0
        }
    )
        .sort({
            createdAt: -1
        })
        .lean()
    return lastStudent?.id ? lastStudent?.id : undefined
}
const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString()
    const lastStudentId = await findLastStudentId()
    // 2030 01 0000
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01
    const lastStudentYear = lastStudentId?.substring(0, 4) //2030
    const currentSemesterCode = payload.code
    const currentStudentYear = payload.year

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentStudentYear) {
        currentId = lastStudentId.substring(6)
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId

}

export default generateStudentId