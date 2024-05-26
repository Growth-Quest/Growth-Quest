import express from 'express';
import UsersController from '../../controller/UsersController';
import { auth } from '../../middleware/auth';
export const userRouter = express.Router();

userRouter.get('/get', UsersController.getAllUsers);
userRouter.get('/get/:id', UsersController.getUserById);
userRouter.get('/get-by-username', UsersController.getUserByUsername);
userRouter.post('/register', UsersController.registerUser);
userRouter.post('/login', UsersController.userLogin);
userRouter.put('/update/:id', UsersController.updateUser);
userRouter.delete('/delete/:id', UsersController.deleteUser);
