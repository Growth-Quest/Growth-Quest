import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { app, server } from "../index";
import UsersDAO from '../dao/UsersDAO'
import PlantsService from "../service/PlantsService";

const prisma = new PrismaClient();
let task: { id: string; user_id: string; task_name: string; description: string; type: string; status: string; exp_value: number; createdAt: Date; updatedAt: Date; }
let task2: { id: string; user_id: string; task_name: string; description: string; type: string; status: string; exp_value: number; createdAt: Date; updatedAt: Date; }
let user: { id: string; email: any; username: any; password?: string; role?: string; createdAt?: Date; updatedAt?: Date; };
let user2: { id: string; email: any; username: any; password?: string; role?: string; createdAt?: Date; updatedAt?: Date; };
let plant: any;


beforeAll(async () => {
  const userResponse = await supertest(server).post('/users/register').send({
    email: 'user1@sample.com',
    password: 'password',
    username: 'User 1',
  });
  user = userResponse.body;
  console.log("user", user);
  
  const taskResponse = await supertest(server).post('/tasks/create').send({
    user_id: user.id,
    task_name: 'Task 1',
    description: 'Task 1 description',
    type: 'easy',
    status: 'ongoing',
    exp_value: 100,
  });
  task = taskResponse.body;

  const taskResponse2 = await supertest(server).post('/tasks/create').send({
    user_id: user.id,
    task_name: 'Task 1',
    description: 'Task 1 description',
    type: 'easy',
    status: 'ongoing',
    exp_value: 100,
  });
  task2= taskResponse2.body;

  user2 =  await UsersDAO.createUser(
    'userplant3@sample.com',
    'User Plant 3',
    'password123'
  );
  console.log("user2", user2.id);
  plant = await PlantsService.createPlant(user2.id);
  console.log("Plant base", plant);
});

describe('Task APIs', () => {
  describe('GET /tasks/get/:id', () => {
    it('should return one task data', async () => {
      const response = await supertest(server).get(`/tasks/get/${task.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: task.id,
        user_id: user.id,
        task_name: task.task_name,
        description: task.description,
        type: task.type,
        status: task.status,
        exp_value: task.exp_value,
      });
    });

    it('should return error message if task not found', async () => {
      const response = await supertest(server).get('/tasks/get/123');
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Task not found',
      });
    });
  });

  describe('GET /tasks/get', () => {
    it('should return all tasks', async () => {
      const response = await supertest(server).get('/tasks/get');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /tasks/get-by-user', () => {
    it('should return tasks by user', async () => {
      const response = await supertest(server).get(`/tasks/get-by-user`).send({ username: user.username });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((t: any) => {
        expect(t.user_id).toBe(user.id);
      });
    });
  });

  describe('GET /tasks/get-by-type', () => {
    it('should return tasks by type', async () => {
      const response = await supertest(server).get('/tasks/get-by-type').send({ type: "easy" });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((t: any) => {
        expect(t.type).toBe('easy');
      });
    });
  });

  describe('POST /tasks/get-by-status', () => {
    it('should return tasks by status', async () => {
      const response = await supertest(server).post('/tasks/get-by-status').send({ status: 'ongoing' });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((t: any) => {
        expect(t.status).toBe('ongoing');
      });
    });
  });

  describe('POST /tasks/create', () => {
    it('should create a new task', async () => {
      const newTask = {
        user_id: user.id,
        task_name: 'Task 3',
        description: 'Task 3 description',
        type: 'medium',
        status: 'ongoing',
        exp_value: 200,
      };
      const response = await supertest(server).post('/tasks/create').send(newTask);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newTask);
    });
  });

  describe('PUT /tasks/update/:id', () => {
    it('should update a task', async () => {
      const updatedTask = {
        task_name: 'Updated Task',
        description: 'Updated Task description',
        type: 'hard',
        status: 'done',
        exp_value: 300,
      };
      const response = await supertest(server).put(`/tasks/update/${task.id}`).send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedTask);
    });
  });



  describe('PUT /tasks/task-done', () => {
    it('should mark a task as done', async () => {
      console.log("plant", plant);
      const response = await supertest(server).put('/tasks/task-done').send({ task_id: task.id, plant_id: plant.id, user_id: user2.id });
      expect(response.status).toBe(200);
      console.log(response.body);
      expect(response.body.status).toBe('done');
    });
  });

  describe('PUT /tasks/task-failed', () => {
    it('should mark a task as failed', async () => {
      console.log("test val", plant.id, task.id);
      const response = await supertest(server).put('/tasks/task-failed').send({ task_id: task.id, plant_id: plant.id});
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('failed');
    });
  });

  describe('PUT /tasks/update/:id', () => {
    it('should update a task', async () => {
      const updatedTask = {
        task_name: 'Updated Task',
        description: 'Updated Task description',
        type: 'hard',
        status: 'done',
        exp_value: 300,
      };
      const response = await supertest(server).put(`/tasks/update/${task.id}`).send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedTask);
    });
  });

  describe('DELETE /tasks/delete/:id', () => {
    it('should delete a task', async () => {
      const response = await supertest(server).delete(`/tasks/delete/${task.id}`);
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async () => {
  await prisma.tasks.delete({
    where: {
      id: task.id,
    },
  }).catch(e => console.error(e));

  await prisma.tasks.delete({
    where: {
      id: task2.id,
    },
  }).catch(e => console.error(e));

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  }).catch(e => console.error(e));

  await prisma.user.delete({
    where: {
      id: user2.id,
    },
  }).catch(e => console.error(e));

  await prisma.$disconnect();
  server.close();
});
