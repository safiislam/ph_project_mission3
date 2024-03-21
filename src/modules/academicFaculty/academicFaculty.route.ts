import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validationRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router()

router.post('/create-acdemic-faculty', validationRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)
router.patch('/:facultyId', validationRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateSingleAcademicFaculty)

export const AcademicFacultyRouters = router