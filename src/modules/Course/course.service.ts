import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchAbleFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";


const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery

    return result
}
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidators: true, session })
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, "Faild to update Course")
        }
        if (preRequisiteCourses && preRequisiteCourses.length) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted)
                .map(el => el.course)
            const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
            }, {
                new: true,
                runValidators: true,
                session
            })
            if (!deletedPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Faild to update Course")
            }

            const newPreRequisites = preRequisiteCourses.filter(el => el.course && !el.isDeleted)
            const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
            }, {
                new: true,
                runValidators: true,
                session
            })
            if (!newPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Faild to update Course")
            }
            await session.commitTransaction()
            await session.endSession()
            const result = await Course.findById(id).populate('preRequisiteCourses.course')
            return result
        }
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }


}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        id,
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    })
    return result
}
const removeFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        id,
        $pull: { faculties: { $in: payload } }
    }, {

        new: true
    })
    return result
}

const deleteCourseIntoDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result
}



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB
} 