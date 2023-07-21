const request = require('supertest');
const server = require('../Server/index');

describe('Task Routes Test', () => {
    afterAll((done) => {
        server.close(done);
    });

    describe('POST /tasks/personal', () => {
        test('should create a new personal task', async() => {
            const newUser = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword',
            };

            // Register a new user first
            const registerResponse = await request(server).post('/users/register').send(newUser);
            expect(registerResponse.status).toBe(201);

            const newPersonalTask = {
                taskDescription: 'Buy groceries',
                deadline: '2023-07-31',
            };

            const response = await request(server)
                .post('/tasks/personal')
                .set('Authorization', `Bearer ${registerResponse.body.token}`)
                .send(newPersonalTask);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('taskDescription', newPersonalTask.taskDescription);
            expect(response.body).toHaveProperty('deadline', newPersonalTask.deadline);
            expect(response.body).toHaveProperty('completed', false);
            expect(response.body).toHaveProperty('createdAt');
            expect(response.body).toHaveProperty('completedAt', null);
        });
    });

    // Add more test cases for other task routes
    // For example: POST /tasks/group, PUT /tasks/:taskId/complete, etc.
});