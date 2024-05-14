import { PrismaClient } from "@prisma/client";

class Plant {
  async getAllPlants() {
    const prisma = new PrismaClient();
    return prisma.plant.findMany();
  }

  async getPlantById(id: string) {
    const prisma = new PrismaClient();
    return prisma.plant.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getPlantByUserId(userId: string) {
    const prisma = new PrismaClient();
    return prisma.plant.findUnique({
      where: {
        user_id: userId,
      },
    });
  }

  async createPlant(userId: string) {
    const prisma = new PrismaClient();
    return prisma.plant.create({
        data: {
            user: { connect: { id: userId } },
        },
    });
}

  async updatePlant(id: string, plant: any) {
    const prisma = new PrismaClient();
    return prisma.plant.update({
      where: {
        id: id,
      },
      data: plant,
    });
  }

  async deletePlant(id: string) {
    const prisma = new PrismaClient();
    return prisma.plant.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new Plant();