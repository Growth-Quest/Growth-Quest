import TasksDAO from "../dao/TasksDAO";
import PlantsDAO from "../dao/PlantsDAO";

interface UserTask {
  user_id: string,
  task_id: string,
  task_name: string,
  description: string,
  type: string
}

class TasksService {
  async getAllTasks() {
    try {
      const result = await TasksDAO.getAllTasks();
      if (result.length === 0) {
        return { "error": "No tasks found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getTaskById(id: string) {
    try {
      const result = await TasksDAO.getTaskById(id);
      if (result === null) {
        console.error(`Task not found with id: ${id}`);
        return { "error": "Task not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getTaskByUser(user_id: string) {
    try {
      const result = await TasksDAO.getTaskByUser(user_id);
      if (result.length === 0) {
        console.error(`Task not found with user_id: ${user_id}`);
        return { "error": "Task not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getTaskByType(type: string) {
    try {
      const result = await TasksDAO.getTaskByType(type);
      if (result.length === 0) {
        console.error(`Task not found with type: ${type}`);
        return { "error": "Task not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getTaskByStatus(status: string, user_id: string) {
    try {
      const result = await TasksDAO.getTaskByStatus(status, user_id);
      if (result.length === 0) {
        console.error(`Task not found with status: ${status}`);
        return { "error": "Task not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async createTask(task: any, user_id: string) {
    try {
      const result = await TasksDAO.createTask(task, user_id);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async updateTask(id: string, task: any) {
    try {
      const result = await TasksDAO.updateTask(id, task);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async updateTaskStatus(status: string, task_id: string) {
    try {
      const result = await TasksDAO.updateTaskStatus(status, task_id);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async doneTask(task_id: string, plant_id: string) {
    try {
      const plant = await PlantsDAO.getPlantById(plant_id);
      const task = await TasksDAO.getTaskById(task_id);
      console.log("task_id, plant_id: ", task_id, plant_id)
      console.log("task", task)
      if (!task || !plant) {
        return { "error": "Task or Plant not found" }
      }
      const plantLevel: number = plant.level;
      const plantCurrentExp: number = plant.current_exp;
      const plantMaxExp: number = plant.max_exp;
      const newPlantExp: number = plantCurrentExp + task.exp_value;
      const plantHealth: number = plant.health_points;
      console.log("plant details: ", plantLevel, plantCurrentExp, plantMaxExp, newPlantExp, plantHealth)
      if (plantHealth < 100) {
        await PlantsDAO.updatePlant(plant_id, {
          health_points: plantHealth + 1,
        })
      }
      if (newPlantExp >= plantMaxExp) {
        await PlantsDAO.updatePlant(plant_id, {
          level: plantLevel + 1,
          current_exp: newPlantExp - plantMaxExp,
          max_exp: Math.floor(plantMaxExp + (plantMaxExp / 5)),
        })
        return await TasksDAO.updateTaskStatus("done", task_id);
      } else {
        const response = await PlantsDAO.updatePlant(plant_id, {
          current_exp: newPlantExp,
        })
        console.log("response: ", response);
        return await TasksDAO.updateTaskStatus("done", task_id);
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async taskFailed(task_id: string, plant_id: string) {
    try {
      const plant = await PlantsDAO.getPlantById(plant_id);
      const task = await TasksDAO.getTaskById(task_id);
      if (!task || !plant) {
        return { "error": "Task or Plant not found" }
      }
      const plantHealth: number = plant.health_points;
      if (plantHealth > 0) {
        await PlantsDAO.updatePlant(plant_id, {
          health_points: plantHealth - 1,
        })
      }
      return await TasksDAO.updateTaskStatus("failed", task_id);
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async deleteTask(id: string) {
    try {
      const result = await TasksDAO.deleteTask(id);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }
}

export default new TasksService

// const taskService = new TasksService();

// async function log() {
//   console.log(await taskService.getTaskByStatus("failed", "clwm6eqwo0000tt005npcqlrf"));
// }

// log();