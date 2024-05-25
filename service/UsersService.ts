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
      if (!user || user == null) {
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
      const userExists = await UsersDAO.getUserById(id);
      if (!userExists || userExists === null) {
        return { "error": "User not found" }
      } else {
        const result = await UsersDAO.updateUser(id, user);
        return result;
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async deleteUser(id: string) {
    try {
      const userExists = await UsersDAO.getUserById(id);
      if (!userExists || userExists === null) {
        return { "error": "User not found" }
      } else {
        const result = await UsersDAO.deleteUser(id);
        return result;
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      return { "error": error }
    }
  }

  async registerUser(email: string, username: string, password: string) {
    try {
      if (!email || email === '' || !username || username === '' || !password || password === '') {
        return { error: "Bad Request." };
      }
      const checkUserEmail = await UsersDAO.getUserByEmail(email);
      const checkUsername = await UsersDAO.getUserByUsername(username);
      if (checkUserEmail !== null) {
        return { error: "Email already exists." };
      }else if (checkUsername !== null) {
        return { error: "Username already exists." };
      } else {
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
    const user = await UsersDAO.getUserByUsername(username);
    if (!user || user === null) return "User not found.";
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return "Invalid password.";
    }
  }
}


export default new UsersService()