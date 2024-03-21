import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch('/:studentId', StudentControllers.updateStudent)
router.get('/', StudentControllers.getAllStudents);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;