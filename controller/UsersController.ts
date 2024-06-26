import express from 'express';
import UsersService from '../service/UsersService';
import jwt from "jsonwebtoken";
import PlantsService from '../service/PlantsService';

class UsersController {
  async getAllUsers(req: express.Request, res: express.Response) {
    try {
      const result = await UsersService.getAllUsers();
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const result = await UsersService.getUserById(req.params.id);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async getUserByUsername(req: express.Request, res: express.Response) {
    try {
      const username = req.body.username;
      const result = await UsersService.getUserByUserName(username);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async updateUser(req: express.Request, res: express.Response) {
    try {
      const updatedUser = req.body;
      const id = req.params.id;
      const result = await UsersService.updateUser(id, updatedUser);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async deleteUser(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const result = await UsersService.deleteUser(id);
      if ("error" in result) {
        res.status(404).send(result);
      } else {
        res.status(204).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async registerUser(req: express.Request, res: express.Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;
      const result = await UsersService.registerUser(email, username, password);
      if (result.error) {
        res.status(400).send(result);
      } else {
        res.status(201).send(result);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      res.status(500).send({ "error": error });
    }
  }

  async userLogin(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    try {
      const user = await UsersService.userLogin(username, password);
      if (!user || typeof user === "string") {
        res.status(404).send({ error: user });
      } else {
        const userId = user.id;
        const plant = await PlantsService.getPlantByUserId(userId);
        if ("error" in plant) {
          res.status(404).send(plant);
        } else {
          const plant_id = plant.id;
          const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET || "default-secret"
          );
          const send = { userId, token, plant_id };
          res.status(200).send(send);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
}

export default new UsersController();