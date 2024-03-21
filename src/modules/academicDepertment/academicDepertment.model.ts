import { Schema, model } from "mongoose";
import { TAcademicDepertment } from "./academicDepertment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const academicDepertmentSchema = new Schema<TAcademicDepertment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty"
    }
})



// academicDepertmentSchema.pre('save', async function (next) {
//     const isExistsDepertment = await AcademicDepertment.findOne({ name: this.name })
//     if (isExistsDepertment) {
//         throw new AppError(httpStatus.NOT_FOUND, 'Depertment Already exists')
//     }
//     const isFacultyExists = await AcademicFaculty.findById(this.academicFaculty)
//     if (!isFacultyExists) {
//         throw new AppError(httpStatus.NOT_FOUND, "This Faculty is not exists")
//     }
//     next()
// })

academicDepertmentSchema.post('findOne', async function (next) {
    const query = this.getQuery()
    const isExistDepertment = await AcademicDepertment.findById(query)
    if (isExistDepertment) {
        throw new Error('Academic depertment is not Exists ')
    }
    next()
})

academicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()
    const isExistDepertment = await AcademicDepertment.findById(query)
    if (!isExistDepertment) {
        throw new AppError(httpStatus.NOT_FOUND, 'This depertment is not Exists')
    }
    next()
})

export const AcademicDepertment = model<TAcademicDepertment>('AcademicDepertment', academicDepertmentSchema)