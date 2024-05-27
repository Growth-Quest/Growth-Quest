import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { app, server } from "../index";
import UsersDAO from '../dao/UsersDAO'
import PlantsService from "../service/PlantsService";
import UsersService from "../service/UsersService";

const prisma = new PrismaClient();
let user: { id: string; email: any; username: any; password?: string; role?: string; createdAt?: Date; updatedAt?: Date; };
let plant: any;

beforeAll(async () => {
  user = await UsersDAO.createUser(
    'userplant3@sample.com',
    'User Plant 3',
    'password123'
  );
  plant = await PlantsService.createPlant(user.id);

  console.log("user", user);
  console.log("plant", plant);
});

describe('Plant APIs', () => {

  describe('GET /plants/get', () => {
    it('should return all plants', async () => {
      const response = await supertest(server).get('/plants/get');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /plants/get/:id', () => {
    it('should return one plant data', async () => {
      const response = await supertest(app).get(`/plants/get/${plant.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', plant.id);
    });

    it('should return error message if plant not found', async () => {
      const response = await supertest(app).get('/plants/get/123');
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Plant not found',
      });
    });
  });

  describe('GET /plants/get-by-user/:userId', () => {
    it('should return plants for a specific user', async () => {
      const response = await supertest(server).get(`/plants/get-by-user/${user.id}`);
      plant = response.body.plants;
      expect(response.status).toBe(200);
    });

    it('should return an empty array if user has no plants', async () => {
      const response = await supertest(server).get('/plants/get-by-user/999');
      expect(response.status).toBe(404);
    });

    // describe('POST /plants/create', () => {
    //   it('should create a new plant', async () => {
    //     const response = await supertest(server).post('/plants/create').send(user.id);
    //     console.log("plant create response", response.body);
    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'Plant created successfully');
    //   });
    // });

  describe('DELETE /plants/delete/:id', () => {
    it('should delete a plant', async () => {
      const plant = await PlantsService.createPlant(user.id);
      if ('id' in plant) {
        const response = await supertest(server).delete(`/plants/delete/${plant.id}`);
        expect(response.status).toBe(200);
        
      }
    });

    it('should return error message if plant not found', async () => {
      const response = await supertest(server).delete('/plants/delete/123');
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Plant not found',
      });
    });
  });
});
});

afterAll(async () => {

  if (user?.id) {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    }).catch(e => console.error(e));
  }

  if (plant?.id) {
    await prisma.plant.delete({
      where: {
        id: plant.id,
      },
    }).catch(e => console.error(e));
  }


  await prisma.$disconnect();
  server.close();
});
