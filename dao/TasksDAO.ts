import { PrismaClient } from "@prisma/client";

class TasksDAO {
  async getAllTasks() {
    const prisma = new PrismaClient();
    return prisma.tasks.findMany();
  }

  async getTaskById(id: string) {
    const prisma = new PrismaClient();
    return prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getTaskByUser(user_id: string) {
    const prisma = new PrismaClient();
    return prisma.tasks.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  async getTaskByType(type: string) {
    const prisma = new PrismaClient();
    return prisma.tasks.findMany({
      where: {
        type: type,
      },
    });
  }

  async getTaskByStatus(status: string, user_id: string) {
    const prisma = new PrismaClient();
    return prisma.tasks.findMany({
      where: {
        status: status,
        user_id: user_id,
      },
    });
  }

  async createTask(data: any, user_id: string) {
    if (data.type === "easy") {
      data.exp_value = 1;
    } else if (data.type === "medium") {
      data.exp_value = 2;
    } else if (data.type === "hard") {
      data.exp_value = 3;
    } else {
      data.exp_value = 0;
    }

    const prisma = new PrismaClient();
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
    const prisma = new PrismaClient();
    return prisma.tasks.update({
      where: {
        id: id,
      },
      data: task,
    });
  }

  async updateTaskStatus(status: string, task_id: string) {
    const prisma = new PrismaClient();
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
    const prisma = new PrismaClient();
    return prisma.tasks.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new TasksDAO()

