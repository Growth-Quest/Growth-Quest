import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TasksDAO {
  async getAllTasks() {
    return prisma.tasks.findMany();
  }

  async getTaskById(id: string) {
    return prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getTaskByUser(user_id: string) {
    return prisma.tasks.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  async getTaskByType(type: string) {
    return prisma.tasks.findMany({
      where: {
        type: type,
      },
    });
  }

  async getTaskByStatus(status: string, user_id: string) {
    return prisma.tasks.findMany({
      where: {
        status: status,
        user_id: user_id,
      },
    });
  }

  async createTask(data: any, user_id: string) {

    return prisma.tasks.create({
      data: {
        task_name: data.task_name,
        description: data.description,
        type: data.type,
        exp_value: data.exp_value,
        user: {
          connect: {
            id: user_id,
          },
        }
      }
    });
  }

  async updateTask(id: string, task: any) {
    return prisma.tasks.update({
      where: {
        id: id,
      },
      data: task,
    });
  }

  async updateTaskStatus(status: string, task_id: string) {
    return prisma.tasks.updateMany({
      where: {
        id: task_id,
      },
      data: {
        status: status,
      },
    });
  }

  async deleteTask(id: string) {
    return prisma.tasks.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new TasksDAO()

// const taskDao = new TasksDAO();

// async function log() {
//   console.log(await taskDao.getTaskByStatus("ongoing", "clwm6eqwo0000tt005npcqlrf"));
// }

// log();