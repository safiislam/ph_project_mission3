import { TAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFaculty } from "./academicFaculty.model"



const createAcademicFacultyFromDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result
}

const getAllAcademicFacultyFromDB = async () => {
    const result = await AcademicFaculty.find()
    return result
}
const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id)
    return result
}
const updateSingleAcademicFacultyIntoDB = async (id: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true })
    return result
}





export const AcademicFacultyServices = {
    createAcademicFacultyFromDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateSingleAcademicFacultyIntoDB
}