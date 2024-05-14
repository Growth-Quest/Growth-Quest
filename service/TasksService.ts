import TasksDAO from "../dao/TasksDAO";

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

  async getTaskByStatus(status: string) {
    try {
      const result = await TasksDAO.getTaskByStatus(status);
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