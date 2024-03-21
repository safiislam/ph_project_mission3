import express from 'express';
import { AcademicDepertmentControllers } from './academicDepertment.controller';
import validationRequest from '../../middleware/validateRequest';
import { AcademicDepertmentValidations } from './academicDepertment.validation';

const router = express.Router()

router.post('/create-academic-depertment',
    //  validationRequest(AcademicDepertmentValidations.createAcademicDepertmentvalidation), 
    AcademicDepertmentControllers.createAcademicDepertment)
router.get('/', AcademicDepertmentControllers.getAllAcademicFaculty)
router.get('/:depertmentId', AcademicDepertmentControllers.getSingleAcademicDepertment)
router.patch('/:depertmentId', AcademicDepertmentControllers.updateAcademicDepertment)

export const AcademicDepertmentRouters = router