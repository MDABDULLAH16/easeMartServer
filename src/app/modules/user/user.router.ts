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
router.put('/:_id', UserControllers.userUpdateReq);

export const UserRouter = router;
