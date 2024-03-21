import { TAcademicDepertment } from "./academicDepertment.interface";
import { AcademicDepertment } from "./academicDepertment.model";



const createAcademicDepertmentFromDB = async (payload: TAcademicDepertment) => {
    const result = await AcademicDepertment.create(payload)
    return result
}

const getAllAcademicDepertmentFromDB = async () => {
    const result = await AcademicDepertment.find().populate('academicFaculty').populate('academicFaculty')
    return result
}
const getSingleAcademicDepertmentFromDB = async (id: string) => {
    const result = await AcademicDepertment.findById(id).populate("academicFaculty").populate('academicFaculty')
    return result
}
const updateAcademicDepertmentIntoDB = async (id: string, payload: TAcademicDepertment) => {
    const result = await AcademicDepertment.findByIdAndUpdate(id, payload, { new: true }).populate('academicFaculty')
    return result

}

export const AcademicDepertmentServices = {
    createAcademicDepertmentFromDB,
    getAllAcademicDepertmentFromDB,
    getSingleAcademicDepertmentFromDB,
    updateAcademicDepertmentIntoDB
}