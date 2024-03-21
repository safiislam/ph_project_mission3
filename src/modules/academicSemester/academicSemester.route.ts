import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = express.Router()


router.post('/create-academic-semister', validationRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)
router.get('/', AcademicSemesterController.getAllAcademicSemester)
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)
router.patch('/:semesterId', validationRequest(AcademicSemesterValidations.updateAcademicValidalidationSchema), AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoutes = router