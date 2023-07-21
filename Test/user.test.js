const request = require('supertest');
const server = require('../Server/index');

describe('User Routes Test', () => {
    afterAll((done) => {
        server.close(done);
    });

    test('POST /users/register should create a new user', async() => {
        const newUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        const response = await request(server).post('/users/register').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    test('POST /users/register should return 400 if username already exists', async() => {
        const existingUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        const response = await request(server).post('/users/register').send(existingUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Username already exists');
    });

    test('POST /users/login should log in a user', async() => {
        const credentials = {
            username: 'testuser',
            password: 'testpassword',
        };

        const response = await request(server).post('/users/login').send(credentials);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
    });

    test('POST /users/login should return 401 if credentials are invalid', async() => {
        const invalidCredentials = {
            username: 'testuser',
            password: 'wrongpassword',
        };

        const response = await request(server).post('/users/login').send(invalidCredentials);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
});