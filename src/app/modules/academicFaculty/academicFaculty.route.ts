import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultySchema),
  AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultySchema),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicFacultyController.getAllFaculties);

export const FacultyRoutes = router;
