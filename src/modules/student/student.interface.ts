import { Model, Types } from 'mongoose';

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TStudent = {
    id: string;
    user: Types.ObjectId;   //to make type _id
    password: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    admissionSemester: Types.ObjectId,
    academicDepertment: Types.ObjectId,
    profileImg?: string;
    isDeleted: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
    isUserExists(email: string): Promise<TStudent | null>;
}
