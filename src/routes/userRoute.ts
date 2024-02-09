import express from 'express';
import { login, register } from '../controllers/userController';
import { validate } from '../middlewares/validator';
import { userLoginValidationSchema, userValidationSchema } from '../middlewares/userValidation';
const router = express.Router();

router.post("/register", validate(userValidationSchema), register);
router.post("/login", validate(userLoginValidationSchema), login);

export { router }
