import express from 'express';

const router = express.Router();
router.post('/login');
// router.get('/:id', AdminController.getSingleAdmin);
// router.delete('/:id', AdminController.deleteAdmin);
// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdminZodSchema),
//   AdminController.updateAdmin
// );
// router.get('/', AdminController.getAllAdmins);

export const AuthRoutes = router;