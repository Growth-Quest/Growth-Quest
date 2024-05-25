import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UsersDAO {
  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
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
    return prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  }
  
  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new UsersDAO()