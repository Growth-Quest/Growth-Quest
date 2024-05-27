import express from 'express';
import TasksService from '../service/TasksService';

class TasksController {
  async getAllTasks(req: express.Request, res: express.Response) {
    try {
      const result = await TasksService.getAllTasks();
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getTaskByUser(req: express.Request, res: express.Response) {
    try {
      const user_id = req.params.user_id;
      const result = await TasksService.getTaskByUser(user_id);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getTaskById(req: express.Request, res: express.Response) {
    try {
      const result = await TasksService.getTaskById(req.params.id);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getTaskByType(req: express.Request, res: express.Response) {
    try {
      const type = req.body.type;
      const result = await TasksService.getTaskByType(type);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getTaskByStatus(req: express.Request, res: express.Response) {
    try {
      const status = req.body.status;
      const user_id = req.body.user_id;
      console.log("status, user_id: ", status, user_id)
      const result = await TasksService.getTaskByStatus(status, user_id);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async createTask(req: express.Request, res: express.Response) {
    try {
      const task = req.body;
      const user_id = req.body.user_id;
      const result = await TasksService.createTask(task, user_id);
      res.status(201).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async updateTask(req: express.Request, res: express.Response) {
    try {
      const task = req.body;
      const result = await TasksService.updateTask(req.params.id, task);
      res.status(200).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async doneTask(req: express.Request, res: express.Response) {
    try {
      const { task_id, plant_id, user_id } = req.body;
      await TasksService.doneTask(task_id, plant_id);
      // const result = TasksService.getTaskByStatus("completed", user_id);
      const result = await TasksService.getTaskById(task_id);
      res.status(200).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async taskFailed(req: express.Request, res: express.Response) {
    try {
      const { task_id, plant_id, } = req.body;
      await TasksService.taskFailed(task_id, plant_id);
      const result = await TasksService.getTaskById(task_id);
      console.log("result", result);
      res.status(200).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async updateTaskStatus(req: express.Request, res: express.Response) {
    try {
      const status = req.body.status;
      const task_id = req.body.task_id;
      const result = await TasksService.updateTaskStatus(status, task_id);
      res.status(200).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async deleteTask(req: express.Request, res: express.Response) {
    try {
      const result = await TasksService.deleteTask(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }
}

export default new TasksController();