import { PrismaClient } from "@prisma/client";
import UsersDAO from "./UsersDAO";

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

// const plant = new Plant();
// async function main() {
//   const user = await UsersDAO.createUser("email2@email.com", 'Usertest2', 'password123');
//   const newPlant = await plant.createPlant(user.id);
//   console.log(await plant.getAllPlants());
//   console.log(await plant.deletePlant(newPlant.id))
//   console.log(await plant.getPlantById(user.id));
// }

// main();