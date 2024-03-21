import { Schema, model } from "mongoose";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicsemester.interface";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";



const AcademicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true
    },
    startMonth: {
        type: String,
        enum: Months,
        req: true
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true
    }
}, {
    timestamps: true
})
AcademicSemesterSchema.pre('save', async function (next) {
    const isExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year
    })
    if (isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester is alreadey Exists")
    }
    next()
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema)