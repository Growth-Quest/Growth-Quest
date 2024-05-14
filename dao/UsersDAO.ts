import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UsersDAO {
  async getAllUsers() {
    const prisma = new PrismaClient();
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    const prisma = new PrismaClient();
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async createUser(email: string, username: string, password: string) {
    return await prisma.user.create({
        data: {
            email,
            username,
            password
        }
    });
}

  async updateUser(id: string, user: any) {
    const prisma = new PrismaClient();
    return prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  }
  
  async getUserByEmail(email: string) {
    const prisma = new PrismaClient();
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async deleteUser(id: string) {
    const prisma = new PrismaClient();
    return prisma.user.delete({
      where: {
        id: id,
      },
    });


  }
}

export default new UsersDAO()