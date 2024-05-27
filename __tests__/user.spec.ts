import supertest from 'supertest';
import { app, server } from '../index';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

let user: { id: string; email: any; username: any; password?: string; role?: string; createdAt?: Date; updatedAt?: Date; };

beforeAll(async () => {
  user = await prisma.user.create({
    data: {
      email: 'user1@sample.com',
      password: 'password',
      username: 'User 1',
    },
  })
});

describe('User APIs', () => {
  describe('GET /user/get/:id', () => {
    it('should return one user data', async () => {
      const response = await supertest(server).get(`/users/get/${user.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    });

    it('should return error message if user not found', async () => {
      const response = await supertest(server).get('/users/get/123');
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'User not found',
      });
    });
  });

  describe('Get /user/get', () => {
    it('should return all users data', async () => {
      const response = await supertest(server).get('/users/get');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: user.id,
            email: user.email,
            username: user.username,
          }),
        ]),
      );
    });
    // note: make a test for failed case that doesn't involve deleting the created user in beforeAll().
  });

  describe('GET /users/get-by-username', () => {
    it('should return one user data using username', async () => {
      const response = await supertest(server).get(`/users/get-by-username`).send({
        username: user.username
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    });

    it('should return error message if user not found', async () => {
      const response = await supertest(server).get('/users/get-by-username').send({
        username: 'User 2',
      });
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'User not found.',
      });
    });
  });

  describe('/POST /users/register', () => {
    it('should create a new user', async () => {
      const response = await supertest(server).post('/users/register').send({
        email: 'newuser@sample.com',
        password: 'password',
        username: 'New User',
      });
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        email: 'newuser@sample.com',
        username: 'New User',
      });

      await prisma.user.delete({
        where: {
          id: response.body.id,
        },
      });
    });

    it('should return error message if email is already taken', async () => {

      const response = await supertest(server).post('/users/register').send({
        email: 'user1@sample.com',
        password: 'password',
        username: 'User 1',
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Email already exists.',
      });
    });

    it('should return error message if username is already taken', async () => {

      const response = await supertest(server).post('/users/register').send({
        email: 'user2@sample.com',
        password: 'password',
        username: 'User 1',
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Username already exists.',
      });
    });

    it('should return error message if email, username, or password is empty', async () => {

      const response = await supertest(server).post('/users/register').send({
        email: '',
        password: '',
        username: '',
      });
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request.',
      });
    });
  });

  describe('/POST /users/login', () => {
    it('should login user', async () => {

      const newUser = await supertest(server).post('/users/register').send({
        email: 'newuser@sample.com',
        password: 'password',
        username: 'New User',
      });

      const response = await supertest(server).post('/users/login').send({
        username: 'New User',
        password: 'password',
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        userId: newUser.body.id,
      });
      await prisma.user.delete({
        where: {
          id: newUser.body.id,
        },
      });
    });

    it('should return error message if user not found', async () => {
      const response = await supertest(server).post('/users/login').send({
        username: 'User 2',
        password: 'password',
      });
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'User not found.'
      });
    })

    it('should return error message if password is incorrect', async () => {
      const response = await supertest(server).post('/users/login').send({
        username: 'User 1',
        password: 'password1',
      });
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Invalid password.'
      });
    })
  });

  describe('/PUT /users/update/:id', () => {
    it('should update user data', async () => {
      const response = await supertest(server).put(`/users/update/${user.id}`).send({
        email: 'updateduser@sample.com',
        username: 'Updated User',
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        email: 'updateduser@sample.com',
        username: 'Updated User',
      });
    });

    it('should return error message if user not found', async () => {
      const response = await supertest(server).put('/users/update/123').send();
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'User not found',
      });
    });
  });

  describe('/DELETE /users/delete/:id', () => {
    it('should delete user data', async () => {
      const newUser = await prisma.user.create({
        data: {
          email: 'newuser@sample.com',
          password: 'password',
          username: 'New User',
        },
      });
      const response = await supertest(server).delete(`/users/delete/${newUser.id}`);
      expect(response.status).toBe(204);
    });

    it('return error message if user not found', async () => {
      const response = await supertest(server).delete(`/users/delete/12345`);
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'User not found',
      });
    });
  });
});


afterAll(async () => {
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  server.close();
});