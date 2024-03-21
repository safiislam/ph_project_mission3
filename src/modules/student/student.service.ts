import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

    // {
    //     const queryObj = { ...query }

    //     let searchTerm = ''
    //     if (query?.searchTerm) {
    //         searchTerm = query?.searchTerm as string
    //     }
    //     // http://localhost:5000/api/v1/students?searchTerm=john&email=saikot2@example.com
    //     const studentSearchableFields = ['email', 'name.firstName', "presentAddress"]
    //     const searchQuery = Student.find({
    //         $or: studentSearchableFields.map((field) => ({
    //             [field]: { $regex: searchTerm, $options: 'i' }
    //         }))
    //     })
    //     const excludeFields = ['searchTerm', 'sort', "limit", "page", 'fields']
    //     excludeFields.forEach((el) => delete queryObj[el])
    //     console.log({ query }, { queryObj });
    //     const filterQuery = searchQuery.find(queryObj)
    //         .populate('admissionSemester').populate({
    //             path: 'academicDepertment',
    //             populate: {
    //                 path: 'academicFaculty'
    //             }
    //         });

    //     let sort = '-createdAt' //desending = je last a create hoice se age asbe
    //     if (query?.sort) {
    //         sort = query?.sort as string
    //     }
    //     //http://localhost:5000/api/v1/students?sort=-email
    //     const sortQuery = filterQuery.sort(sort)

    //     let page = 1
    //     let limit = 1
    //     let skip = 0
    //     if (query?.limit) {
    //         limit = Number(query?.limit)
    //     }
    //     if (query?.page) {
    //         page = Number(query?.page)
    //         skip = (page - 1) * limit
    //     }
    //     // http://localhost:5000/api/v1/students?page=1&limit=2
    //     const paginateQuery = sortQuery.skip(skip)

    //     const limitQuery = paginateQuery.limit(limit)

    //     let fields = "-__v"
    //     if (query?.fields) {
    //         fields = (query?.fields as string).split(',').join(' ')
    //     }
    //     const fieldQuery = await limitQuery.select(fields)
    //     return fieldQuery
    // }
    const studentQuery = new QueryBuilder(Student.find()
        .populate('admissionSemester').populate({
            path: 'academicDepertment',
            populate: {
                path: 'academicFaculty'
            }
        })
        , query)
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await studentQuery.modelQuery
    return result

};

// const getSingleStudentFromDB = async (id: string) => {
//     const result = await Student.aggregate([{ $match: { id } }]);
//     return result; 
// };
const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ _id: id }).populate('admissionSemester').populate({
        path: 'academicDepertment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const studentDeleted = await Student.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            {
                new: true,
                session
            }
        );
        if (!studentDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
        }
        const userDelete = await User.findByIdAndUpdate(
            { id },
            { isDeleted: true },
            {
                new: true,
                session
            }
        )
        if (!userDelete) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User")
        }
        await session.commitTransaction()
        await session.endSession()

        return userDelete;
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User not deleted")
    }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, localGuardian, guardian, ...remainingStudentData } = payload
    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingStudentData
    }
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name${key}`] = value
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdateData[`localGuardian${key}`] = value
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdateData[`guardian${key}`] = value
        }
    }
    const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, { new: true, runValidators: true })
    return result
}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
};