import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationRequest from '../../middleware/validateRequest';


const router = express.Router()


router.post('/create-student', validationRequest(createStudentValidationSchema), UserController.createStudent)

export const UserRouter = router