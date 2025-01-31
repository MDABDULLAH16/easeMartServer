import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchemas } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidationSchemas.userCreateSchema),
  UserControllers.createUser
);
router.get('/', UserControllers.getAllUserFromDbReq);
router.get('/:_id', UserControllers.getSingleUserFromDbReq);
router.put('/:_id', UserControllers.userUpdateReq);
router.delete('/:_id', UserControllers.deleteUserFromDbReq);

export const UserRouter = router;
