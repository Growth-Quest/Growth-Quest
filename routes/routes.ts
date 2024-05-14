import express from 'express';
import { userRouter } from './user/Users';
import { taskRouter } from './tasks/Task';
import { plantRouter } from './plants/Plant';


export const router = express.Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/plants', plantRouter);
