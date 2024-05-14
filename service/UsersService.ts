import UsersDAO from '../dao/UsersDAO';
import bcrypt from "bcrypt";
import PlantsService from './PlantsService';
class UsersService {
  async getAllUsers() {
    try {
      const result = await UsersDAO.getAllUsers();
      if (result.length === 0) {
        return { "error": "No users found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async getUserById(id: string) {
    try {
      const result = await UsersDAO.getUserById(id);
      if (result === null) {
        console.error(`User not found with id: ${id}`);
        return { "error": "User not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async getUserByUserName(username: string) {
    if (!username) {
      return { error: "Invalid username." };
    }
    try {
      const user = await UsersDAO.getUserByUsername(username);
      if (!user) {
        return { error: "User not found." };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error." };
    }
  }

  async updateUser(id: string, user: any) {
    try {
      const result = await UsersDAO.updateUser(id, user);
      return result;
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await UsersDAO.deleteUser(id);
      return result;
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async registerUser(email: string, username: string, password: string) {
    if (!email || !username || !password) {
      return { error: "Bad Request." };
    }
    try {
      const checkUser = await UsersDAO.getUserByEmail(email);
      if (checkUser) {
        return { error: "User already exists." };
      } else {
        console.log(email, username, password)
        // Bcrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: any = await UsersDAO.createUser(
          email,
          username,
          hashedPassword
        );
        await PlantsService.createPlant(newUser.id);
        return newUser;
      }
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error." };
    }
  }

  async userLogin(username: string, password: string) {
    const user = await this.getUserByUserName(username);
    if ("error" in user) return user.error;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }
}


export default new UsersService()