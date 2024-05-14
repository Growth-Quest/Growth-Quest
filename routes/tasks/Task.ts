import express from 'express';
import TasksController from '../../controller/TasksController';

export const taskRouter = express.Router();

taskRouter.get('/get', TasksController.getAllTasks);
taskRouter.get('/get-by-user', TasksController.getTaskByUser);
taskRouter.get('/get/:id', TasksController.getTaskById);
taskRouter.get('/get-by-type', TasksController.getTaskByType);
taskRouter.get('/get-by-status', TasksController.getTaskByStatus);
taskRouter.post('/create', TasksController.createTask);
taskRouter.put('/update/:id', TasksController.updateTask);
taskRouter.patch('/update-status', TasksController.updateTaskStatus);
taskRouter.delete('/delete/:id', TasksController.deleteTask);
